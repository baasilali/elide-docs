#!/usr/bin/env node

/**
 * Static Site Generator for Elide Documentation
 * 
 * This script generates a static version of the docs using the same
 * React component structure as elide-mdx, but outputs to static HTML files
 * that can be served with any static HTTP server.
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { compile } from '@mdx-js/mdx'
import matter from 'gray-matter'
import * as runtime from 'react/jsx-runtime'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Docs configuration - updated structure
const navbarSections = [
  {
    id: 'runtime',
    title: 'Runtime',
    sections: [
      {
        title: 'Getting Started',
        items: [
          { title: 'Introduction', href: '/docs/introduction', slug: 'introduction' },
          { title: 'Getting Started', href: '/docs/getting-started', slug: 'getting-started' },
          { title: 'Elide Runtime', href: '/docs/runtime', slug: 'runtime' },
        ],
      },
      {
        title: 'Documentation',
        items: [
          { title: 'CLI References', href: '/docs/cli-references', slug: 'cli-references' },
          { title: 'Contributors', href: '/docs/contributors', slug: 'contributors' },
          { title: 'Acknowledgements', href: '/docs/acknowledgements', slug: 'acknowledgements' },
        ],
      },
    ],
  },
  {
    id: 'polyglot-101',
    title: 'Polyglot 101',
    sections: [
      {
        title: 'Fundamentals',
        items: [
          { title: 'Environment Variables', href: '/docs/env-variables', slug: 'env-variables' },
          { title: 'File System', href: '/docs/file-system', slug: 'file-system' },
          { title: 'Debugging', href: '/docs/debugging', slug: 'debugging' },
        ],
      },
      {
        title: 'Advanced',
        items: [
          { title: 'Interop', href: '/docs/interop', slug: 'interop' },
          { title: 'Servers', href: '/docs/servers', slug: 'servers' },
        ],
      },
    ],
  },
  {
    id: 'guides-by-language',
    title: 'Guides by Language',
    sections: [
      {
        title: 'Overview',
        items: [
          { title: 'Compatibility', href: '/docs/compatibility', slug: 'compatibility' },
        ],
      },
      {
        title: 'Supported Languages',
        items: [
          { title: 'JavaScript', href: '/docs/javascript', slug: 'javascript' },
          { title: 'TypeScript', href: '/docs/typescript', slug: 'typescript' },
          { title: 'Python', href: '/docs/python', slug: 'python' },
          { title: 'Ruby', href: '/docs/ruby', slug: 'ruby' },
        ],
      },
      {
        title: 'Additional Languages',
        items: [
          { title: 'WebAssembly', href: '/docs/webassembly', slug: 'webassembly' },
          { title: 'Pkl', href: '/docs/pkl', slug: 'pkl' },
          { title: 'Experimental Engines', href: '/docs/experimental-engines', slug: 'experimental-engines' },
        ],
      },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    sections: [
      {
        title: 'Core Topics',
        items: [
          { title: 'Security', href: '/docs/security', slug: 'security' },
          { title: 'Performance', href: '/docs/performance', slug: 'performance' },
        ],
      },
    ],
  },
  {
    id: 'releases',
    title: 'Releases',
    sections: [
      {
        title: 'Version History',
        items: [
          { title: '1.0.0-beta10', href: '/docs/releases', slug: 'releases' },
        ],
      },
    ],
  },
]

// Flatten to get all docs
const docsConfig = navbarSections.flatMap(nav => nav.sections)

const CONTENT_DIR = path.join(__dirname, 'content/docs')
const DIST_DIR = path.join(__dirname, 'dist')
const PUBLIC_DIR = path.join(__dirname, 'public')

// Comprehensive syntax highlighter for code blocks
function highlightCode(code, language) {
  if (!language || language === 'text' || language === 'plain') {
    return code
  }
  
  let highlighted = code
  const tokens = []
  let tokenIndex = 0
  
  // Helper to create a unique token
  const createToken = (className, content) => {
    const token = `__TOKEN_${tokenIndex}__`
    tokens.push({ token, html: `<span class="${className}">${content}</span>` })
    tokenIndex++
    return token
  }
  
  // JavaScript/TypeScript
  if (language === 'javascript' || language === 'js' || language === 'typescript' || language === 'ts' || language === 'jsx' || language === 'tsx') {
    // Comments first (so they don't get overwritten)
    highlighted = highlighted.replace(/\/\/(.*?)$/gm, (match, content) => createToken('comment', '//' + content))
    highlighted = highlighted.replace(/\/\*([\s\S]*?)\*\//g, (match, content) => createToken('comment', '/*' + content + '*/'))
    
    // Strings (must come before other patterns)
    highlighted = highlighted.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => createToken('string', match))
    
    // Keywords
    highlighted = highlighted.replace(/\b(const|let|var|function|async|await|return|if|else|for|while|do|switch|case|break|continue|class|extends|implements|interface|type|enum|namespace|module|import|export|from|default|new|try|catch|finally|throw|typeof|instanceof|void|null|undefined|this|super|static|public|private|protected|readonly)\b/g, (match) => createToken('keyword', match))
    
    // Booleans
    highlighted = highlighted.replace(/\b(true|false)\b/g, (match) => createToken('boolean', match))
    
    // Numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) => createToken('number', match))
    
    // Method calls (property followed by function call) - do this before standalone functions
    highlighted = highlighted.replace(/\.([a-zA-Z_$][\w$]*)\s*(?=\()/g, (match, name) => '.' + createToken('function', name))
    
    // Standalone function calls
    highlighted = highlighted.replace(/(?<![.\w])([a-zA-Z_$][\w$]*)\s*(?=\()/g, (match, name) => {
      // Don't match if it's after a dot (already handled above)
      return createToken('function', name)
    })
    
    // Properties (non-function)
    highlighted = highlighted.replace(/\.([a-zA-Z_$][\w$]*)(?!\s*\()/g, (match, prop) => {
      // Skip if it's a token
      if (prop.startsWith('__TOKEN_')) return match
      return '.' + createToken('property', prop)
    })
  }
  
  // Bash/Shell
  if (language === 'bash' || language === 'sh' || language === 'shell') {
    // Comments
    highlighted = highlighted.replace(/#(.*?)$/gm, (match, content) => createToken('comment', '#' + content))
    
    // Strings
    highlighted = highlighted.replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, (match) => createToken('string', match))
    
    // Shell keywords
    highlighted = highlighted.replace(/\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|export|source)\b/g, (match) => createToken('keyword', match))
    
    // Commands at start of line or after pipe/semicolon
    highlighted = highlighted.replace(/(^|\||;)\s*([a-z\-]+)/gm, (match, prefix, cmd) => prefix + ' ' + createToken('function', cmd))
    
    // Flags
    highlighted = highlighted.replace(/\s(--?[a-zA-Z][\w-]*)/g, (match, flag) => ' ' + createToken('flag', flag))
  }
  
  // Python
  if (language === 'python' || language === 'py') {
    // Comments
    highlighted = highlighted.replace(/#(.*?)$/gm, (match, content) => createToken('comment', '#' + content))
    
    // Strings (including multiline)
    highlighted = highlighted.replace(/("""[\s\S]*?""")|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')/g, (match) => createToken('string', match))
    
    // Keywords
    highlighted = highlighted.replace(/\b(def|class|import|from|as|return|if|elif|else|for|while|in|not|and|or|is|try|except|finally|with|raise|yield|lambda|pass|break|continue|global|nonlocal|async|await|True|False|None)\b/g, (match) => createToken('keyword', match))
    
    // Function definitions (must come after keyword replacement)
    highlighted = highlighted.replace(new RegExp(`(${tokens[tokens.length-1]?.token || '__TOKEN_\\d+__'})\\s+([a-zA-Z_]\\w*)`, 'g'), (match, defToken, name) => {
      // Check if defToken is 'def'
      return defToken + ' ' + createToken('function', name)
    })
    
    // Function calls
    highlighted = highlighted.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, (match) => createToken('function', match))
    
    // Numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) => createToken('number', match))
  }
  
  // JSON
  if (language === 'json') {
    // Strings (including keys)
    highlighted = highlighted.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, (match) => createToken('string', match))
    
    // Numbers
    highlighted = highlighted.replace(/:\s*(\d+\.?\d*)/g, (match, num) => ': ' + createToken('number', num))
    
    // Booleans
    highlighted = highlighted.replace(/\b(true|false|null)\b/g, (match) => createToken('boolean', match))
  }
  
  // Replace all tokens with their HTML
  for (const { token, html } of tokens) {
    highlighted = highlighted.replace(new RegExp(token, 'g'), html)
  }
  
  return highlighted
}

