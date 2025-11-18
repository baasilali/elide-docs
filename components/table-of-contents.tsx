'use client'

import { ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const tocItems = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'quick-start', title: 'Quick Start' },
  { id: 'installation', title: 'Installation' },
  { id: 'architecture', title: 'Architecture' },
  { id: 'components', title: 'Components' },
  { id: 'api-reference', title: 'API Reference' },
  { id: 'security', title: 'Security' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'best-practices', title: 'Best Practices' },
]

export function TableOfContents() {
  return (
    <aside className="hidden lg:block fixed top-28 right-0 w-64 h-[calc(100vh-7rem)] border-l border-border bg-card/30 backdrop-blur-md overflow-y-auto">
      <div className="p-6">
        <Accordion type="single" collapsible defaultValue="toc">
          <AccordionItem value="toc" className="border-none">
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-2">
              {'On this page'}
            </AccordionTrigger>
            <AccordionContent>
              <nav className="space-y-1 mt-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-[0_0_12px_rgba(236,72,153,0.3)] rounded-md transition-all duration-200"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  )
}
