'use client'

import { useState } from 'react'
import { NavBar } from './navbar'
import { DocsSidebar } from './docs-sidebar'
import { TableOfContents } from './table-of-contents'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="glow-bg min-h-screen bg-background text-foreground">
      {/* Top Navigation Bar */}
      <NavBar />

      {/* Mobile menu button */}
      <div className="fixed top-32 left-4 z-40 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card/50 backdrop-blur-sm border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex pt-28">
        {/* Left Sidebar - Navigation */}
        <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 lg:mr-64">
          <div className="container max-w-4xl mx-auto px-6 py-16">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  )
}