// Clean and create dist directory
async function setup() {
  console.log('🧹 Cleaning dist directory...')
  await fs.rm(DIST_DIR, { recursive: true, force: true })
  await fs.mkdir(DIST_DIR, { recursive: true })
  await fs.mkdir(path.join(DIST_DIR, 'docs'), { recursive: true })
  await fs.mkdir(path.join(DIST_DIR, 'assets'), { recursive: true })
}

// Copy static assets
async function copyAssets() {
  console.log('📦 Copying static assets...')
  
  try {
    const files = await fs.readdir(PUBLIC_DIR)
    for (const file of files) {
      const src = path.join(PUBLIC_DIR, file)
      const dest = path.join(DIST_DIR, 'assets', file)
      const stat = await fs.stat(src)
      
      if (stat.isFile()) {
        await fs.copyFile(src, dest)
        console.log(`  ✓ Copied ${file}`)
      }
    }
  } catch (err) {
    console.warn('  ⚠ Could not copy public assets:', err.message)
  }
}

// Generate static navbar HTML with active state
function generateNavBarHTML(currentSlug) {
  // Find which navbar section the current slug belongs to
  let activeNavId = null
  for (const nav of navbarSections) {
    for (const section of nav.sections) {
      if (section.items.some(item => item.slug === currentSlug)) {
        activeNavId = nav.id
        break
      }
    }
    if (activeNavId) break
  }
  
  // Helper to check if a nav item is active
  const isNavActive = (navId) => navId === activeNavId
  
  // Icon mapping for navbar sections
  const navIcons = {
    'runtime': '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>',
    'polyglot-101': '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
    'guides-by-language': '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
    'architecture': '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
    'releases': '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>',
    'blog': '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>',
    'examples': '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
  }
  
  // Generate left navbar sections (Runtime, Polyglot 101, Guides by Language, Architecture)
  const leftNavSections = navbarSections.filter(nav => nav.id !== 'releases')
  const leftNavHTML = leftNavSections.map(nav => {
    const isActive = isNavActive(nav.id)
    const firstSlug = nav.sections[0]?.items[0]?.slug || 'introduction'
    const icon = navIcons[nav.id] || ''
    return `
      <a href="/docs/${firstSlug}.html" class="flex items-center gap-2 px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-200 relative ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}">
        ${icon}
        <span>${nav.title}</span>
        ${isActive ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>' : ''}
      </a>
    `
  }).join('')
  
  // Releases and other right sections
  const releasesActive = activeNavId === 'releases'
  
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card/80 backdrop-blur-md border-b border-border shadow-lg">
      <!-- Top Row - Logo, Search, Install -->
      <div class="border-b border-border/50">
        <div class="max-w-[1920px] mx-auto px-6 lg:px-8 xl:px-12">
          <div class="flex justify-between items-center h-16">
            <!-- Logo (Far Left) -->
            <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/assets/light.svg" alt="Elide" class="h-8 w-auto" />
            </a>

            <!-- Search Bar - Desktop (Center) -->
            <div class="hidden md:flex flex-1 max-w-md mx-8 lg:mx-12 xl:mx-16">
              <div class="relative w-full">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  class="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <kbd class="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-xs bg-muted rounded border border-border">
                  ⌘K
                </kbd>
              </div>
            </div>

            <!-- Install Button - Desktop -->
            <div class="hidden md:block">
              <a href="https://github.com/elide-dev/elide" class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 rounded-md">
                <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Install Elide
              </a>
            </div>

            <!-- Mobile menu button -->
            <button class="md:hidden p-2" id="mobile-menu-btn">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Row - Navigation (Aligned with Logo) -->
      <div class="hidden md:block">
        <div class="max-w-[1920px] mx-auto px-6 lg:px-8 xl:px-12">
          <div class="flex justify-between items-center">
            <!-- Left Navigation - Aligned with Logo above -->
            <div class="flex items-center gap-2 lg:gap-4 xl:gap-6">
              ${leftNavHTML}
            </div>

            <!-- Right Secondary Links -->
            <div class="flex items-center gap-2 lg:gap-4 xl:gap-6">
              <a href="/docs/releases.html" class="flex items-center gap-2 px-3 lg:px-4 py-3 text-sm font-medium transition-all duration-200 relative ${releasesActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <span>Releases</span>
                ${releasesActive ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>' : ''}
              </a>
              <a href="/blog" class="flex items-center gap-2 px-3 lg:px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <span>Blog</span>
              </a>
              <a href="/examples" class="flex items-center gap-2 px-3 lg:px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Examples</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
}

// Generate static sidebar HTML from docs-config - filtered by navbar section
function generateSidebarHTML(currentSlug) {
  // Find which navbar section this slug belongs to
  let currentNavSection = null
  for (const nav of navbarSections) {
    for (const section of nav.sections) {
      if (section.items.some(item => item.slug === currentSlug)) {
        currentNavSection = nav
        break
      }
    }
    if (currentNavSection) break
  }
  
  // Default to first navbar section if not found
  if (!currentNavSection) {
    currentNavSection = navbarSections[0]
  }
  
  let sidebarHTML = `
    <aside class="fixed top-28 left-0 z-40 h-[calc(100vh-7rem)] w-64 border-r border-border bg-card/30 backdrop-blur-md hidden lg:block">
      <div class="flex flex-col h-full p-6 overflow-y-auto">
        <div class="mb-8">
          <h2 class="text-xl font-bold text-foreground mb-1">${currentNavSection.title}</h2>
          <p class="text-sm text-muted-foreground">Technical reference & guides</p>
        </div>
        <nav class="space-y-8 flex-1">
  `
  
  // Only show sections from the current navbar section
  for (const section of currentNavSection.sections) {
    sidebarHTML += `
          <div>
            <h3 class="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ${section.title}
            </h3>
            <ul class="space-y-1">
    `
    
    for (const item of section.items) {
      const isActive = item.slug === currentSlug
      const activeClass = isActive ? 'bg-accent text-accent-foreground shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''
      const textColor = isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
      sidebarHTML += `
              <li>
                <a 
                  href="/docs/${item.slug}.html" 
                  class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200 group ${activeClass}"
                >
                  <span class="h-4 w-4 ${textColor} transition-colors">•</span>
                  ${item.title}
                </a>
              </li>
      `
    }
    
    sidebarHTML += `
            </ul>
          </div>
    `
  }
  
  sidebarHTML += `
        </nav>
      </div>
    </aside>
  `
  
  return sidebarHTML
}

// Extract headings from HTML content for TOC
function extractHeadings(html) {
  const headings = []
  const headingRegex = /<h([2-3])(?:[^>]*)>(.*?)<\/h[2-3]>/gi
  let match
  
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, '').trim() // Remove any HTML tags
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    
    headings.push({ level, text, id })
  }
  
  return headings
}

