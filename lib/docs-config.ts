import { BookOpen, Zap, Code, Rocket, Shield, Settings, Package, Terminal, Layers, Box, FileText, Globe, Database, Server, Users, Award, Cpu, HardDrive, Bug, GitBranch, Lock, Gauge } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface DocItem {
  title: string
  href: string
  slug: string
  icon?: LucideIcon
  description?: string
}

export interface DocSection {
  title: string
  items: DocItem[]
}

// New structure: Navbar sections contain sidebar sections
export interface NavbarSection {
  id: string
  title: string
  href?: string
  sections: DocSection[]
  position?: 'left' | 'right'
}

// Runtime navbar section
const runtimeNav: NavbarSection = {
  id: 'runtime',
  title: 'Runtime',
  href: '/docs/introduction',
  position: 'left',
  sections: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/introduction',
          slug: 'introduction',
          icon: BookOpen,
          description: 'Learn about Elide and what makes it special',
        },
        {
          title: 'Getting Started',
          href: '/docs/getting-started',
          slug: 'getting-started',
          icon: Zap,
          description: 'Get up and running with Elide in minutes',
        },
        {
          title: 'Elide Runtime',
          href: '/docs/runtime',
          slug: 'runtime',
          icon: Cpu,
          description: 'Understanding the Elide runtime architecture',
        },
      ],
    },
    {
      title: 'Documentation',
      items: [
        {
          title: 'CLI References',
          href: '/docs/cli-references',
          slug: 'cli-references',
          icon: Terminal,
          description: 'Complete command-line interface reference',
        },
        {
          title: 'Contributors',
          href: '/docs/contributors',
          slug: 'contributors',
          icon: Users,
          description: 'Meet the people building Elide',
        },
        {
          title: 'Acknowledgements',
          href: '/docs/acknowledgements',
          slug: 'acknowledgements',
          icon: Award,
          description: 'Projects and people we build upon',
        },
      ],
    },
  ],
}

// Polyglot 101 navbar section
const polyglot101Nav: NavbarSection = {
  id: 'polyglot-101',
  title: 'Polyglot 101',
  href: '/docs/env-variables',
  position: 'left',
  sections: [
    {
      title: 'Fundamentals',
      items: [
        {
          title: 'Environment Variables',
          href: '/docs/env-variables',
          slug: 'env-variables',
          icon: Settings,
          description: 'Working with environment variables',
        },
        {
          title: 'File System',
          href: '/docs/file-system',
          slug: 'file-system',
          icon: HardDrive,
          description: 'Reading and writing files',
        },
        {
          title: 'Debugging',
          href: '/docs/debugging',
          slug: 'debugging',
          icon: Bug,
          description: 'Debug your Elide applications',
        },
      ],
    },
    {
      title: 'Advanced',
      items: [
        {
          title: 'Interop',
          href: '/docs/interop',
          slug: 'interop',
          icon: GitBranch,
          description: 'Call between languages seamlessly',
        },
        {
          title: 'Servers',
          href: '/docs/servers',
          slug: 'servers',
          icon: Server,
          description: 'Building HTTP servers with Elide',
        },
      ],
    },
  ],
}

// Guides by Language navbar section
const guidesByLanguageNav: NavbarSection = {
  id: 'guides-by-language',
  title: 'Guides by Language',
  href: '/docs/compatibility',
  position: 'left',
  sections: [
    {
      title: 'Overview',
      items: [
        {
          title: 'Compatibility',
          href: '/docs/compatibility',
          slug: 'compatibility',
          icon: Box,
          description: 'Language compatibility and standards support',
        },
      ],
    },
    {
      title: 'Supported Languages',
      items: [
        {
          title: 'JavaScript',
          href: '/docs/javascript',
          slug: 'javascript',
          icon: Code,
          description: 'JavaScript runtime and APIs',
        },
        {
          title: 'TypeScript',
          href: '/docs/typescript',
          slug: 'typescript',
          icon: FileText,
          description: 'TypeScript support and features',
        },
        {
          title: 'Python',
          href: '/docs/python',
          slug: 'python',
          icon: Code,
          description: 'Python runtime integration',
        },
        {
          title: 'Ruby',
          href: '/docs/ruby',
          slug: 'ruby',
          icon: Code,
          description: 'Ruby with TruffleRuby',
        },
      ],
    },
    {
      title: 'Additional Languages',
      items: [
        {
          title: 'WebAssembly',
          href: '/docs/webassembly',
          slug: 'webassembly',
          icon: Package,
          description: 'Running WebAssembly modules',
        },
        {
          title: 'Pkl',
          href: '/docs/pkl',
          slug: 'pkl',
          icon: Settings,
          description: 'Configuration as code with Pkl',
        },
        {
          title: 'Experimental Engines',
          href: '/docs/experimental-engines',
          slug: 'experimental-engines',
          icon: Rocket,
          description: 'Cutting-edge language support',
        },
      ],
    },
  ],
}

// Architecture navbar section
const architectureNav: NavbarSection = {
  id: 'architecture',
  title: 'Architecture',
  href: '/docs/security',
  position: 'left',
  sections: [
    {
      title: 'Core Topics',
      items: [
        {
          title: 'Security',
          href: '/docs/security',
          slug: 'security',
          icon: Lock,
          description: 'Security best practices and features',
        },
        {
          title: 'Performance',
          href: '/docs/performance',
          slug: 'performance',
          icon: Gauge,
          description: 'Optimize your Elide applications',
        },
      ],
    },
  ],
}

// Releases navbar section (right side)
const releasesNav: NavbarSection = {
  id: 'releases',
  title: 'Releases',
  href: '/docs/releases',
  position: 'right',
  sections: [
    {
      title: 'Version History',
      items: [
        {
          title: '1.0.0-beta10',
          href: '/docs/releases#1-0-0-beta10',
          slug: 'releases',
          icon: Package,
          description: 'Latest release notes',
        },
      ],
    },
  ],
}

// Export all navbar sections
export const navbarSections: NavbarSection[] = [
  runtimeNav,
  polyglot101Nav,
  guidesByLanguageNav,
  architectureNav,
  releasesNav,
]

// Export for backward compatibility
export const docsConfig: DocSection[] = [
  ...runtimeNav.sections,
  ...polyglot101Nav.sections,
  ...guidesByLanguageNav.sections,
  ...architectureNav.sections,
]

// Helper function to get all doc slugs (useful for static generation)
export function getAllDocSlugs(): string[] {
  return navbarSections.flatMap(nav =>
    nav.sections.flatMap(section =>
      section.items.map(item => item.slug)
    )
  )
}

// Helper function to get doc by slug
export function getDocBySlug(slug: string): DocItem | undefined {
  for (const nav of navbarSections) {
    for (const section of nav.sections) {
      const doc = section.items.find(item => item.slug === slug)
      if (doc) return doc
    }
  }
  return undefined
}

// Helper to get navbar section by ID
export function getNavbarSection(id: string): NavbarSection | undefined {
  return navbarSections.find(nav => nav.id === id)
}

// Helper to get navbar section for a specific doc slug
export function getNavbarSectionForDoc(slug: string): NavbarSection | undefined {
  for (const nav of navbarSections) {
    for (const section of nav.sections) {
      if (section.items.some(item => item.slug === slug)) {
        return nav
      }
    }
  }
  return undefined
}

// Export left and right navbar sections separately
export const leftNavbarSections = navbarSections.filter(nav => nav.position === 'left')
export const rightNavbarSections = navbarSections.filter(nav => nav.position === 'right')
