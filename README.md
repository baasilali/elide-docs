# Elide Documentation Site

An Elide-based documentation site with React and MDX support.

## Prerequisites

- [Elide runtime](https://github.com/elide-dev/elide) installed
- Bun or npm for package management

## Project Structure

```
elide-docs/
├── src/
│   ├── server.ts          # Elide HTTP server
│   ├── app.tsx            # React app root
│   └── router.tsx         # Routing configuration
├── components/            # React UI components (from Next.js version)
├── content/docs/         # MDX documentation files
├── lib/                  # Utilities and configuration
└── public/               # Static assets
```

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Run Development Server

```bash
bun run dev
# or
elide run src/server.ts
```

The site will be available at `http://localhost:3000`

### 3. Build for Production

```bash
bun run build
```

## Key Differences from Next.js Version

- **Server**: Elide HTTP server instead of Next.js
- **Routing**: React Router instead of file-based routing
- **Build**: Elide build system instead of Next.js
- **UI**: Same React components, just adapted imports

## Benefits of Elide

- Fast startup times
- Low memory footprint
- Polyglot support (can mix Python/JS/TS)
- Native compilation option

## Migration from Next.js Version

All UI components, styles, and MDX content are preserved. Only the routing and server layer changed.