// Generate dynamic table of contents based on page content
function generateTocHTML(content) {
  const headings = extractHeadings(content)
  
  if (headings.length === 0) {
    return `
      <aside class="hidden lg:block fixed top-28 right-0 w-64 h-[calc(100vh-7rem)] overflow-y-auto">
        <div class="p-6">
          <div class="text-sm font-semibold text-foreground mb-4">
            On this page
          </div>
          <nav class="space-y-1 border-l-2 border-border">
            <p class="block py-2 px-4 text-sm text-muted-foreground">No sections found</p>
          </nav>
        </div>
      </aside>
    `
  }
  
  const tocItems = headings.map((heading, index) => {
    const isFirstItem = index === 0
    const indent = heading.level === 3 ? 'pl-8' : 'pl-4'
    // First item is active by default
    const activeClass = isFirstItem ? 'text-primary border-primary' : 'text-muted-foreground border-transparent'
    return `
      <a 
        href="#${heading.id}" 
        data-toc-id="${heading.id}"
        class="toc-link block py-2 ${indent} text-sm ${activeClass} hover:border-l-[3px] border-l-2 -ml-[2px] transition-all duration-200"
        style="border-left-color: ${isFirstItem ? 'rgb(168, 85, 247)' : 'transparent'};"
      >
        ${heading.text}
      </a>
    `
  }).join('')
  
  return `
    <aside class="hidden lg:block fixed top-28 right-0 w-64 h-[calc(100vh-7rem)] overflow-y-auto">
      <div class="p-6">
        <div class="text-sm font-semibold text-foreground mb-4">
          On this page
        </div>
        <nav id="toc-nav" class="space-y-1 border-l-2 border-border">
          ${tocItems}
        </nav>
      </div>
    </aside>
  `
}

