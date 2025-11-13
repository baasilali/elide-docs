import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface TocItem {
  id: string;
  title: string;
  depth: number;
}

export interface DocMeta {
  title: string;
  description?: string;
  order?: number;
}

export interface DocNode {
  type: "doc";
  title: string;
  slug: string[];
  filePath: string;
  order?: number;
  description?: string;
}

export interface SectionNode {
  type: "section";
  title: string;
  slug: string[];
  children: ContentTreeNode[];
  order?: number;
  description?: string;
}

export type ContentTreeNode = DocNode | SectionNode;

export interface LoadedDoc extends DocNode {
  html: string;
  toc: TocItem[];
}

let treeCache: ContentTreeNode[] | null = null;

export async function getContentTree(): Promise<ContentTreeNode[]> {
  if (treeCache) {
    return treeCache;
  }

  treeCache = await readDirectoryEntries(CONTENT_DIR, []);
  return treeCache;
}

export async function getAllDocSlugs(): Promise<string[][]> {
  const tree = await getContentTree();
  const docs: DocNode[] = [];

  const walk = (nodes: ContentTreeNode[]) => {
    for (const node of nodes) {
      if (node.type === "doc") {
        docs.push(node);
      } else {
        walk(node.children);
      }
    }
  };

  walk(tree);
  return docs.map((doc) => doc.slug);
}

export async function getDocBySlug(slug: string[]): Promise<LoadedDoc> {
  const filePath = await resolveDocPath(slug);
  const file = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(file);

  const title = typeof data.title === "string" ? data.title : formatTitle(slug.at(-1) ?? "overview");
  const description = typeof data.description === "string" ? data.description : undefined;
  const order = typeof data.order === "number" ? data.order : undefined;

  const toc = buildToc(content);
  const html = await renderMarkdown(content);

  return {
    type: "doc",
    title,
    slug,
    filePath,
    description,
    order,
    html,
    toc,
  };
}

async function readDirectoryEntries(dirPath: string, slugParts: string[]): Promise<ContentTreeNode[]> {
  const dirents = await fs.readdir(dirPath, { withFileTypes: true });
  const docs: DocNode[] = [];
  const sections: SectionNode[] = [];

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const childSlug = [...slugParts, dirent.name];
      const section = await buildSectionNode(path.join(dirPath, dirent.name), childSlug);
      sections.push(section);
      continue;
    }

    if (!dirent.isFile() || !dirent.name.endsWith(".md")) {
      continue;
    }

    const baseName = dirent.name.slice(0, -3);
    const docSlug =
      baseName === "index" && slugParts.length > 0
        ? slugParts
        : baseName === "index"
          ? []
          : [...slugParts, baseName];

    const fallbackTitle =
      baseName === "index"
        ? formatTitle(slugParts.at(-1) ?? "overview")
        : formatTitle(baseName);

    const doc = await createDocNode(path.join(dirPath, dirent.name), docSlug, fallbackTitle);
    docs.push(doc);
  }

  return sortNodes([...docs, ...sections]);
}

async function buildSectionNode(dirPath: string, slugParts: string[]): Promise<SectionNode> {
  const children = await readDirectoryEntries(dirPath, slugParts);
  const indexDoc = children.find(
    (node): node is DocNode => node.type === "doc" && isSameSlug(node.slug, slugParts),
  );

  const title = indexDoc?.title ?? formatTitle(slugParts.at(-1) ?? "section");

  return {
    type: "section",
    title,
    slug: slugParts,
    children,
    order: indexDoc?.order,
    description: indexDoc?.description,
  };
}

async function createDocNode(filePath: string, slug: string[], fallbackTitle: string): Promise<DocNode> {
  const raw = await fs.readFile(filePath, "utf8");
  const { data } = matter(raw);

  const title = typeof data.title === "string" ? data.title : fallbackTitle;
  const description = typeof data.description === "string" ? data.description : undefined;
  const order = typeof data.order === "number" ? data.order : undefined;

  return {
    type: "doc",
    title,
    slug,
    filePath,
    description,
    order,
  };
}

async function resolveDocPath(slug: string[]): Promise<string> {
  if (slug.length === 0) {
    const candidate = path.join(CONTENT_DIR, "index.md");
    await ensureExists(candidate);
    return candidate;
  }

  const directFile = path.join(CONTENT_DIR, ...slug) + ".md";
  if (await exists(directFile)) {
    return directFile;
  }

  const indexFile = path.join(CONTENT_DIR, ...slug, "index.md");
  await ensureExists(indexFile);
  return indexFile;
}

async function ensureExists(filePath: string) {
  if (!(await exists(filePath))) {
    throw new Error(`Content file not found: ${filePath}`);
  }
}

async function exists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function sortNodes(nodes: ContentTreeNode[]): ContentTreeNode[] {
  return [...nodes].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.title.localeCompare(b.title);
  });
}

function formatTitle(segment: string): string {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isSameSlug(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((part, idx) => part === b[idx]);
}

function buildToc(markdown: string): TocItem[] {
  const processor = unified().use(remarkParse).use(remarkGfm);
  const tree = processor.parse(markdown);

  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];

  visit(tree, "heading", (node) => {
    if (!("depth" in node) || typeof node.depth !== "number") {
      return;
    }

    if (node.depth < 2 || node.depth > 3) {
      return;
    }

    const text = toString(node);
    if (!text) {
      return;
    }

    const id = slugger.slug(text);
    toc.push({
      id,
      title: text,
      depth: node.depth,
    });
  });

  return toc;
}

async function renderMarkdown(markdown: string): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        "aria-hidden": "true",
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const file = await processor.process(markdown);
  return String(file.value);
}

