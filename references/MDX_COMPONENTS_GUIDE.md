# MDX Components Guide

This guide explains how to use the custom React components available in MDX files for creating beautiful, consistent documentation.

## Table of Contents

- [CodeBlock - Syntax Highlighted Code](#codeblock)
- [ComparisonTable - Performance Tables](#comparisontable)
- [SimpleTable - Basic Tables](#simpletable)
- [Callout - Highlighted Information](#callout)
- [InlineCode - Inline Code](#inlinecode)

---

## CodeBlock

Display syntax-highlighted code blocks with optional titles and line numbers.

### Import

```jsx
import { CodeBlock } from '@/components/ui/code-block'
```

### Basic Usage

```jsx
<CodeBlock language="javascript">
{`const app = Elide.http
app.router.handle("GET", "/", (req, res) => {
  res.send(200, "Hello, Elide!")
})`}
</CodeBlock>
```

### With Title

```jsx
<CodeBlock language="javascript" title="server.js">
{`const app = Elide.http
app.router.handle("GET", "/", (req, res) => {
  res.send(200, "Hello!")
})`}
</CodeBlock>
```

### With Line Numbers

```jsx
<CodeBlock language="python" showLineNumbers>
{`def hello_world():
    print("Hello from Elide!")
    return True`}
</CodeBlock>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | Required | The code content to display |
| `language` | `'javascript' \| 'typescript' \| 'python' \| 'bash' \| 'json' \| 'jsx' \| 'tsx' \| 'shell'` | `'javascript'` | Programming language for syntax highlighting |
| `title` | `string` | - | Optional title shown above code block |
| `showLineNumbers` | `boolean` | `false` | Show line numbers on the left |
| `className` | `string` | - | Additional CSS classes |

### Supported Languages

- `javascript` / `js` - JavaScript
- `typescript` / `ts` - TypeScript
- `jsx` - JavaScript with JSX
- `tsx` - TypeScript with JSX
- `python` / `py` - Python
- `bash` / `sh` / `shell` - Bash/Shell scripts
- `json` - JSON

---

## ComparisonTable

Create beautiful comparison tables perfect for showing performance metrics.

### Import

```jsx
import { ComparisonTable } from '@/components/ui/comparison-table'
```

### Usage

```jsx
<ComparisonTable
  columns={[
    { title: 'Metric' },
    { title: 'Elide (Native)', isHighlight: true },
    { title: 'Node.js' },
    { title: 'Deno' }
  ]}
  rows={[
    { metric: 'Cold Start', values: ['~5ms', '~500ms', '~100ms'] },
    { metric: 'Memory (Hello World)', values: ['~10MB', '~50MB', '~40MB'] },
    { metric: 'HTTP Throughput', values: ['800K+ req/s', '200K req/s', '300K req/s'] },
    { metric: 'Binary Size', values: ['~15MB', 'N/A', '~90MB'] }
  ]}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `ComparisonColumn[]` | Array of column definitions |
| `rows` | `ComparisonRow[]` | Array of row data |
| `className` | `string` | Additional CSS classes |

### Column Definition

```typescript
interface ComparisonColumn {
  title: string        // Column header text
  isHighlight?: boolean // Highlight this column in green (for "winner")
}
```

### Row Definition

```typescript
interface ComparisonRow {
  metric: string        // Left-most column (what's being measured)
  values: (string | number)[]  // Values for each comparison column
}
```

### Visual Features

- First column (metric) is automatically bold
- Highlighted columns show values in **green** with monospace font
- Non-highlighted columns show values in muted gray
- All data values use monospace font for alignment
- Responsive with horizontal scroll on mobile

---

## SimpleTable

Basic table component for displaying structured data.

### Import

```jsx
import { SimpleTable } from '@/components/ui/comparison-table'
```

### Usage

```jsx
<SimpleTable
  headers={['Module', 'Description', 'Platforms']}
  rows={[
    ['core', 'Essential utilities and APIs', 'JVM, JavaScript, Native, WASM'],
    ['base', 'Extended functionality', 'JVM, JavaScript, Native'],
    ['server', 'HTTP server and routing', 'JVM, Native Image']
  ]}
/>
```

### With Custom Content

```jsx
<SimpleTable
  headers={['Name', 'Type', 'Description']}
  rows={[
    ['app', <InlineCode>Object</InlineCode>, 'The main application instance'],
    ['router', <InlineCode>Router</InlineCode>, 'HTTP router for handling requests']
  ]}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `headers` | `string[]` | Array of column headers |
| `rows` | `(string \| ReactNode)[][]` | 2D array of cell content |
| `className` | `string` | Additional CSS classes |

---

## Callout

Highlighted information boxes for drawing attention to important content.

### Import

```jsx
import { Callout } from '@/components/ui/callout'
```

### Basic Usage

```jsx
<Callout title="What makes Elide special?">
  Unlike traditional runtimes, Elide can compile your entire application—including
  dependencies—into a single native binary that starts in milliseconds.
</Callout>
```

### Variants

```jsx
// Default (purple)
<Callout title="Quick Tip" variant="default">
  This is the default purple callout.
</Callout>

// Info (blue)
<Callout title="Note" variant="info">
  This is an informational callout.
</Callout>

// Warning (yellow/orange)
<Callout title="Warning" variant="warning">
  Make sure to install dependencies first!
</Callout>

// Success (green)
<Callout title="Success" variant="success">
  Your application has been deployed successfully!
</Callout>

// Danger (red)
<Callout title="Danger" variant="danger">
  This action cannot be undone!
</Callout>
```

### Custom Icon

```jsx
<Callout title="Custom Icon" icon="🚀" variant="info">
  You can use any emoji or Unicode character as an icon!
</Callout>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Content of the callout |
| `title` | `string` | - | Optional title |
| `icon` | `ReactNode` | Auto | Custom icon (defaults to variant icon) |
| `variant` | `'default' \| 'info' \| 'warning' \| 'success' \| 'danger'` | `'default'` | Visual style |
| `className` | `string` | - | Additional CSS classes |

### Default Icons

- `default`: ⚡ (lightning bolt)
- `info`: ℹ (information)
- `warning`: ⚠ (warning)
- `success`: ✓ (checkmark)
- `danger`: ✕ (x mark)

---

## InlineCode

Simple inline code formatting for mentioning code within text.

### Import

```jsx
import { InlineCode } from '@/components/ui/code-block'
```

### Usage

```jsx
Use <InlineCode>const app = Elide.http</InlineCode> to create an HTTP server.

The <InlineCode>router.handle()</InlineCode> method registers route handlers.
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Content to style as code |
| `className` | `string` | Additional CSS classes |

---

## Complete Example

Here's a complete MDX file using all components:

```mdx
---
title: "Elide Server API"
description: "Learn how to build HTTP servers with Elide"
---

import { CodeBlock, InlineCode } from '@/components/ui/code-block'
import { ComparisonTable, SimpleTable } from '@/components/ui/comparison-table'
import { Callout } from '@/components/ui/callout'

# Elide Server API

<Callout title="Fast & Efficient" variant="success">
  Elide's HTTP server can handle 800K+ requests per second on Linux!
</Callout>

## Quick Start

Create a simple HTTP server using the <InlineCode>Elide.http</InlineCode> API:

<CodeBlock language="javascript" title="server.js">
{\`const app = Elide.http

app.router.handle("GET", "/", (request, response) => {
  response.send(200, "Hello, Elide!")
})

app.router.handle("GET", "/api/users", (request, response) => {
  response.json({
    users: ["Alice", "Bob"],
    timestamp: Date.now()
  })
})\`}
</CodeBlock>

## Performance

<ComparisonTable
  columns={[
    { title: 'Metric' },
    { title: 'Elide', isHighlight: true },
    { title: 'Express.js' }
  ]}
  rows={[
    { metric: 'Requests/sec', values: ['800K+', '15K'] },
    { metric: 'Latency (p99)', values: ['< 1ms', '50ms'] }
  ]}
/>

<Callout title="Note" variant="info">
  Benchmarks run on Ubuntu 22.04 with 8 cores.
</Callout>

## API Methods

<SimpleTable
  headers={['Method', 'Description', 'Return Type']}
  rows={[
    ['handle()', 'Register a route handler', 'void'],
    ['send()', 'Send text response', 'void'],
    ['json()', 'Send JSON response', 'void']
  ]}
/>

## Best Practices

<Callout title="Performance Tip" variant="warning" icon="⚡">
  Use native compilation for production deployments to achieve maximum performance.
</Callout>
```

---

## Styling Notes

All components are designed to work seamlessly with the docs theme:

- **Dark mode optimized** - All colors work in dark/light themes
- **Responsive** - Tables scroll horizontally on mobile
- **Consistent spacing** - Proper margins for MDX flow
- **Accessible** - Semantic HTML with proper ARIA attributes

---

## Tips & Best Practices

### Code Blocks

1. Always wrap code in template literals: `{`...`}`
2. Keep code examples focused and concise
3. Use meaningful titles for file names
4. Use line numbers for tutorials showing specific lines

### Tables

1. Use `ComparisonTable` for performance/feature comparisons
2. Use `SimpleTable` for documentation/API references
3. Mark the "winner" column with `isHighlight: true`
4. Keep cell content concise for mobile readability

### Callouts

1. Use sparingly for important information
2. Choose the right variant for the message type
3. Keep titles short (2-4 words)
4. Don't nest too much content inside callouts

### Inline Code

1. Use for variable names, function names, and short snippets
2. Don't use for full statements (use CodeBlock instead)
3. Keep it to single words or short phrases

