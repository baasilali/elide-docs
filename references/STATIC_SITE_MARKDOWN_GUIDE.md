# Static Site Markdown Guide

## Important: Use Markdown, Not React Components

For **static site generation**, we use standard Markdown syntax that gets processed into beautifully styled HTML. React components don't work in static builds without server-side rendering.

## ✅ What Works (Use This!)

### Code Blocks with Syntax Highlighting

**Standard Markdown**:
````markdown
```javascript
// server.js
const app = Elide.http
app.router.handle("GET", "/", (req, res) => {
  res.send(200, "Hello!")
})
```
````

**Result**: Beautiful syntax-highlighted code with IDE-like colors
- Keywords in purple
- Strings in orange  
- Functions in yellow
- Comments in green
- And more!

**Supported Languages**:
- `javascript` / `js`
- `typescript` / `ts`
- `python` / `py`
- `bash` / `shell` / `sh`
- `json`

### Tables

**Standard Markdown**:
```markdown
| Metric | Elide (Native) | Node.js | Deno |
|--------|----------------|---------|------|
| **Cold Start** | ~5ms | ~500ms | ~100ms |
| **Memory** | ~10MB | ~50MB | ~40MB |
```

**Result**: Styled comparison tables with:
- First column bold (metrics)
- Second column green (Elide - the winner!)
- Other columns in muted gray
- Responsive design

### Inline Code

**Standard Markdown**:
```markdown
Use `const app = Elide.http` to create a server.
```

**Result**: Styled inline code with purple accent

### Bold & Italic

**Standard Markdown**:
```markdown
**Bold text** and *italic text*
```

### Links

**Standard Markdown**:
```markdown
[Quick Start](/docs/quick-start)
```

### Lists

**Standard Markdown**:
```markdown
- Item 1
- Item 2
- Item 3
```

### Headings

**Standard Markdown**:
```markdown
# H1
## H2
### H3
#### H4
```

## ❌ What Doesn't Work

### React Components (DON'T USE)

```jsx
// ❌ This WON'T work in static builds
<CodeBlock language="javascript">
{`const x = 42`}
</CodeBlock>

// ❌ This WON'T work either
<ComparisonTable columns={...} rows={...} />

// ❌ Or this
<Callout title="Note">Message</Callout>
```

**Why?** Static sites generate HTML at build time. React components need to be rendered, which requires server-side rendering or a runtime environment.

## How It Works

### Build Process

1. You write standard Markdown in MDX files
2. Build script processes the Markdown
3. Code blocks get syntax highlighting added
4. Tables get styled with CSS classes
5. Output is pure HTML + CSS (no JavaScript needed!)

### Syntax Highlighting

The build script:
1. Detects code language from  ` ```language`
2. Parses the code
3. Wraps keywords, strings, functions in `<span>` tags
4. CSS styles the spans with colors

Example output:
```html
<pre><code class="language-javascript">
<span class="keyword">const</span> app = 
<span class="function">hello</span>(<span class="string">"world"</span>)
</code></pre>
```

### Table Processing

Markdown tables automatically get:
- Responsive wrapper div
- Styled `<table>`, `<thead>`, `<tbody>`
- CSS classes for colors (green for Elide column)
- Proper spacing and borders

## Examples

### Full Page Example

````markdown
---
title: "Getting Started"
description: "Learn Elide basics"
---

# Getting Started

Elide is a fast runtime for modern applications.

## Quick Example

Here's a simple server:

```javascript
// server.js
const app = Elide.http

app.router.handle("GET", "/", (request, response) => {
  response.send(200, "Hello, Elide!")
})
```

Run it:

```bash
elide run server.js
```

## Performance

| Metric | Elide (Native) | Node.js |
|--------|----------------|---------|
| **Cold Start** | ~5ms | ~500ms |
| **Memory** | ~10MB | ~50MB |

## Key Features

- **Fast**: Sub-10ms startup
- **Efficient**: Minimal memory footprint
- **Powerful**: Full language support

Learn more at [Architecture](/docs/architecture).
````

### Code Block Best Practices

1. **Always specify the language**:
   ```markdown
   ```javascript  ← Good
   ```          ← Bad (no highlighting)
   ```

2. **Add comments for context**:
   ```javascript
   // server.js - Main application file
   const app = Elide.http
   ```

3. **Keep examples focused**:
   - Show one concept at a time
   - Remove unnecessary code
   - Add comments to explain tricky parts

4. **Use consistent style**:
   - 2-space indentation
   - Clear variable names
   - Standard conventions

### Table Best Practices

1. **First column = metrics/labels** (will be bold)
2. **Second column = Elide** (will be green)
3. **Other columns = competitors** (will be muted)

```markdown
| Metric           | Elide   | Others  |
|------------------|---------|---------|
| **Performance**  | Fast    | Slow    |
| **Memory**       | Low     | High    |
```

4. **Use bold for row headers**:
   ```markdown
   | **Cold Start** | ~5ms | ~500ms |
   ```

## Styling

All styling happens via CSS in `styles/globals.css`:

- `.mdx-content pre code` - Code blocks
- `.mdx-content table` - Tables  
- `.mdx-content .keyword` - Keywords
- `.mdx-content .string` - Strings
- etc.

To customize colors, edit `styles/globals.css`.

## Pro Tips

### Multi-language Examples

Show the same concept in different languages:

````markdown
JavaScript:
```javascript
const x = 42
```

Python:
```python
x = 42
```
````

### Inline Code in Tables

```markdown
| Method | Description |
|--------|-------------|
| `handle()` | Register route handler |
| `send()` | Send response |
```

### Escaping

If you need to show literal backticks, use a different number:

````markdown
Use ` ```language ` to start a code block
(shown with 4 backticks to escape the 3 backticks)
````

## Common Mistakes

### 1. Using JSX

```markdown
❌ <div className="my-class">Text</div>
✅ Use standard HTML or Markdown
```

### 2. Template Literals

```markdown
❌ {`code here`}
✅ Just use the code directly in markdown
```

### 3. Props/Attributes

```markdown
❌ <CodeBlock language="javascript" title="app.js">
✅ ```javascript
   // app.js
   code here
   ```
```

## Summary

| Feature | Use | Don't Use |
|---------|-----|-----------|
| Code blocks | ` ```language ` | `<CodeBlock>` |
| Tables | Markdown tables | `<ComparisonTable>` |
| Emphasis | `**bold**` | `<strong>` |
| Links | `[text](url)` | `<a href>` |
| Inline code | `` `code` `` | `<InlineCode>` |

---

**Remember**: Static sites = Markdown only. It gets beautifully styled automatically!

For the full example, see: `content/docs/introduction.mdx`

