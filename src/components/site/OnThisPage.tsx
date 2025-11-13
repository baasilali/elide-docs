import { ScrollArea } from "@/components/ui/scroll-area";
import type { TocItem } from "@/lib/content";

interface OnThisPageProps {
  toc: TocItem[];
}

export default function OnThisPage({ toc }: OnThisPageProps) {
  if (!toc.length) {
    return null;
  }

  return (
    <aside className="sticky top-0 hidden h-screen w-56 flex-shrink-0 px-6 py-8 lg:block">
      <ScrollArea className="h-full pr-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
          On this page
        </div>
        <nav className="mt-3 space-y-1 text-sm">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block rounded-md px-2 py-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-purple-600 dark:text-slate-300 dark:hover:bg-slate-800"
              style={{ paddingLeft: item.depth === 3 ? "1.75rem" : "0.75rem" }}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}

