'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Cpu, 
  Code2, 
  Network, 
  FileText, 
  GitPullRequest,
  Menu,
  X,
  Search,
  Download,
  BookOpen,
  Code
} from 'lucide-react'
import { Button } from './ui/button'

const navigation = [
  { 
    name: 'Runtime', 
    href: '/runtime', 
    icon: Cpu 
  },
  { 
    name: 'Language Guides', 
    href: '/guides', 
    icon: Code2 
  },
  { 
    name: 'Architecture', 
    href: '/architecture', 
    icon: Network 
  },
  { 
    name: 'Release Notes', 
    href: '/releases', 
    icon: FileText 
  },
  { 
    name: 'Contributing', 
    href: '/contributing', 
    icon: GitPullRequest 
  },
]

const secondaryLinks = [
  {
    name: 'Blog',
    href: '/blog',
    icon: BookOpen
  },
  {
    name: 'Examples',
    href: '/examples',
    icon: Code
  }
]

export function NavBar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    // Homepage defaults to Runtime
    if (pathname === '/' && href === '/runtime') {
      return true
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-card/80 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-card/50 backdrop-blur-sm border-b border-border/50'
      )}
    >
      {/* Top Row */}
      <div className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/light.svg"
                alt="Elide"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-xs bg-muted rounded border border-border">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Install Button - Desktop */}
            <div className="hidden md:block">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Install Elide
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Desktop Navigation */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Left Navigation */}
            <div className="flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 relative group',
                      active
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className={cn(
                      'h-4 w-4 transition-colors',
                      active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    )} />
                    <span>{item.name}</span>
                    
                    {/* Active underline indicator */}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right Secondary Links */}
            <div className="flex items-center gap-1">
              {secondaryLinks.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 relative group',
                      active
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className={cn(
                      'h-4 w-4 transition-colors',
                      active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    )} />
                    <span>{item.name}</span>
                    
                    {/* Active underline indicator */}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden pb-4 border-t border-border mt-2 pt-4">
          {/* Mobile Search */}
          <div className="px-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Mobile Install Button */}
          <div className="px-4 mb-4">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Install Elide
            </Button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col gap-1 px-4">
            {[...navigation, ...secondaryLinks].map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 relative',
                    active
                      ? 'text-primary bg-accent/50 border-l-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
                  )}
                >
                  <Icon className={cn(
                    'h-4 w-4',
                    active ? 'text-primary' : 'text-muted-foreground'
                  )} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