// Add IDs to headings in HTML content
function addHeadingIds(html) {
  return html.replace(/<h([2-3])>(.*?)<\/h[2-3]>/gi, (match, level, text) => {
    const cleanText = text.replace(/<[^>]*>/g, '').trim()
    const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `<h${level} id="${id}">${text}</h${level}>`
  })
}

// Generate complete HTML page using components
function generateHTMLPage(title, content, slug) {
  // Add IDs to headings for TOC navigation
  const contentWithIds = addHeadingIds(content)
  
  const navbar = generateNavBarHTML(slug)
  const sidebar = generateSidebarHTML(slug)
  const toc = generateTocHTML(contentWithIds)
  
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Elide Docs</title>
  <meta name="description" content="Elide Documentation - ${title}">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
  <link rel="icon" href="/assets/icon-light-32x32.png" media="(prefers-color-scheme: light)">
  <link rel="icon" href="/assets/icon-dark-32x32.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" href="/assets/apple-icon.png">
</head>
<body>
  <div id="app">
    <div class="glow-bg min-h-screen bg-background text-foreground">
      <!-- Navigation Bar -->
      ${navbar}

      <!-- Mobile menu button -->
      <div class="fixed top-32 left-4 z-40 lg:hidden">
        <button class="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border bg-card/50 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div class="flex pt-28">
        <!-- Left Sidebar - Navigation -->
        ${sidebar}

        <!-- Main Content -->
        <main class="flex-1 lg:ml-64 lg:mr-64 min-w-0">
          <div class="container mx-auto px-6 py-16 max-w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            <div class="w-full">
              <article class="mdx-content">
                ${contentWithIds}
              </article>
            </div>
          </div>
        </main>

        <!-- Right Sidebar - Table of Contents -->
        ${toc}
      </div>
    </div>
  </div>

  <script>
    // Basic mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        // Toggle mobile menu
        console.log('Mobile menu toggle');
      });
    }

    // Table of Contents scroll tracking with pink/purple highlighting
    (function() {
      const tocLinks = document.querySelectorAll('.toc-link');
      if (tocLinks.length === 0) return;

      // Purple/pink color
      const activeColor = 'rgb(168, 85, 247)';
      const activeBorderWidth = '3px';
      const inactiveBorderWidth = '2px';

      // Get all headings that have IDs
      const headings = Array.from(document.querySelectorAll('h2[id], h3[id]'));
      
      // Function to update active TOC link with pink/purple styling
      function updateActiveTocLink() {
        // Get current scroll position (reduced offset for earlier detection)
        const scrollPosition = window.scrollY + 150; // Earlier detection
        
        // Find the current heading (default to first if at top of page)
        let currentHeading = headings[0]; // Always default to first
        
        for (let i = headings.length - 1; i >= 0; i--) {
          if (headings[i].offsetTop <= scrollPosition) {
            currentHeading = headings[i];
            break;
          }
        }
        
        // Update TOC links - ensure there's always an active one
        tocLinks.forEach(link => {
          const tocId = link.getAttribute('data-toc-id');
          const isActive = currentHeading && currentHeading.id === tocId;
          
          if (isActive) {
            // Active state: pink/purple border and text with explicit styling
            link.classList.remove('text-muted-foreground', 'border-transparent');
            link.classList.add('text-primary');
            link.style.borderLeftColor = activeColor;
            link.style.borderLeftWidth = activeBorderWidth;
            link.style.color = activeColor;
          } else {
            // Inactive state
            link.classList.remove('text-primary');
            link.classList.add('text-muted-foreground');
            link.style.borderLeftColor = 'transparent';
            link.style.borderLeftWidth = inactiveBorderWidth;
            link.style.color = '';
          }
        });
      }
      
      // Add hover effects
      tocLinks.forEach(link => {
        // Hover in
        link.addEventListener('mouseenter', () => {
          link.style.borderLeftColor = activeColor;
          link.style.borderLeftWidth = activeBorderWidth;
          link.style.color = activeColor;
        });
        
        // Hover out - restore state
        link.addEventListener('mouseleave', () => {
          const tocId = link.getAttribute('data-toc-id');
          const scrollPosition = window.scrollY + 150;
          let currentHeading = headings[0];
          
          for (let i = headings.length - 1; i >= 0; i--) {
            if (headings[i].offsetTop <= scrollPosition) {
              currentHeading = headings[i];
              break;
            }
          }
          
          const isActive = currentHeading && currentHeading.id === tocId;
          
          if (!isActive) {
            link.style.borderLeftColor = 'transparent';
            link.style.borderLeftWidth = inactiveBorderWidth;
            link.style.color = '';
          }
        });
        
        // Click handler for smooth scroll
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('data-toc-id');
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const offset = 120; // Account for fixed navbar
            const targetPosition = targetElement.offsetTop - offset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            // Update immediately
            setTimeout(updateActiveTocLink, 100);
          }
        });
      });
      
      // Update on scroll (throttled for performance)
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateActiveTocLink();
            ticking = false;
          });
          ticking = true;
        }
      });
      
      // Initial update
      updateActiveTocLink();
    })();
  </script>
