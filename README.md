# Elide Documentation

Official documentation for Elide - built with Elide itself (dogfooding!).

## What's Different Here?

This documentation site is built **without Next.js** and served using **Elide's native HTTP server**:

- **Static site generation** at build time (no server-side rendering)
- **Elide-powered serving** for fast startup and low memory usage
- **MDX support** for React components in documentation
- **Tailwind CSS** for beautiful, modern styling

## Architecture

```
Build Time:
  MDX files + React components -> Static HTML/CSS/JS
  
Runtime:
  elide serve dist/
  (Just serving static files - ultra fast!)
```

## Getting Started

### Prerequisites

1. **Install Elide** (if not already installed):
   ```bash
   curl -sSL --tlsv1.2 elide.sh | bash -s -
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

### Development

Build and serve the docs:

```bash
bun run dev
# or using elide directly
elide run dev
```

This will:
1. Generate Tailwind CSS
2. Process all MDX files into static HTML
3. Start Elide's HTTP server on port 3000

Visit http://localhost:3000

### Build for Production

```bash
bun run build
# or
elide build
```

Output goes to `dist/` directory.

### Serve Production Build

```bash
bun run serve
# or
elide serve dist --port 3000

# Alternative (if elide serve has issues):
cd dist && python3 -m http.server 3000
```

## Project Structure

```
elide-docs/
├── content/
│   └── docs/           # MDX documentation files
│       ├── introduction.mdx
│       ├── quick-start.mdx
│       └── ...
├── styles/
│   └── globals.css     # Tailwind CSS source
├── public/
│   └── styles.css      # Compiled CSS (generated)
├── build.mjs           # Static site generator
├── elide.pkl           # Elide project configuration
└── package.json
```

## Writing Documentation

### Create a New Doc

1. Create an MDX file in `content/docs/`:

```mdx
---
title: "My New Page"
description: "Description here"
---

# My New Page

Content goes here...
```

2. Rebuild:

```bash
bun run build
```

The page will be available at `/docs/my-new-page.html`

### MDX Features

Basic markdown is supported:
- Headers (`#`, `##`, `###`)
- **Bold** and *italic*
- `inline code` and code blocks
- [Links](https://elide.dev)
- Lists and more

## Why No Next.js?

To showcase Elide's capabilities:

1. **Fast Startup**: Elide serves files with < 10ms startup time
2. **Low Memory**: Uses 50-70% less memory than Node.js
3. **Polyglot**: Could add Python/Ruby tooling in the same project
4. **Native Compilation**: Can build to a single binary with no dependencies
5. **Dogfooding**: We use our own tool to build our own docs!

## Performance Comparison

| Metric | Next.js | Elide |
|--------|---------|-------|
| Startup Time | ~500ms | ~10ms |
| Memory Usage | ~150MB | ~60MB |
| Cold Start | Slow | Instant |
| Dependencies | node_modules | None (native) |

## Deployment

### Option 1: Native Binary

```bash
elide build --native
./dist/elide-documentation
```

Single executable, no runtime needed!

### Option 2: Cloudflare Workers

The `elide.pkl` configures Cloudflare Workers deployment:

```bash
elide deploy
```

### Option 3: Docker

```dockerfile
FROM elide/base:latest
WORKDIR /app
COPY dist/ ./dist/
CMD ["elide", "serve", "dist", "--port", "3000"]
```

## Configuration

See `elide.pkl` for:
- Dependency management
- Build artifacts
- Deployment targets
- Custom scripts

## Contributing

This is an internal Elide project. To contribute:

1. Edit MDX files in `content/docs/`
2. Run `bun run build` to test
3. Submit a PR

## License

Copyright (c) Elide Technologies. All rights reserved.
