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
import { docsConfig } from './lib/docs-config.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONTENT_DIR = path.join(__dirname, 'content/docs')
const DIST_DIR = path.join(__dirname, 'dist')
const PUBLIC_DIR = path.join(__dirname, 'public')

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
              <a href="https://github.com/elide-dev/elide" class="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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
        <div class="mb-8">
          <h2 class="text-xl font-bold text-foreground mb-1">Documentation</h2>
          <p class="text-sm text-muted-foreground">Technical reference & guides</p>
        </div>
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
    <aside class="hidden lg:block fixed top-28 right-0 w-64 h-[calc(100vh-7rem)] border-l border-border bg-card/30 backdrop-blur-md overflow-y-auto">
      <div class="p-6">
        <div class="border-none">
          <div class="text-sm font-semibold text-foreground py-2">
            On this page
          </div>
          <nav class="space-y-1 mt-2">
            <a href="#overview" class="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-[0_0_12px_rgba(236,72,153,0.3)] rounded-md transition-all duration-200">
              Overview
            </a>
            <a href="#getting-started" class="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-[0_0_12px_rgba(236,72,153,0.3)] rounded-md transition-all duration-200">
              Getting Started
            </a>
            <a href="#api-reference" class="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-[0_0_12px_rgba(236,72,153,0.3)] rounded-md transition-all duration-200">
              API Reference
            </a>
          </nav>
        </div>
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
        <main class="flex-1 lg:ml-64 lg:mr-64">
          <div class="container max-w-4xl mx-auto px-6 py-16">
            <article class="prose prose-invert max-w-none">
              ${content}
            </article>
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
  
  // Create a function from the compiled code
  const { default: MDXContent } = await evaluateSync(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
    useMDXComponents: () => ({
      // Add any custom MDX components here
    })
  })
  
  // Render to HTML string
  const contentHTML = renderToStaticMarkup(React.createElement(MDXContent))
  
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
  console.log('🏠 Generating index redirect...')
  
  // Simple redirect to introduction page
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/docs/introduction.html">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elide Docs - Redirecting...</title>
  <link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
  <script>
    window.location.href = '/docs/introduction.html';
  </script>
</head>
<body>
  <p>Redirecting to <a href="/docs/introduction.html">documentation</a>...</p>
</body>
</html>`
  
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), html, 'utf8')
  
  console.log('  ✓ Generated index.html (redirect to introduction)')
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

