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

// Docs configuration
const docsConfig = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction', slug: 'introduction' },
      { title: 'Quick Start', href: '/docs/quick-start', slug: 'quick-start' },
      { title: 'Installation', href: '/docs/installation', slug: 'installation' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Architecture', href: '/docs/architecture', slug: 'architecture' },
      { title: 'Runtime', href: '/docs/runtime', slug: 'runtime' },
      { title: 'Components', href: '/docs/components', slug: 'components' },
    ],
  },
  {
    title: 'Language Support',
    items: [
      { title: 'JavaScript', href: '/docs/javascript', slug: 'javascript' },
      { title: 'TypeScript', href: '/docs/typescript', slug: 'typescript' },
      { title: 'Python', href: '/docs/python', slug: 'python' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Core API', href: '/docs/api-core', slug: 'api-core' },
      { title: 'Server API', href: '/docs/api-server', slug: 'api-server' },
      { title: 'Database', href: '/docs/api-database', slug: 'api-database' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { title: 'Security', href: '/docs/security', slug: 'security' },
      { title: 'Configuration', href: '/docs/configuration', slug: 'configuration' },
      { title: 'Deployment', href: '/docs/deployment', slug: 'deployment' },
    ],
  },
]

const CONTENT_DIR = path.join(__dirname, 'content/docs')
const DIST_DIR = path.join(__dirname, 'dist')
const PUBLIC_DIR = path.join(__dirname, 'public')

// Simple syntax highlighter for code blocks
function highlightCode(code, language) {
  if (!language || language === 'text' || language === 'plain') {
    return code
  }
  
  let highlighted = code
  
  // JavaScript/TypeScript
  if (language === 'javascript' || language === 'js' || language === 'typescript' || language === 'ts') {
    // Keywords
    highlighted = highlighted.replace(/\b(const|let|var|function|async|await|return|if|else|for|while|class|extends|import|export|from|default|new|try|catch|throw|typeof|instanceof)\b/g, '<span class="keyword">$1</span>')
    // Strings
    highlighted = highlighted.replace(/(['"`])(.*?)\1/g, '<span class="string">$1$2$1</span>')
    // Comments
    highlighted = highlighted.replace(/\/\/(.*?)$/gm, '<span class="comment">//$1</span>')
    highlighted = highlighted.replace(/\/\*(.*?)\*\//gs, '<span class="comment">/*$1*/</span>')
    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
  }
  
  // Bash/Shell
  if (language === 'bash' || language === 'sh' || language === 'shell') {
    // Comments
    highlighted = highlighted.replace(/#(.*?)$/gm, '<span class="comment">#$1</span>')
    // Strings
    highlighted = highlighted.replace(/(['"`])(.*?)\1/g, '<span class="string">$1$2$1</span>')
    // Commands
    highlighted = highlighted.replace(/^([a-z\-]+)/gm, '<span class="function">$1</span>')
  }
  
  // Python
  if (language === 'python' || language === 'py') {
    // Keywords
    highlighted = highlighted.replace(/\b(def|class|import|from|return|if|elif|else|for|while|try|except|with|as|async|await)\b/g, '<span class="keyword">$1</span>')
    // Strings
    highlighted = highlighted.replace(/(['"`])(.*?)\1/g, '<span class="string">$1$2$1</span>')
    // Comments
    highlighted = highlighted.replace(/#(.*?)$/gm, '<span class="comment">#$1</span>')
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

// Generate static navbar HTML
function generateNavBarHTML() {
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card/80 backdrop-blur-md border-b border-border shadow-lg">
      <!-- Top Row -->
      <div class="border-b border-border/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/assets/light.svg" alt="Elide" class="h-8 w-auto" />
            </a>

            <!-- Search Bar - Desktop -->
            <div class="hidden md:flex flex-1 max-w-md mx-8">
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

      <!-- Bottom Row - Desktop Navigation -->
      <div class="hidden md:block">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <!-- Left Navigation -->
            <div class="flex items-center gap-1">
              <a href="/docs/introduction.html" class="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Runtime</span>
              </a>
              <a href="/docs/javascript.html" class="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>Language Guides</span>
              </a>
              <a href="/docs/architecture.html" class="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Architecture</span>
              </a>
            </div>

            <!-- Right Secondary Links -->
            <div class="flex items-center gap-1">
              <a href="/blog" class="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Blog</span>
              </a>
              <a href="https://github.com/elide-dev/elide" class="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
                <span>Examples</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
}

// Generate static sidebar HTML from docs-config
function generateSidebarHTML(currentSlug) {
  let sidebarHTML = `
    <aside class="fixed top-28 left-0 z-40 h-[calc(100vh-7rem)] w-64 border-r border-border bg-card/30 backdrop-blur-md hidden lg:block">
      <div class="flex flex-col h-full p-6 overflow-y-auto">
        <nav class="space-y-8 flex-1">
  `
  
  for (const section of docsConfig) {
    sidebarHTML += `
          <div>
            <h3 class="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ${section.title}
            </h3>
            <ul class="space-y-1">
    `
    
    for (const item of section.items) {
      const isActive = item.slug === currentSlug
      const activeClass = isActive ? 'bg-accent text-accent-foreground' : ''
      sidebarHTML += `
              <li>
                <a 
                  href="/docs/${item.slug}.html" 
                  class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-200 group ${activeClass}"
                >
                  <span class="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors">•</span>
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

// Generate static table of contents
function generateTocHTML() {
  return `
    <aside class="hidden lg:block fixed top-28 right-0 w-64 h-[calc(100vh-7rem)] overflow-y-auto">
      <div class="p-6">
        <div class="text-sm font-semibold text-foreground mb-4">
          On this page
        </div>
        <nav class="space-y-1 border-l-2 border-border">
          <a href="#overview" class="block py-2 px-4 text-sm text-primary border-l-2 border-primary -ml-[2px] transition-colors duration-200">
            Overview
          </a>
          <a href="#getting-started" class="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground border-l-2 border-transparent -ml-[2px] transition-colors duration-200">
            Getting Started
          </a>
          <a href="#api-reference" class="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground border-l-2 border-transparent -ml-[2px] transition-colors duration-200">
            API Reference
          </a>
        </nav>
      </div>
    </aside>
  `
}

// Generate complete HTML page using components
function generateHTMLPage(title, content, slug) {
  const navbar = generateNavBarHTML()
  const sidebar = generateSidebarHTML(slug)
  const toc = generateTocHTML()
  
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
                ${content}
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
    // Headers
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code class="language-$1">$2</code></pre>')
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
  return docsConfig.flatMap(section => 
    section.items.map(item => item.slug)
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

