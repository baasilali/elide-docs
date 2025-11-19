# Documentation Style Guide

This guide shows you how to create beautiful, well-formatted documentation using our MDX system with Inter font and modern aesthetics.

## Typography

All documentation automatically uses the **Inter** font family:
- **Body text**: Inter Regular (400)
- **Headings**: Inter Bold (700-800)
- **Code**: Monaco, Menlo, Consolas (monospace)

## Creating New Documentation

### Basic Structure

```mdx
---
title: "Your Page Title"
description: "A brief description for SEO"
date: "2025-11-19"
---

import { Alert } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

# Main Heading

Your introduction paragraph goes here.

## Section Heading

Content for this section...
```

## Components

### Alert Boxes (Beautiful Bubbles)

Use Alert components for important information:

```mdx
<Alert>
  <strong>Important:</strong> This is a default alert with a gradient background and side accent bar.
</Alert>
```

**Variants:**

```mdx
<!-- Default (purple/pink gradient) -->
<Alert>
  <strong>Tip:</strong> Default variant for general information.
</Alert>

<!-- Info (blue gradient) -->
<Alert variant="info">
  <strong>Note:</strong> Use this for informational messages.
</Alert>

<!-- Warning (yellow/orange gradient) -->
<Alert variant="warning">
  <strong>Warning:</strong> Use this for cautionary information.
</Alert>

<!-- Error (red gradient) -->
<Alert variant="destructive">
  <strong>Error:</strong> Use this for critical warnings.
</Alert>
```

### Code Blocks (Beautiful Bubbles)

Code blocks automatically have beautiful styling with gradients and shadows:

**Inline Code:**
```mdx
Use `inline code` for small code snippets or commands.
```

**Code Blocks:**
````mdx
```javascript
// JavaScript code gets beautiful styling automatically
const app = Elide.http

app.router.handle("GET", "/", (request, response) => {
  response.json({ message: "Hello!" })
})
```

```bash
# Bash commands
elide run app.js
```

```typescript
// TypeScript with type annotations
interface User {
  id: number
  name: string
}
```
````

### Tabs

Use tabs for multiple options:

```mdx
<Tabs defaultValue="npm" className="w-full">
  <TabsList>
    <TabsTrigger value="npm">npm</TabsTrigger>
    <TabsTrigger value="yarn">Yarn</TabsTrigger>
    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
  </TabsList>
  
  <TabsContent value="npm">
```bash
npm install package
```
  </TabsContent>
  
  <TabsContent value="yarn">
```bash
yarn add package
```
  </TabsContent>
  
  <TabsContent value="pnpm">
```bash
pnpm add package
```
  </TabsContent>
</Tabs>
```

## Formatting Best Practices

### Headings

- **H1 (`#`)**: Page title only (once per page)
- **H2 (`##`)**: Major sections
- **H3 (`###`)**: Subsections
- **H4 (`####`)**: Minor subsections

```mdx
# Page Title (H1)

Introduction paragraph...

## Major Section (H2)

Content...

### Subsection (H3)

More specific content...

#### Minor Point (H4)

Details...
```

### Lists

**Unordered lists:**
```mdx
- First item
- Second item
- Third item
  - Nested item
  - Another nested item
```

**Ordered lists:**
```mdx
1. First step
2. Second step
3. Third step
```

### Tables

Tables automatically have beautiful styling:

```mdx
| Feature | Elide | Node.js | Deno |
|---------|-------|---------|------|
| **Startup** | < 10ms | ~500ms | ~100ms |
| **Memory** | ~10MB | ~50MB | ~40MB |
```

### Links

```mdx
<!-- Internal links -->
See the [Quick Start Guide](/docs/quick-start) for more information.

<!-- External links -->
Visit [GitHub](https://github.com/elide-dev/elide) for source code.
```

### Images

```mdx
![Alt text](/path/to/image.png)
```

Images automatically get rounded corners and shadows.

## Complete Example

Here's a complete example showing all elements:

```mdx
---
title: "Example Page"
description: "An example of well-formatted documentation"
date: "2025-11-19"
---

import { Alert } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

# Example Page

This page demonstrates all the styling options available in Elide documentation.

<Alert>
  <strong>Pro Tip:</strong> Use Alert boxes to highlight important information!
</Alert>

## Installation

Choose your preferred installation method:

<Tabs defaultValue="script" className="w-full">
  <TabsList>
    <TabsTrigger value="script">Script</TabsTrigger>
    <TabsTrigger value="homebrew">Homebrew</TabsTrigger>
  </TabsList>
  
  <TabsContent value="script">

```bash
curl -sSL https://elide.sh | bash
```

  </TabsContent>
  
  <TabsContent value="homebrew">

```bash
brew install elide
```

  </TabsContent>
</Tabs>

## Features

Key features include:

- **Fast Startup**: < 10ms cold start
- **Low Memory**: Minimal footprint
- **Polyglot**: Multiple languages

## Code Example

Here's a simple server:

```javascript
const app = Elide.http

app.router.handle("GET", "/api/data", (request, response) => {
  response.json({
    message: "Hello from Elide!",
    timestamp: Date.now()
  })
})
```

## Performance

| Metric | Value |
|--------|-------|
| Throughput | 800K+ req/s |
| Latency (p50) | < 1ms |
| Memory | ~10MB |

<Alert variant="info">
  <strong>Benchmark Note:</strong> Results measured on AMD EPYC 7713, 64 cores, 256GB RAM.
</Alert>

## Next Steps

- [Quick Start](/docs/quick-start) - Build your first app
- [API Reference](/docs/api-server) - Explore the APIs
```

## Color Scheme

The documentation uses these color themes:

**Light Mode:**
- Background: White/very light gray
- Text: Dark gray/black
- Accents: Purple (#a855f7), Pink (#ec4899), Blue (#3b82f6)
- Code blocks: Dark gradient with light text

**Dark Mode:**
- Background: Very dark gray/near black
- Text: White/very light gray
- Accents: Lighter purple, pink, blue
- Code blocks: Darker gradient with light text

## Tips for Great Documentation

1. **Start with a clear introduction** - Explain what the page covers
2. **Use headings hierarchically** - Don't skip levels
3. **Include code examples** - Show, don't just tell
4. **Add Alert boxes for important info** - Highlight key points
5. **Use tables for comparisons** - Easy to scan
6. **Link to related pages** - Help readers navigate
7. **Keep paragraphs short** - Easier to read
8. **Use lists for multiple items** - Better than long paragraphs
9. **Include "Next Steps"** - Guide readers forward

## Building the Documentation

After creating or editing MDX files:

```bash
# Rebuild CSS
npm run build:css

# Rebuild static site
node build-static.mjs

# Serve locally
npm run serve
```

Your documentation will have beautiful typography with Inter font, gorgeous code blocks with gradients, and clean alert bubbles automatically!