</body>
</html>`
}

// Process MDX file and convert to HTML
async function processMDXFile(slug) {
  console.log(`  📄 Processing ${slug}...`)
  
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const source = await fs.readFile(filePath, 'utf8')
  
  // Parse frontmatter
  const { content: mdxContent, data: frontmatter } = matter(source)
  
  // Compile MDX to HTML
  const compiled = await compile(mdxContent, {
    outputFormat: 'function-body',
    development: false,
  })
  
  // Custom MDX components
  const Alert = ({ children, variant = 'default', ...props }) => {
    const variants = {
      default: 'bg-gradient-to-br from-primary-50/80 to-pink-50/60 border border-primary-200/50 dark:from-primary-950/30 dark:to-pink-950/20 dark:border-primary-800/30',
      info: 'bg-gradient-to-br from-blue-50/80 to-sky-50/60 border border-blue-200/50 dark:from-blue-950/30 dark:to-sky-950/20 dark:border-blue-800/30',
      warning: 'bg-gradient-to-br from-yellow-50/80 to-orange-50/60 border border-yellow-200/50 dark:from-yellow-950/30 dark:to-orange-950/20 dark:border-yellow-800/30',
      destructive: 'bg-gradient-to-br from-red-50/80 to-pink-50/60 border border-red-200/50 dark:from-red-950/30 dark:to-pink-950/20 dark:border-red-800/30'
    }
    
    const borderColors = {
      default: 'from-primary-500 to-pink-500 dark:from-primary-400 dark:to-pink-400',
      info: 'from-blue-500 to-sky-500 dark:from-blue-400 dark:to-sky-400',
      warning: 'from-yellow-500 to-orange-500 dark:from-yellow-400 dark:to-orange-400',
      destructive: 'from-red-500 to-pink-500 dark:from-red-400 dark:to-pink-400'
    }
    
    return React.createElement('div', {
      role: 'alert',
      className: `alert relative w-full rounded-xl px-5 py-4 my-6 shadow-sm ${variants[variant] || variants.default}`,
      ...props
    }, [
      React.createElement('div', {
        key: 'border',
        className: `absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b ${borderColors[variant] || borderColors.default}`
      }),
      React.createElement('div', {
        key: 'content',
        className: 'relative z-10 text-sm leading-relaxed [&>strong]:block [&>strong]:mb-2 [&>strong]:font-bold [&>strong]:text-foreground'
      }, children)
    ])
  }

  // Create a function from the compiled code
  const { default: MDXContent } = await evaluateSync(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
    useMDXComponents: () => ({
      Alert,
      // Tabs components would go here too if needed
    })
  })
  
  // Render to HTML string
  let contentHTML = renderToStaticMarkup(React.createElement(MDXContent))
  
  // Post-process HTML to add syntax highlighting to code blocks
  contentHTML = contentHTML.replace(
    /<pre><code class="language-(\w+)">(.*?)<\/code><\/pre>/gs,
    (match, language, code) => {
      // Decode HTML entities
      const decoded = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
      
      // Apply syntax highlighting
      const highlighted = highlightCode(decoded, language)
      
      return `<pre><code class="language-${language}">${highlighted}</code></pre>`
    }
  )
  
  // Also handle className format from React
  contentHTML = contentHTML.replace(
    /<code className="language-(\w+)">/g,
    '<code class="language-$1">'
  )
  
  const title = frontmatter.title || slug
  const html = generateHTMLPage(title, contentHTML, slug)
  
  // Write the HTML file
  const outputPath = path.join(DIST_DIR, 'docs', `${slug}.html`)
  await fs.writeFile(outputPath, html, 'utf8')
  
  console.log(`  ✓ Generated ${slug}.html`)
  
  return { slug, title, frontmatter }
}

// Simplified MDX to HTML converter
async function simpleProcessMDXFile(slug) {
  console.log(`  📄 Processing ${slug}...`)
  
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const source = await fs.readFile(filePath, 'utf8')
  
  // Parse frontmatter
  const { content: mdxContent, data: frontmatter } = matter(source)
  
  // Simple markdown to HTML conversion
  let html = mdxContent
    // Remove imports
    .replace(/^import\s+.+$/gm, '')
  
  // Process code blocks with syntax highlighting FIRST
  html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, language, code) => {
    const trimmedCode = code.trim()
    const highlighted = highlightCode(trimmedCode, language || '')
    return `<pre><code class="language-${language || 'text'}">${highlighted}</code></pre>`
  })
  
  // Process markdown tables
  html = html.replace(/\n\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match, headerRow, bodyRows) => {
    const headers = headerRow.split('|').map(h => h.trim()).filter(h => h)
    const rows = bodyRows.trim().split('\n').map(row => 
      row.split('|').map(cell => cell.trim()).filter(cell => cell)
    )
    
    let tableHTML = '<div class="overflow-x-auto my-8"><table class="w-full"><thead><tr>'
    headers.forEach(header => {
      tableHTML += `<th class="text-left py-4 px-6">${header}</th>`
    })
    tableHTML += '</tr></thead><tbody>'
    
    rows.forEach((row, idx) => {
      tableHTML += '<tr>'
      row.forEach((cell, cellIdx) => {
        // Check if this is the first column
        const isFirstCol = cellIdx === 0
        // Check if this is the second column (Elide column) and make it green
        const isElideCol = cellIdx === 1
        const cellClass = isFirstCol ? 'py-4 px-6 font-semibold' : 
                         isElideCol ? 'py-4 px-6 text-green-400 font-mono' : 
                         'py-4 px-6 text-muted-foreground font-mono'
        tableHTML += `<td class="${cellClass}">${cell}</td>`
      })
      tableHTML += '</tr>'
    })
    
    tableHTML += '</tbody></table></div>'
    return tableHTML
  })
  
  // Continue with other conversions
  html = html
    // Headers
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Paragraphs
    .split('\n\n')
    .map(para => {
      para = para.trim()
      if (!para || para.startsWith('<')) return para
      return `<p>${para}</p>`
    })
    .join('\n')
  
  const title = frontmatter.title || slug
  const pageHTML = generateHTMLPage(title, html, slug)
  
  // Write the HTML file
  const outputPath = path.join(DIST_DIR, 'docs', `${slug}.html`)
  await fs.writeFile(outputPath, pageHTML, 'utf8')
  
  console.log(`  ✓ Generated ${slug}.html`)
  
  return { slug, title, frontmatter }
}

// Generate index/home page
async function generateIndex() {
  console.log('🏠 Generating index page...')
  
  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elide Documentation</title>
  <meta name="description" content="Official documentation for Elide - A fast, polyglot runtime">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
  <link rel="icon" href="/assets/icon-light-32x32.png" media="(prefers-color-scheme: light)">
  <link rel="icon" href="/assets/icon-dark-32x32.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" href="/assets/apple-icon.png">
</head>
<body class="bg-background text-foreground">
  <div class="glow-bg min-h-screen flex items-center justify-center px-4">
    <div class="text-center max-w-2xl mx-auto">
      <!-- Logo -->
      <div class="mb-8 flex justify-center">
        <img src="/assets/light.svg" alt="Elide" class="h-24 w-auto" />
      </div>
      
      <!-- Title -->
      <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
        Elide Documentation
      </h1>
      
      <!-- Description -->
      <p class="text-xl text-muted-foreground mb-12">
        Fast, polyglot runtime for JavaScript, TypeScript, Python, and more
      </p>
      
      <!-- Button -->
      <a 
        href="/docs/introduction.html" 
        class="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 rounded-lg text-lg font-semibold"
      >
        View Documentation
        <svg class="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
      
      <!-- Optional: Quick links -->
      <div class="mt-16 flex justify-center gap-6 text-sm">
        <a href="https://github.com/elide-dev/elide" class="text-muted-foreground hover:text-foreground transition-colors">
          GitHub
        </a>
        <span class="text-muted-foreground">·</span>
        <a href="/docs/quick-start.html" class="text-muted-foreground hover:text-foreground transition-colors">
          Quick Start
        </a>
        <span class="text-muted-foreground">·</span>
        <a href="/docs/installation.html" class="text-muted-foreground hover:text-foreground transition-colors">
          Installation
        </a>
      </div>
    </div>
  </div>
</body>
</html>`
  
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), html, 'utf8')
  
  console.log('  ✓ Generated index.html (landing page)')
}

