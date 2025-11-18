# Static Build Migration - elide-mdx to elide-docs

## Summary

Successfully migrated the React component-based layout architecture from `elide-mdx` (Next.js) to `elide-docs` (static site) while maintaining the same visual structure and hierarchy.

## What Changed

### 1. New Build Script: `build-static.mjs`

Created a new static site generator that:
- Uses the existing React component structure as a blueprint
- Generates static HTML from MDX content
- Uses `docs-config.ts` to drive the sidebar navigation (no more hardcoded HTML)
- Maintains the same visual layout as elide-mdx:
  - Top navigation bar with logo, search, and install button
  - Left sidebar with hierarchical docs navigation (auto-generated from config)
  - Main content area with prose styling
  - Right sidebar for table of contents
  - Mobile-responsive design with menu toggle

### 2. Configuration-Driven Sidebar

The sidebar is now automatically generated from `lib/docs-config.ts`:
- Getting Started (Introduction, Quick Start, Installation)
- Core Concepts (Architecture, Runtime, Components)
- Language Support (JavaScript, TypeScript, Python)
- API Reference (Core API, Server API, Database)
- Advanced (Security, Configuration, Deployment)

Each page's sidebar highlights the active document with proper styling.

### 3. Layout Structure

The generated HTML now follows the same structure as elide-mdx:

```html
<div class="glow-bg min-h-screen bg-background text-foreground">
  <!-- Navigation Bar (fixed top) -->
  <nav>...</nav>
  
  <!-- Mobile menu button -->
  <button>...</button>
  
  <div class="flex pt-28">
    <!-- Left Sidebar (fixed, w-64) -->
    <aside class="fixed top-28 left-0 w-64">...</aside>
    
    <!-- Main Content (centered, max-w-4xl) -->
    <main class="flex-1 lg:ml-64 lg:mr-64">...</main>
    
    <!-- Right Sidebar (fixed, w-64) -->
    <aside class="fixed top-28 right-0 w-64">...</aside>
  </div>
</div>
```

### 4. Updated Build Commands

Modified `package.json` scripts:
- `build`: Now runs `build-static.mjs` with bun
- `build:old`: Preserved the old build script for reference
- All scripts use `bun` instead of `node` for TypeScript support

## Technical Details

### Why Bun Instead of Node?

Node.js doesn't natively support TypeScript imports. Since `lib/docs-config.ts` is TypeScript, we use bun which has native TypeScript support without requiring a separate transpilation step.

### MDX Compilation

The current implementation uses a simplified markdown-to-HTML converter that:
- Handles basic markdown (headers, lists, links, code blocks)
- Strips out React component imports
- Converts markdown syntax to HTML tags

For more advanced MDX features (React components in content), you would need to:
1. Properly compile MDX with `@mdx-js/mdx`
2. Render React components server-side
3. Include any necessary client-side JavaScript for interactivity

### Static vs Dynamic

**Key Differences:**
- **elide-mdx**: Next.js app with server-side rendering and client-side interactivity
- **elide-docs**: Fully static HTML files served with any HTTP server (no JS runtime needed)

**Trade-offs:**
- Static is faster to serve and deploy (no Node.js required)
- Static can't have interactive components without additional JavaScript
- Static is perfect for documentation that doesn't need dynamic features

## Files Modified

1. `/build-static.mjs` - New static site generator
2. `/package.json` - Updated build scripts
3. (Existing components unchanged - they serve as templates for the static generator)

## How to Build

```bash
# Build CSS and generate static site
bun run build

# Or run steps individually
bun run build:css
bun build-static.mjs

# Serve the static site
elide serve dist --port 3000
# or
bun run serve
```

## Results

- All 15 documentation pages generated successfully
- Sidebar automatically reflects docs-config.ts structure
- Layout matches elide-mdx visual design
- Navigation works with standard HTML links
- Fully static - no JavaScript runtime required
- Can be served with any static HTTP server

## Next Steps (Optional)

If you want to enhance the static build:

1. **Add Full MDX Support**: Implement proper MDX compilation with React component rendering
2. **Enhanced TOC**: Auto-generate table of contents from heading tags in each page
3. **Search Functionality**: Add client-side search with a library like Fuse.js
4. **Syntax Highlighting**: Add Prism.js or Shiki for code block highlighting
5. **Dark Mode Toggle**: Add client-side theme switching
6. **Active Page Highlighting**: Enhance sidebar to show current section

## Comparison

| Feature | elide-mdx (Next.js) | elide-docs (Static) |
|---------|-------------------|-------------------|
| Layout Structure | React Components | Generated HTML matching components |
| Navigation | Next.js routing | Static HTML links |
| Sidebar | docs-config.ts | docs-config.ts (generated HTML) |
| Build Output | Next.js app | Static HTML files |
| Server Required | Node.js | Any HTTP server |
| Performance | Server-rendered | Pre-rendered (fastest) |
| Deployment | Vercel/Node host | Any static host |

