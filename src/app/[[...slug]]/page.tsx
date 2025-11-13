import type { Metadata } from "next";
import { notFound } from "next/navigation";

import OnThisPage from "@/components/site/OnThisPage";
import Sidebar from "@/components/site/Sidebar";
import { getAllDocSlugs, getContentTree, getDocBySlug, type ContentTreeNode, type DocNode } from "@/lib/content";

type RouteParams = { slug?: string[] };

interface PageProps {
  params: RouteParams | Promise<RouteParams>;
}

export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await Promise.resolve(props.params);
  const slug = params.slug ?? [];
  const doc = await findDocNode(slug);

  if (!doc) {
    return {
      title: "Elide Docs",
    };
  }

  return {
    title: `${doc.title} · Elide Docs`,
    description: doc.description ?? "Polyglot runtime documentation for Elide.",
  };
}

export const dynamicParams = false;

export default async function DocsPage(props: PageProps) {
  const params = await Promise.resolve(props.params);
  const slug = params.slug ?? [];

  const doc = await getDocBySlug(slug).catch(() => null);
  if (!doc) {
    notFound();
  }

  return (
    <div className="flex w-full">
      <Sidebar activeSlug={doc.slug} />
      <div className="flex flex-1 justify-center px-8 py-8">
        <article className="markdown w-full max-w-4xl rounded-2xl border border-gray-100 bg-[var(--surface)] p-8 shadow-sm dark:border-slate-800">
          <div dangerouslySetInnerHTML={{ __html: doc.html }} />
        </article>
      </div>
      <OnThisPage toc={doc.toc} />
    </div>
  );
}

async function findDocNode(target: string[]): Promise<DocNode | undefined> {
  const tree = await getContentTree();

  const walk = (nodes: ContentTreeNode[]): DocNode | undefined => {
    for (const node of nodes) {
      if (node.type === "doc" && isSameSlug(node.slug, target)) {
        return node;
      }

      if (node.type === "section") {
        const match = walk(node.children);
        if (match) {
          return match;
        }
      }
    }
    return undefined;
  };

  return walk(tree);
}

function isSameSlug(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((part, idx) => part === b[idx]);
}

