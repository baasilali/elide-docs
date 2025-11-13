import Link from "next/link";

import ThemeToggle from "@/components/site/ThemeToggle";
import { buttonVariants } from "@/lib/button";
import { getContentTree, type ContentTreeNode } from "@/lib/content";
import { cn } from "@/lib/utils";

function extractTopLevelDestinations(tree: ContentTreeNode[]) {
  return tree
    .filter((node) => node.type === "section" || (node.type === "doc" && node.slug.length === 0))
    .map((node) => {
      if (node.type === "doc") {
        return { title: node.title, href: "/" };
      }

      const segment = node.slug.join("/");
      const href = segment ? `/${segment.replace(/\/+$/, "")}/` : "/";
      return {
        title: node.title,
        href,
      };
    });
}

export default async function Navbar() {
  const tree = await getContentTree();
  const destinations = extractTopLevelDestinations(tree);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/60 bg-transparent backdrop-blur-sm dark:border-white/10 dark:bg-transparent">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-gray-900 dark:text-slate-100">
          Elide Docs
        </Link>
        <nav className="hidden flex-1 items-center gap-4 overflow-x-auto text-sm font-medium text-gray-600 md:flex">
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="rounded-md px-2 py-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {destination.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="https://github.com/elide-dev"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-purple-400",
              )}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
            <Link
              href="/guides"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-purple-600 hover:bg-purple-500 focus-visible:outline-pink-500 dark:bg-purple-500 dark:hover:bg-purple-400",
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

