# MDX Components Quick Reference

Quick cheat sheet for using components in MDX files.

## Import

```jsx
import { CodeBlock, ComparisonTable, SimpleTable, Callout, InlineCode } from '@/components/mdx-components'
```

---

## CodeBlock

```jsx
<CodeBlock language="javascript" title="server.js">
{`const app = Elide.http
app.router.handle("GET", "/", (req, res) => {
  res.send(200, "Hello!")
})`}
</CodeBlock>
```

**Languages**: `javascript`, `typescript`, `python`, `bash`, `json`, `jsx`, `tsx`, `shell`

---

## ComparisonTable

```jsx
<ComparisonTable
  columns={[
    { title: 'Metric' },
    { title: 'Elide', isHighlight: true },
    { title: 'Node.js' }
  ]}
  rows={[
    { metric: 'Cold Start', values: ['~5ms', '~500ms'] },
    { metric: 'Memory', values: ['~10MB', '~50MB'] }
  ]}
/>
```

---

## SimpleTable

```jsx
<SimpleTable
  headers={['Name', 'Type', 'Description']}
  rows={[
    ['app', 'Object', 'Main application'],
    ['router', 'Router', 'HTTP router']
  ]}
/>
```

---

## Callout

```jsx
<Callout title="Important" variant="warning">
  This is important information!
</Callout>
```

**Variants**: `default`, `info`, `warning`, `success`, `danger`

---

## InlineCode

```jsx
Use <InlineCode>const app</InlineCode> to create an app.
```

---

## Full Example

```mdx
---
title: "My Page"
description: "Description here"
---

import { CodeBlock, ComparisonTable, Callout } from '@/components/mdx-components'

# My Documentation

<Callout title="Welcome" variant="info">
  This is a getting started guide.
</Callout>

## Example Code

<CodeBlock language="javascript" title="example.js">
{`const x = 42
console.log(x)`}
</CodeBlock>

## Performance

<ComparisonTable
  columns={[
    { title: 'Framework' },
    { title: 'Speed', isHighlight: true }
  ]}
  rows={[
    { metric: 'Requests/sec', values: ['1M+'] }
  ]}
/>
```

---

For detailed documentation, see [MDX_COMPONENTS_GUIDE.md](./MDX_COMPONENTS_GUIDE.md)

