'use client'

import { cn } from '../lib/utils'
import { Link } from 'react-router-dom'
import { docsConfig } from '../lib/docs-config'

interface DocsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-28 left-0 z-40 h-[calc(100vh-7rem)] w-64 border-r border-border bg-card/30 backdrop-blur-md transition-transform duration-300',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-1">{'Documentation'}</h2>
            <p className="text-sm text-muted-foreground">{'Technical reference & guides'}</p>
          </div>

          <nav className="space-y-8 flex-1">
            {docsConfig.map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200 group"
                        >
                          {Icon && <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />}
                          {item.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

