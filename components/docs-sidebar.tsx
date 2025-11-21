'use client'

import { cn } from '../lib/utils'
import { Link, useLocation } from 'react-router-dom'
import { getNavbarSectionForDoc, getDocBySlug, navbarSections } from '../lib/docs-config'
import { useMemo } from 'react'

interface DocsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
  const location = useLocation()
  const pathname = location.pathname
  
  // Determine which navbar section to show based on current page
  const currentSection = useMemo(() => {
    // Extract slug from pathname (e.g., /docs/introduction -> introduction)
    const slug = pathname.split('/').pop() || 'introduction'
    
    // Find the navbar section for this slug
    const section = getNavbarSectionForDoc(slug)
    
    // Default to first section if not found
    return section || navbarSections[0]
  }, [pathname])
  
  const isActivePage = (href: string) => {
    return pathname === href
  }

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
            <h2 className="text-xl font-bold text-foreground mb-1">{currentSection.title}</h2>
            <p className="text-sm text-muted-foreground">{'Technical reference & guides'}</p>
          </div>

          <nav className="space-y-8 flex-1">
            {currentSection.sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = isActivePage(item.href)
                    
                    return (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 group',
                            isActive
                              ? 'bg-accent text-accent-foreground shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                              : 'text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          )}
                        >
                          {Icon && <Icon className={cn(
                            'h-4 w-4 transition-colors',
                            isActive 
                              ? 'text-primary' 
                              : 'text-muted-foreground group-hover:text-primary'
                          )} />}
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

