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
import matter from 'gray-matter'

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
      { title: 'README', href: '/docs/readme', slug: 'readme' },
          { title: 'Installation', href: '/docs/installation', slug: 'installation' },
          { title: 'Getting Started', href: '/docs/getting-started', slug: 'getting-started' },
          { title: 'Elide Runtime', href: '/docs/runtime', slug: 'runtime' },
    ],
  },
  {
        title: 'Documentation',
    items: [
          { title: 'CLI References', href: '/docs/cli-references', slug: 'cli-references' },
          { title: 'Connect to IDE', href: '/docs/connect-ide', slug: 'connect-ide' },
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
      { 
        title: 'JavaScript', 
        href: '/docs/javascript', 
        slug: 'javascript',
        children: [
          { 
            title: 'Node API', 
            href: '/docs/javascript-node-api', 
            slug: 'javascript-node-api',
            children: [
              { title: 'Assertions', href: '/docs/javascript-node-assertions', slug: 'javascript-node-assertions' },
              { title: 'Async Hooks', href: '/docs/javascript-node-async-hooks', slug: 'javascript-node-async-hooks', comingSoon: true },
              { title: 'Buffer', href: '/docs/javascript-node-buffer', slug: 'javascript-node-buffer' },
              { title: 'Child Process', href: '/docs/javascript-node-child-process', slug: 'javascript-node-child-process' },
              { title: 'Crypto', href: '/docs/javascript-node-crypto', slug: 'javascript-node-crypto', comingSoon: true },
              { title: 'DNS', href: '/docs/javascript-node-dns', slug: 'javascript-node-dns', comingSoon: true },
              { title: 'Events', href: '/docs/javascript-node-events', slug: 'javascript-node-events' },
              { title: 'Filesystem', href: '/docs/javascript-node-filesystem', slug: 'javascript-node-filesystem' },
              { title: 'HTTP', href: '/docs/javascript-node-http', slug: 'javascript-node-http', comingSoon: true },
              { title: 'HTTP/2', href: '/docs/javascript-node-http2', slug: 'javascript-node-http2', comingSoon: true },
              { title: 'HTTPS', href: '/docs/javascript-node-https', slug: 'javascript-node-https', comingSoon: true },
              { title: 'Inspector', href: '/docs/javascript-node-inspector', slug: 'javascript-node-inspector', comingSoon: true },
              { title: 'Modules', href: '/docs/javascript-node-modules', slug: 'javascript-node-modules', comingSoon: true },
              { title: 'Net', href: '/docs/javascript-node-net', slug: 'javascript-node-net', comingSoon: true },
              { title: 'OS', href: '/docs/javascript-node-os', slug: 'javascript-node-os' },
              { title: 'Path', href: '/docs/javascript-node-path', slug: 'javascript-node-path' },
              { title: 'Performance Hooks', href: '/docs/javascript-node-performance-hooks', slug: 'javascript-node-performance-hooks', comingSoon: true },
              { title: 'Query Strings', href: '/docs/javascript-node-query-strings', slug: 'javascript-node-query-strings', comingSoon: true },
              { title: 'Readline', href: '/docs/javascript-node-readline', slug: 'javascript-node-readline', comingSoon: true },
              { title: 'Stream', href: '/docs/javascript-node-stream', slug: 'javascript-node-stream', comingSoon: true },
              { title: 'String Decoder', href: '/docs/javascript-node-string-decoder', slug: 'javascript-node-string-decoder', comingSoon: true },
              { title: 'Test Runner', href: '/docs/javascript-node-test-runner', slug: 'javascript-node-test-runner', comingSoon: true },
              { title: 'Timers', href: '/docs/javascript-node-timers', slug: 'javascript-node-timers', comingSoon: true },
              { title: 'TLS/SSL', href: '/docs/javascript-node-tls-ssl', slug: 'javascript-node-tls-ssl', comingSoon: true },
              { title: 'TTY', href: '/docs/javascript-node-tty', slug: 'javascript-node-tty', comingSoon: true },
              { title: 'UDP/Datagram', href: '/docs/javascript-node-udp-datagram', slug: 'javascript-node-udp-datagram', comingSoon: true },
              { title: 'URL', href: '/docs/javascript-node-url', slug: 'javascript-node-url' },
              { title: 'Utilities', href: '/docs/javascript-node-utilities', slug: 'javascript-node-utilities', comingSoon: true },
              { title: 'V8', href: '/docs/javascript-node-v8', slug: 'javascript-node-v8', comingSoon: true },
              { title: 'VM', href: '/docs/javascript-node-vm', slug: 'javascript-node-vm', comingSoon: true },
              { title: 'WASI', href: '/docs/javascript-node-wasi', slug: 'javascript-node-wasi', comingSoon: true },
              { title: 'Worker Threads', href: '/docs/javascript-node-worker-threads', slug: 'javascript-node-worker-threads', comingSoon: true },
              { title: 'Zlib', href: '/docs/javascript-node-zlib', slug: 'javascript-node-zlib' },
            ]
          },
          { 
            title: 'Web & JavaScript APIs', 
            href: '/docs/javascript-web-apis', 
            slug: 'javascript-web-apis',
            children: [
              { title: 'Encoding API', slug: 'javascript-web-encoding' },
              { title: 'Fetch API', slug: 'javascript-web-fetch', comingSoon: true },
              { title: 'URL API', slug: 'javascript-web-url' },
              { title: 'Web Crypto API', slug: 'javascript-web-crypto', comingSoon: true },
              { title: 'Web Streams API', slug: 'javascript-web-streams', comingSoon: true },
            ]
          },
          { title: 'WinterTC', href: '/docs/javascript-wintertc', slug: 'javascript-wintertc' },
          { title: 'SQLite in JavaScript', href: '/docs/javascript-sqlite', slug: 'javascript-sqlite' },
          { title: 'JavaScript Tools', href: '/docs/javascript-tools', slug: 'javascript-tools' },
        ]
      },
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
    id: 'api',
    title: 'API',
    sections: [
      {
        title: 'API Documentation',
        items: [
          { title: 'API Overview', href: '/docs/api-overview', slug: 'api-overview' },
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
  console.log('[CLEAN] Cleaning dist directory...')
  await fs.rm(DIST_DIR, { recursive: true, force: true })
  await fs.mkdir(DIST_DIR, { recursive: true })
  await fs.mkdir(path.join(DIST_DIR, 'docs'), { recursive: true })
  await fs.mkdir(path.join(DIST_DIR, 'assets'), { recursive: true })
}

// Copy static assets
async function copyAssets() {
  console.log('[COPY] Copying static assets...')
  
  async function copyRecursive(src, dest) {
    const stat = await fs.stat(src)
    
    if (stat.isFile()) {
      await fs.copyFile(src, dest)
      return
    }
    
    if (stat.isDirectory()) {
      await fs.mkdir(dest, { recursive: true })
      const entries = await fs.readdir(src)
      
      for (const entry of entries) {
        await copyRecursive(
          path.join(src, entry),
          path.join(dest, entry)
        )
      }
    }
  }
  
  // Copy public directory files
  try {
    const files = await fs.readdir(PUBLIC_DIR)
    for (const file of files) {
      const src = path.join(PUBLIC_DIR, file)
      const dest = path.join(DIST_DIR, 'assets', file)
      
      await copyRecursive(src, dest)
      console.log(`  [OK] Copied ${file}`)
    }
  } catch (err) {
    console.warn('  [WARN] Could not copy public assets:', err.message)
  }
  
  // Copy fonts directory
  try {
    const fontsSource = path.join(__dirname, 'assets', 'fonts')
    const fontsDest = path.join(DIST_DIR, 'assets', 'fonts')
    
    await copyRecursive(fontsSource, fontsDest)
    console.log(`  [OK] Copied fonts directory`)
  } catch (err) {
    console.warn('  [WARN] Could not copy fonts:', err.message)
  }
}

// Generate static navbar HTML with active state
function generateNavBarHTML(currentSlug) {
  // Helper to check if slug exists anywhere in the tree
  const containsSlug = (item, targetSlug) => {
    if (item.slug === targetSlug) return true
    if (item.children && item.children.length > 0) {
      return item.children.some(child => containsSlug(child, targetSlug))
    }
    return false
  }
  
  // Find which navbar section the current slug belongs to
  let activeNavId = null
  for (const nav of navbarSections) {
    for (const section of nav.sections) {
      if (section.items.some(item => containsSlug(item, currentSlug))) {
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
    'runtime': '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>',
    'polyglot-101': '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
    'guides-by-language': '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
    'architecture': '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
    'api': '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>',
    'releases': '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>',
    'blog': '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>',
    'examples': '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>'
  }
  
  // Generate left navbar sections (Runtime, Polyglot 101, Guides by Language, Architecture)
  const leftNavSections = navbarSections.filter(nav => nav.id !== 'releases')
  const leftNavHTML = leftNavSections.map(nav => {
    const isActive = isNavActive(nav.id)
    const firstSlug = nav.sections[0]?.items[0]?.slug || 'readme'
    const icon = navIcons[nav.id] || ''
  return `
      <a href="/docs/${firstSlug}.html" class="flex items-center gap-2.5 px-4 lg:px-5 py-4 text-base font-medium transition-all duration-200 relative ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}">
        ${icon}
        <span>${nav.title}</span>
        ${isActive ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>' : ''}
      </a>
    `
  }).join('')
  
  // Releases and other right sections
  const releasesActive = activeNavId === 'releases'
  
  return `
    <!-- Search Backdrop Overlay -->
    <div id="search-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-md z-40 opacity-0 pointer-events-none transition-opacity duration-300"></div>
    
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card/80 backdrop-blur-md border-b border-border shadow-lg">
      <!-- Top Row - Logo, Search, Install -->
      <div class="border-b border-border/50">
        <div class="w-full px-8 lg:px-10 xl:px-14">
          <div class="flex justify-between items-center h-20">
            <!-- Logo (Far Left) -->
            <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/assets/light.svg" alt="Elide" class="h-10 w-auto" />
            </a>

            <!-- Search Bar - Desktop (Center) -->
            <div class="hidden md:flex flex-1 max-w-md mx-10 lg:mx-14 xl:mx-20">
              <div id="search-container" class="relative w-full transition-all duration-300">
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search..."
                  class="w-full pl-12 pr-5 py-3 bg-background/50 border border-border rounded-md text-base focus:outline-none transition-all duration-300"
                />
                <kbd class="absolute right-4 top-1/2 transform -translate-y-1/2 px-2.5 py-1 text-sm bg-muted rounded border border-border pointer-events-none z-10" id="search-kbd">
                  ⌘K
                </kbd>
              </div>
            </div>

            <!-- Install Button - Desktop -->
            <div class="hidden md:block">
              <a href="https://github.com/elide-dev/elide" class="inline-flex items-center px-5 py-2.5 text-white font-medium rounded-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]" style="background: linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(219, 39, 119) 100%);">
                <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Install Elide
              </a>
            </div>

            <!-- Mobile menu button -->
            <button class="md:hidden p-2" id="mobile-menu-btn">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Row - Navigation (Aligned with Logo) -->
      <div class="hidden md:block">
        <div class="w-full px-8 lg:px-10 xl:px-14">
          <div class="flex justify-between items-center">
            <!-- Left Navigation - Aligned with Logo above -->
            <div class="flex items-center gap-3 lg:gap-5 xl:gap-7">
              ${leftNavHTML}
            </div>

            <!-- Right Secondary Links -->
            <div class="flex items-center gap-3 lg:gap-5 xl:gap-7">
              <a href="/docs/releases.html" class="flex items-center gap-2.5 px-4 lg:px-5 py-4 text-base font-medium transition-all duration-200 relative ${releasesActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <span>Releases</span>
                ${releasesActive ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>' : ''}
              </a>
              <a href="/blog" class="flex items-center gap-2.5 px-4 lg:px-5 py-4 text-base font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <span>Blog</span>
              </a>
              <a href="/examples" class="flex items-center gap-2.5 px-4 lg:px-5 py-4 text-base font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
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
  // Helper to check if slug exists anywhere in the tree
  const containsSlug = (item, targetSlug) => {
    if (item.slug === targetSlug) return true
    if (item.children && item.children.length > 0) {
      return item.children.some(child => containsSlug(child, targetSlug))
    }
    return false
  }
  
  // Find which navbar section this slug belongs to
  let currentNavSection = null
  for (const nav of navbarSections) {
    for (const section of nav.sections) {
      if (section.items.some(item => containsSlug(item, currentSlug))) {
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
    <aside class="fixed top-36 left-0 z-40 h-[calc(100vh-9rem)] w-[416px] border-r border-border bg-card/30 backdrop-blur-md hidden lg:block">
      <div class="flex flex-col h-full">
        <nav class="flex-1 space-y-8 overflow-y-auto p-8">
  `
  
  // Icon mapping for section headers
  const sectionIcons = {
    'Getting Started': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
    'Documentation': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
    'Community': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    'Fundamentals': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>',
    'Advanced': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
    'Overview': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>',
    'Supported Languages': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>',
    'Additional Languages': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>',
    'Core Topics': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
    'Version History': '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
  }
  
  // Only show sections from the current navbar section
  const totalSections = currentNavSection.sections.length
  currentNavSection.sections.forEach((section, sectionIndex) => {
    const isLastSection = sectionIndex === totalSections - 1
    const sectionIcon = sectionIcons[section.title] || '<svg class="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>'
    
    sidebarHTML += `
          <div class="relative">
            <h3 class="mb-5 text-base font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              ${sectionIcon}
              ${section.title}
            </h3>
            <ul class="space-y-2">
    `
    
    // Helper function to check if any child is active
    const hasActiveChild = (item) => {
      if (item.slug === currentSlug) return true
      if (item.children && item.children.length > 0) {
        return item.children.some(child => hasActiveChild(child))
      }
      return false
    }
    
    // Render items with nested children
    for (const item of section.items) {
      const isActive = item.slug === currentSlug
      const hasChildren = item.children && item.children.length > 0
      const isExpanded = hasActiveChild(item)
      const activeClass = isActive ? 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''
      const activeBg = isActive ? 'background: rgba(168, 85, 247, 0.15);' : ''
      
      sidebarHTML += `
              <li class="sidebar-item-wrapper">
                <div class="flex items-center justify-between">
                  <a 
                    href="/docs/${item.slug}.html" 
                    class="flex-1 block px-5 py-3 rounded-md text-lg text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200 ${activeClass}"
                    style="${activeBg}"
                  >
                    ${item.title}
                  </a>
      `
      
      if (hasChildren) {
        sidebarHTML += `
                  <button 
                    class="sidebar-toggle px-3 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    data-target="${item.slug}-children"
                    aria-label="Toggle ${item.title} submenu"
                  >
                    <svg class="h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-90' : ''}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
        `
      }
      
      sidebarHTML += `
                </div>
      `
      
      // Render nested children
      if (hasChildren) {
        sidebarHTML += `
                <ul id="${item.slug}-children" class="ml-4 mt-1 space-y-1 p-2 rounded-lg bg-muted/30 ${isExpanded ? '' : 'hidden'}">
        `
        
        for (const child of item.children) {
          const childIsActive = child.slug === currentSlug
          const childHasChildren = child.children && child.children.length > 0
          const childIsExpanded = hasActiveChild(child)
          const childActiveClass = childIsActive ? 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''
          const childActiveBg = childIsActive ? 'background: rgba(168, 85, 247, 0.15);' : ''
          
          sidebarHTML += `
                  <li class="sidebar-item-wrapper">
                    <div class="flex items-center justify-between">
                      <a 
                        href="/docs/${child.slug}.html" 
                        class="flex-1 block px-4 py-2 rounded-md text-base text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200 ${childActiveClass}"
                        style="${childActiveBg}"
                      >
                        ${child.title}
                      </a>
          `
          
          if (childHasChildren) {
            sidebarHTML += `
                      <button 
                        class="sidebar-toggle px-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
                        data-target="${child.slug}-children"
                        aria-label="Toggle ${child.title} submenu"
                      >
                        <svg class="h-4 w-4 transform transition-transform ${childIsExpanded ? 'rotate-90' : ''}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
            `
          }
          
          sidebarHTML += `
                    </div>
          `
          
          // Render nested children (level 3)
          if (childHasChildren) {
            sidebarHTML += `
                    <ul id="${child.slug}-children" class="ml-4 mt-1 space-y-1 p-2 rounded-lg bg-muted/40 ${childIsExpanded ? '' : 'hidden'}">
            `
            
            for (const grandchild of child.children) {
              const grandchildIsActive = grandchild.slug === currentSlug
              const grandchildActiveClass = grandchildIsActive ? 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' : ''
              const grandchildActiveBg = grandchildIsActive ? 'background: rgba(168, 85, 247, 0.15);' : ''
              const comingSoonIcon = grandchild.comingSoon ? `
                <span class="coming-soon-icon ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground text-xs" title="Available soon">
                  <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              ` : ''
              
              if (grandchild.comingSoon) {
                // Render as non-clickable span for coming soon items
                sidebarHTML += `
                      <li>
                        <span class="flex items-center px-3 py-2 rounded-md text-sm text-muted-foreground cursor-not-allowed opacity-60">
                          <span>${grandchild.title}</span>${comingSoonIcon}
                        </span>
                      </li>
                `
              } else {
                // Render as clickable link for available items
                sidebarHTML += `
                      <li>
                        <a 
                          href="/docs/${grandchild.slug}.html" 
                          class="flex items-center px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200 ${grandchildActiveClass}"
                          style="${grandchildActiveBg}"
                        >
                          <span>${grandchild.title}</span>
                        </a>
                      </li>
                `
              }
            }
            
            sidebarHTML += `
                    </ul>
            `
          }
          
          sidebarHTML += `
                  </li>
          `
        }
        
        sidebarHTML += `
                </ul>
        `
      }
      
      sidebarHTML += `
              </li>
      `
    }
    
    sidebarHTML += `
            </ul>
    `
    
    // Add separator line after each section except the last
    if (!isLastSection) {
      sidebarHTML += `
            <div class="mt-6 pt-6 border-t border-border/40 ml-3 mr-0"></div>
    `
  }
    
    sidebarHTML += `
          </div>
    `
  })
  
  sidebarHTML += `
        </nav>
        
        <!-- Bottom Links -->
        <div class="p-8 pt-6 border-t border-border/50">
          <div class="space-y-2">
            <a href="https://github.com/elide-dev/elide" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-5 py-3 text-lg text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            
            <a href="https://discord.gg/elide" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-5 py-3 text-lg text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Discord</span>
            </a>
            
            <a href="/docs/connect-ide.html" class="flex items-center gap-3 px-5 py-3 text-lg text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              <span>Connect to IDE</span>
            </a>
          </div>
        </div>
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
      <aside class="hidden lg:block fixed top-36 right-0 w-[374px] h-[calc(100vh-9rem)] overflow-y-auto">
        <div class="p-8">
          <div class="text-base font-semibold text-foreground mb-5">
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
        class="toc-link block py-2.5 ${indent} text-base ${activeClass} hover:border-l-[3px] border-l-2 -ml-[2px] transition-all duration-200"
        style="border-left-color: ${isFirstItem ? 'rgb(168, 85, 247)' : 'transparent'};"
      >
        ${heading.text}
      </a>
    `
  }).join('')
  
  return `
    <aside id="toc-sidebar" class="hidden lg:block fixed top-36 right-0 w-[374px] h-[calc(100vh-9rem)] overflow-y-auto scroll-smooth">
      <div class="p-8">
        <div class="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
          <svg class="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          On this page
        </div>
        <nav id="toc-nav" class="space-y-1.5 border-l-2 border-border">
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
  <style>
    /* Disable overscroll bounce/rubber band effect */
    html, body {
      overscroll-behavior: none;
      overscroll-behavior-y: none;
    }
    
    /* Coming soon tooltip */
    .coming-soon-icon {
      position: relative;
      cursor: help;
    }
    
    .coming-soon-icon::after {
      content: attr(title);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 100;
    }
    
    .coming-soon-icon:hover::after {
      opacity: 1;
      transition-delay: 1s;
    }
  </style>
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
        <main class="flex-1 lg:ml-[416px] lg:mr-[374px] min-w-0">
          <div class="container mx-auto px-8 py-20 max-w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
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

    // Sidebar dropdown toggle
    (function() {
      const toggleButtons = document.querySelectorAll('.sidebar-toggle');
      
      toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const targetId = button.getAttribute('data-target');
          const targetElement = document.getElementById(targetId);
          const icon = button.querySelector('svg');
          
          if (targetElement) {
            const isHidden = targetElement.classList.contains('hidden');
            
            if (isHidden) {
              targetElement.classList.remove('hidden');
              if (icon) icon.classList.add('rotate-90');
            } else {
              targetElement.classList.add('hidden');
              if (icon) icon.classList.remove('rotate-90');
            }
          }
        });
      });
    })();

    // Search bar pop-out effect with background blur
    (function() {
      const searchInput = document.getElementById('search-input');
      const searchContainer = document.getElementById('search-container');
      const searchBackdrop = document.getElementById('search-backdrop');
      const searchKbd = document.getElementById('search-kbd');
      const sidebar = document.querySelector('aside');
      const tocSidebar = document.getElementById('toc-sidebar');
      const mainContent = document.querySelector('main');
      
      if (!searchInput || !searchContainer || !searchBackdrop) return;
      
      function activateSearch() {
        // Show backdrop with blur
        searchBackdrop.style.opacity = '1';
        searchBackdrop.style.pointerEvents = 'auto';
        
        // Pop out search bar
        searchContainer.style.transform = 'scale(1.05) translateY(-2px)';
        searchContainer.style.zIndex = '60';
        searchInput.style.borderColor = 'rgb(168, 85, 247)';
        searchInput.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1), 0 20px 40px rgba(0, 0, 0, 0.3)';
        searchInput.style.backgroundColor = 'rgb(var(--background))';
        
        // Blur sidebars and main content
        if (sidebar) {
          sidebar.style.filter = 'blur(4px)';
          sidebar.style.opacity = '0.5';
          sidebar.style.transition = 'filter 0.3s, opacity 0.3s';
        }
        if (tocSidebar) {
          tocSidebar.style.filter = 'blur(4px)';
          tocSidebar.style.opacity = '0.5';
          tocSidebar.style.transition = 'filter 0.3s, opacity 0.3s';
        }
        if (mainContent) {
          mainContent.style.filter = 'blur(4px)';
          mainContent.style.opacity = '0.5';
          mainContent.style.transition = 'filter 0.3s, opacity 0.3s';
        }
        
        // Hide kbd hint
        if (searchKbd) searchKbd.style.opacity = '0';
      }
      
      function deactivateSearch() {
        // Hide backdrop
        searchBackdrop.style.opacity = '0';
        searchBackdrop.style.pointerEvents = 'none';
        
        // Reset search bar
        searchContainer.style.transform = 'scale(1) translateY(0)';
        searchContainer.style.zIndex = '';
        searchInput.style.borderColor = '';
        searchInput.style.boxShadow = '';
        searchInput.style.backgroundColor = '';
        
        // Remove blur from sidebars and main content
        if (sidebar) {
          sidebar.style.filter = '';
          sidebar.style.opacity = '';
        }
        if (tocSidebar) {
          tocSidebar.style.filter = '';
          tocSidebar.style.opacity = '';
        }
        if (mainContent) {
          mainContent.style.filter = '';
          mainContent.style.opacity = '';
        }
        
        // Show kbd hint if input is empty
        if (searchKbd && !searchInput.value) searchKbd.style.opacity = '1';
      }
      
      // Focus event
      searchInput.addEventListener('focus', activateSearch);
      
      // Blur event
      searchInput.addEventListener('blur', () => {
        // Small delay to allow clicking on search results if implemented
        setTimeout(deactivateSearch, 150);
      });
      
      // Escape key to close
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.blur();
        }
      });
      
      // Click backdrop to close
      searchBackdrop.addEventListener('click', () => {
        searchInput.blur();
      });
      
      // Cmd/Ctrl + K to focus search
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          searchInput.focus();
        }
      });
    })();

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
      const tocSidebar = document.getElementById('toc-sidebar');
      
      // Function to scroll TOC to show active item
      function scrollTocToActiveItem(activeLink) {
        if (!tocSidebar || !activeLink) return;
        
        const sidebarRect = tocSidebar.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        // Check if link is outside visible area
        const isAboveView = linkRect.top < sidebarRect.top;
        const isBelowView = linkRect.bottom > sidebarRect.bottom;
        
        if (isAboveView || isBelowView) {
          // Calculate position to center the active item in the sidebar
          const linkOffsetInSidebar = activeLink.offsetTop;
          const sidebarHeight = tocSidebar.clientHeight;
          const linkHeight = activeLink.offsetHeight;
          
          // Scroll to center the active item (with some padding)
          const scrollTo = linkOffsetInSidebar - (sidebarHeight / 2) + (linkHeight / 2);
          
          tocSidebar.scrollTo({
            top: Math.max(0, scrollTo),
            behavior: 'smooth'
          });
        }
      }
      
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
        
        let activeLinkElement = null;
        
        // Update TOC links - ensure there's always an active one
        tocLinks.forEach(link => {
          const tocId = link.getAttribute('data-toc-id');
          const isActive = currentHeading && currentHeading.id === tocId;
          
          if (isActive) {
            activeLinkElement = link;
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
        
        // Auto-scroll TOC to show active item
        if (activeLinkElement) {
          scrollTocToActiveItem(activeLinkElement);
        }
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
            
            // Scroll TOC to show clicked item
            scrollTocToActiveItem(link);
            
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
      
      // Scroll to show first active item on load
      setTimeout(() => {
        const firstActiveLink = document.querySelector('.toc-link.text-primary');
        if (firstActiveLink) {
          scrollTocToActiveItem(firstActiveLink);
        }
      }, 100);
    })();
  </script>
</body>
</html>`
}

// MDX to HTML converter
async function processMDXFile(slug) {
  console.log(`  [BUILD] Processing ${slug}...`)
  
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const source = await fs.readFile(filePath, 'utf8')
  
  // Parse frontmatter
  const { content: mdxContent, data: frontmatter } = matter(source)
  
  // Step 1: Extract and preserve code blocks FIRST (before removing imports)
  let html = mdxContent
  const codeBlocks = []
  html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, language, code) => {
    const trimmedCode = code.trim()
    const highlighted = highlightCode(trimmedCode, language || '')
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`
    codeBlocks.push(`<pre><code class="language-${language || 'text'}">${highlighted}</code></pre>`)
    return placeholder
  })
  
  // Step 2: Pre-process JSX - convert to HTML (now that code blocks are safe)
  html = html
    // Remove imports (only from non-code content now)
    .replace(/^import\s+.+$/gm, '')
    // Convert className to class
    .replace(/className=/g, 'class=')
    // Convert JSX components to HTML
    .replace(/<Card>/g, '<div class="border border-border rounded-lg p-6 mb-4">')
    .replace(/<\/Card>/g, '</div>')
    .replace(/<CardHeader>/g, '<div class="mb-4">')
    .replace(/<\/CardHeader>/g, '</div>')
    .replace(/<CardTitle>/g, '<h3 class="text-xl font-bold mb-2">')
    .replace(/<\/CardTitle>/g, '</h3>')
    .replace(/<CardDescription>/g, '<p class="text-muted-foreground">')
    .replace(/<\/CardDescription>/g, '</p>')
  
  // Step 3: Extract and preserve tables (with placeholders)
  const tables = []
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
        const isFirstCol = cellIdx === 0
        const isElideCol = cellIdx === 1
        const cellClass = isFirstCol ? 'py-4 px-6 font-semibold' : 
                         isElideCol ? 'py-4 px-6 text-green-400 font-mono' : 
                         'py-4 px-6 text-muted-foreground font-mono'
        tableHTML += `<td class="${cellClass}">${cell}</td>`
      })
      tableHTML += '</tr>'
    })
    
    tableHTML += '</tbody></table></div>'
    const placeholder = `__TABLE_${tables.length}__`
    tables.push(tableHTML)
    return placeholder
  })
  
  // Step 4: Extract and preserve HTML blocks (multi-line aware)
  const htmlBlocks = []
  
  // Function to extract HTML blocks with proper nesting support
  const extractHTMLBlocks = (text) => {
    const blockTags = ['div', 'iframe', 'section', 'article', 'aside', 'nav', 'blockquote']
    let result = text
    
    // Process each tag type
    blockTags.forEach(tag => {
      const openTagRegex = new RegExp(`<${tag}(\\s[^>]*)?>`, 'gi')
      let match
      let lastIndex = 0
      let processed = ''
      
      while ((match = openTagRegex.exec(result)) !== null) {
        // Add text before this tag
        processed += result.slice(lastIndex, match.index)
        
        // Find the matching closing tag by counting nesting levels
        let depth = 1
        let searchPos = match.index + match[0].length
        let closingTagPos = -1
        
        const searchText = result.slice(searchPos)
        const tagRegex = new RegExp(`<(/?)${tag}(?:\\s[^>]*)?>`, 'gi')
        let tagMatch
        
        while ((tagMatch = tagRegex.exec(searchText)) !== null && depth > 0) {
          if (tagMatch[1] === '/') {
            depth--
            if (depth === 0) {
              closingTagPos = searchPos + tagMatch.index + tagMatch[0].length
              break
            }
          } else {
            depth++
          }
        }
        
        if (closingTagPos > 0) {
          // Extract the complete block including nested tags
          const block = result.slice(match.index, closingTagPos)
          const placeholder = `__HTML_BLOCK_${htmlBlocks.length}__`
          htmlBlocks.push(block)
          processed += placeholder
          lastIndex = closingTagPos
          openTagRegex.lastIndex = closingTagPos
        } else {
          // No closing tag found, keep the opening tag as is
          processed += match[0]
          lastIndex = match.index + match[0].length
        }
      }
      
      // Add remaining text
      processed += result.slice(lastIndex)
      result = processed
    })
    
    return result
  }
  
  html = extractHTMLBlocks(html)
  
  // Step 5: Process markdown syntax
  html = html
    // Headers (before inline formatting to avoid conflicts)
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Links (before other inline to preserve them)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // Step 6: Process lists properly - group consecutive list items
  const lines = html.split('\n')
  const processedLines = []
  let inList = false
  let listItems = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const listMatch = line.match(/^- (.+)$/)
    
    if (listMatch) {
      // This is a list item
      listItems.push(`<li>${listMatch[1]}</li>`)
      inList = true
    } else {
      // Not a list item
      if (inList && listItems.length > 0) {
        // Close the previous list
        processedLines.push('<ul>')
        processedLines.push(...listItems)
        processedLines.push('</ul>')
        listItems = []
        inList = false
      }
      processedLines.push(line)
    }
  }
  
  // Handle any remaining list items
  if (inList && listItems.length > 0) {
    processedLines.push('<ul>')
    processedLines.push(...listItems)
    processedLines.push('</ul>')
  }
  
  html = processedLines.join('\n')
  
  // Step 7: Process paragraphs (split on double newlines, but preserve HTML)
  const paragraphs = html.split('\n\n')
  const processedParagraphs = paragraphs.map(para => {
    para = para.trim()
    if (!para) return ''
    
    // Skip if it's HTML (starts with < or contains a placeholder)
    if (para.startsWith('<') || para.match(/__[A-Z_]+_\d+__/)) {
      return para
    }
    
    // Skip if it contains only HTML tags
    if (para.match(/^<[^>]+>.*<\/[^>]+>$/s)) {
      return para
    }
    
    // Wrap in paragraph tags
    return `<p>${para}</p>`
  })
  
  html = processedParagraphs.join('\n\n')
  
  // Step 8: Restore all preserved content
  // Restore HTML blocks
  htmlBlocks.forEach((block, index) => {
    html = html.replace(`__HTML_BLOCK_${index}__`, block)
  })
  
  // Restore tables
  tables.forEach((table, index) => {
    html = html.replace(`__TABLE_${index}__`, table)
  })
  
  // Restore code blocks
  codeBlocks.forEach((block, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, block)
  })
  
  const title = frontmatter.title || slug
  const pageHTML = generateHTMLPage(title, html, slug)
  
  // Write the HTML file
  const outputPath = path.join(DIST_DIR, 'docs', `${slug}.html`)
  await fs.writeFile(outputPath, pageHTML, 'utf8')
  
  console.log(`  [OK] Generated ${slug}.html`)
  
  return { slug, title, frontmatter }
}

// Generate redirect page for introduction -> readme
async function generateIntroductionRedirect() {
  console.log('[REDIRECT] Creating introduction.html redirect...')
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/docs/readme.html">
  <link rel="canonical" href="/docs/readme.html">
  <title>Redirecting...</title>
  <script>window.location.href = "/docs/readme.html";</script>
</head>
<body>
  <p>Redirecting to <a href="/docs/readme.html">README</a>...</p>
</body>
</html>`
  
  await fs.writeFile(path.join(DIST_DIR, 'docs', 'introduction.html'), html, 'utf8')
  console.log('  [OK] Generated introduction.html (redirects to readme.html)')
}

// Generate index/home page
async function generateIndex() {
  console.log('[INDEX] Generating index page...')
  
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
  <style>
    /* Disable overscroll bounce/rubber band effect */
    html, body {
      overscroll-behavior: none;
      overscroll-behavior-y: none;
    }
  </style>
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
        href="/docs/readme.html" 
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
  
  console.log('  [OK] Generated index.html (landing page)')
}

// Get all doc slugs from config
function getAllDocSlugs() {
  const collectSlugs = (item) => {
    const slugs = [item.slug]
    if (item.children && item.children.length > 0) {
      item.children.forEach(child => {
        slugs.push(...collectSlugs(child))
      })
    }
    return slugs
  }
  
  return navbarSections.flatMap(nav =>
    nav.sections.flatMap(section =>
      section.items.flatMap(item => collectSlugs(item))
    )
  )
}

// Main build function
async function build() {
  console.log('[BUILD] Building Elide Documentation (Static)...\n')
  
  try {
    // Setup
    await setup()
    
    // Copy assets
    await copyAssets()
    
    // Get all docs from config
    console.log('\n[DOCS] Processing documentation files...')
    const slugs = getAllDocSlugs()
    console.log(`  Found ${slugs.length} documents\n`)
    
    // Process each doc
    const docs = []
    for (const slug of slugs) {
      try {
        const doc = await processMDXFile(slug)
        docs.push(doc)
      } catch (err) {
        console.error(`  [ERROR] Error processing ${slug}:`, err.message)
      }
    }
    
    // Generate index page
    await generateIndex()
    
    // Generate introduction redirect
    await generateIntroductionRedirect()
    
    console.log('\n[SUCCESS] Build complete! Files in dist/')
    console.log('\n[INFO] To view the docs, run:')
    console.log('   elide serve dist --port 3000')
    console.log('   or')
    console.log('   bun run serve')
    
  } catch (error) {
    console.error('[FAIL] Build failed:', error)
    process.exit(1)
  }
}

// Run the build
build()

