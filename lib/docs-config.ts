import { BookOpen, Zap, Code, Rocket, Shield, Settings, Package, Terminal, Layers, Box, FileText, Globe, Database, Server } from 'lucide-react'
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

export const docsConfig: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs/introduction',
        slug: 'introduction',
        icon: BookOpen,
        description: 'Learn about Elide and what it can do for you',
      },
      {
        title: 'Quick Start',
        href: '/docs/quick-start',
        slug: 'quick-start',
        icon: Zap,
        description: 'Get up and running in minutes',
      },
      {
        title: 'Installation',
        href: '/docs/installation',
        slug: 'installation',
        icon: Terminal,
        description: 'Install Elide on your system',
      },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      {
        title: 'Architecture',
        href: '/docs/architecture',
        slug: 'architecture',
        icon: Rocket,
        description: 'Understanding Elide architecture',
      },
      {
        title: 'Runtime',
        href: '/docs/runtime',
        slug: 'runtime',
        icon: Layers,
        description: 'How the Elide runtime works',
      },
      {
        title: 'Components',
        href: '/docs/components',
        slug: 'components',
        icon: Box,
        description: 'Building blocks of Elide applications',
      },
    ],
  },
  {
    title: 'Language Support',
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
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'Core API',
        href: '/docs/api-core',
        slug: 'api-core',
        icon: Package,
        description: 'Core framework APIs',
      },
      {
        title: 'Server API',
        href: '/docs/api-server',
        slug: 'api-server',
        icon: Server,
        description: 'Server-side APIs and utilities',
      },
      {
        title: 'Database',
        href: '/docs/api-database',
        slug: 'api-database',
        icon: Database,
        description: 'Database access and ORM',
      },
    ],
  },
  {
    title: 'Advanced',
    items: [
      {
        title: 'Security',
        href: '/docs/security',
        slug: 'security',
        icon: Shield,
        description: 'Security best practices',
      },
      {
        title: 'Configuration',
        href: '/docs/configuration',
        slug: 'configuration',
        icon: Settings,
        description: 'Advanced configuration options',
      },
      {
        title: 'Deployment',
        href: '/docs/deployment',
        slug: 'deployment',
        icon: Globe,
        description: 'Deploy your Elide applications',
      },
    ],
  },
]

// Helper function to get all doc slugs (useful for static generation)
export function getAllDocSlugs(): string[] {
  return docsConfig.flatMap(section => 
    section.items.map(item => item.slug)
  )
}

// Helper function to get doc by slug
export function getDocBySlug(slug: string): DocItem | undefined {
  for (const section of docsConfig) {
    const doc = section.items.find(item => item.slug === slug)
    if (doc) return doc
  }
  return undefined
}

