import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getContentTree, type ContentTreeNode, type DocNode, type SectionNode } from "@/lib/content";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSlug: string[];
}

function slugToKey(slug: string[]) {
  return slug.join("/") || "root";
}

function containsSlug(node: ContentTreeNode, slug: string[]): boolean {
  if (node.type === "doc") {
    return isSameSlug(node.slug, slug);
  }

  if (isSameSlug(node.slug, slug)) {
    return true;
  }

  return node.children.some((child) => containsSlug(child, slug));
}

function isSameSlug(a: string[], b: string[]) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((part, idx) => part === b[idx]);
}

function docIndent(depth: number) {
  const tokens = ["", "pl-4", "pl-7", "pl-10", "pl-12"];
  return tokens[Math.min(depth, tokens.length - 1)];
}

function renderDoc(doc: DocNode, activeSlug: string[], depth: number) {
  const path = "/" + doc.slug.join("/");
  const href = path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
  const isActive = isSameSlug(doc.slug, activeSlug);

  return (
    <Link
      key={href || "root"}
      href={href}
      className={cn(
        "block rounded-md px-2 py-1.5 text-sm transition-colors",
        docIndent(depth),
        isActive
          ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200"
          : "text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800",
      )}
    >
      {doc.title}
    </Link>
  );
}

function renderSection(section: SectionNode, activeSlug: string[], depth: number) {
  const value = slugToKey(section.slug);
  const shouldOpen = containsSlug(section, activeSlug);
  const children = section.children.map((child) =>
    child.type === "doc"
      ? renderDoc(child, activeSlug, depth + 1)
      : renderSection(child, activeSlug, depth + 1),
  );

  return (
    <Accordion type="single" collapsible defaultValue={shouldOpen ? value : undefined} key={value}>
      <AccordionItem value={value}>
        <AccordionTrigger
          className={cn(
            "text-sm font-semibold text-gray-900 dark:text-slate-100",
            depth > 0 && "pl-2",
          )}
        >
          {section.title}
        </AccordionTrigger>
        <AccordionContent className="space-y-1">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function renderTree(tree: ContentTreeNode[], activeSlug: string[]) {
  return tree.map((node) =>
    node.type === "doc" ? renderDoc(node, activeSlug, 0) : renderSection(node, activeSlug, 0),
  );
}

export default async function Sidebar({ activeSlug }: SidebarProps) {
  const tree = await getContentTree();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 px-6 py-8 md:block">
      <ScrollArea className="h-full pr-2">
        <div className="space-y-1">{renderTree(tree, activeSlug)}</div>
      </ScrollArea>
    </aside>
  );
}

