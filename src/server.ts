/**
 * Elide HTTP Server for Documentation Site
 * 
 * This server handles:
 * - Static file serving
 * - MDX compilation and rendering
 * - React SSR
 * - API routes for documentation
 */

import { serve } from '@elide/server'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './app'
import { getDocBySlug, getAllDocSlugs } from '../lib/mdx'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const PORT = process.env.PORT || 3000

// Serve static assets
function serveStatic(path: string): Response | null {
  const publicPath = join(process.cwd(), 'public', path)
  
  if (existsSync(publicPath)) {
    const content = readFileSync(publicPath)
    const ext = path.split('.').pop()
    const contentType = getContentType(ext || '')
    
    return new Response(content, {
      headers: { 'Content-Type': contentType }
    })
  }
  
  return null
}

function getContentType(ext: string): string {
  const types: Record<string, string> = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
  }
  return types[ext] || 'text/plain'
}

// Main request handler
serve({
  port: PORT,
  handler: async (req) => {
    const url = new URL(req.url)
    const path = url.pathname
    
    console.log(`${req.method} ${path}`)
    
    // Serve static files
    if (path.startsWith('/public/') || path.match(/\.(css|js|png|jpg|svg|ico)$/)) {
      const staticResponse = serveStatic(path.replace('/public/', ''))
      if (staticResponse) return staticResponse
    }
    
    // API endpoint for getting all docs
    if (path === '/api/docs') {
      const slugs = getAllDocSlugs()
      return Response.json(slugs)
    }
    
    // API endpoint for individual doc
    if (path.startsWith('/api/docs/')) {
      const slug = path.replace('/api/docs/', '')
      try {
        const doc = await getDocBySlug(slug)
        return Response.json(doc)
      } catch (error) {
        return Response.json({ error: 'Document not found' }, { status: 404 })
      }
    }
    
    // Render React app for all other routes
    try {
      const html = renderToString(
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      )
      
      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Documentation</title>
            <link rel="stylesheet" href="/public/styles.css">
          </head>
          <body>
            <div id="root">${html}</div>
            <script type="module" src="/public/client.js"></script>
          </body>
        </html>
      `
      
      return new Response(fullHtml, {
        headers: { 'Content-Type': 'text/html' }
      })
    } catch (error) {
      console.error('Render error:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  }
})

console.log(`🚀 Elide docs server running at http://localhost:${PORT}`)