// Get all doc slugs from config
function getAllDocSlugs() {
  return navbarSections.flatMap(nav =>
    nav.sections.flatMap(section =>
      section.items.map(item => item.slug)
    )
  )
}

// Main build function
async function build() {
  console.log('🚀 Building Elide Documentation (Static)...\n')
  
  try {
    // Setup
    await setup()
    
    // Copy assets
    await copyAssets()
    
    // Get all docs from config
    console.log('\n📚 Processing documentation files...')
    const slugs = getAllDocSlugs()
    console.log(`  Found ${slugs.length} documents\n`)
    
    // Process each doc
    const docs = []
    for (const slug of slugs) {
      try {
        const doc = await simpleProcessMDXFile(slug)
        docs.push(doc)
      } catch (err) {
        console.error(`  ✗ Error processing ${slug}:`, err.message)
      }
    }
    
    // Generate index page
    await generateIndex()
    
    console.log('\n✅ Build complete! Files in dist/')
    console.log('\n📖 To view the docs, run:')
    console.log('   elide serve dist --port 3000')
    console.log('   or')
    console.log('   bun run serve')
    
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

// Helper to evaluate compiled MDX (when needed)
async function evaluateSync(code, options) {
  // For now, return a simple component
  // In production, you'd use @mdx-js/mdx's evaluate
  return {
    default: () => null
  }
}

// Run the build
build()

