# Markdown Quick Reference for Static Sites

## Code Blocks (Syntax Highlighted)

````markdown
```javascript
// Comment
const app = Elide.http
app.router.handle("GET", "/", (req, res) => {
  res.send(200, "Hello!")
})
```
````

**Languages**: `javascript`, `typescript`, `python`, `bash`, `json`

---

## Tables (Auto-styled)

```markdown
| Metric | Elide (Native) | Node.js | Deno |
|--------|----------------|---------|------|
| **Cold Start** | ~5ms | ~500ms | ~100ms |
| **Memory** | ~10MB | ~50MB | ~40MB |
```

**Note**: Second column (Elide) automatically gets green highlighting!

---

## Inline Code

```markdown
Use `const app = Elide.http` to create a server.
```

---

## Emphasis

```markdown
**Bold text** and *italic text*
```

---

## Links

```markdown
[Quick Start](/docs/quick-start)
[External](https://example.com)
```

---

## Lists

```markdown
- Item 1
- Item 2
  - Nested item
- Item 3
```

Or numbered:

```markdown
1. First
2. Second
3. Third
```

---

## Headings

```markdown
# H1 - Page Title
## H2 - Major Section
### H3 - Subsection
#### H4 - Minor Section
```

---

## Complete Example

````markdown
---
title: "My Page"
description: "Description here"
---

# Page Title

Introduction paragraph with **bold** and `inline code`.

## Code Example

Here's a simple server:

```javascript
// server.js
const app = Elide.http
app.router.handle("GET", "/", (req, res) => {
  res.send(200, "Hello!")
})
```

Run it:

```bash
elide run server.js
```

## Performance

| Metric | Elide | Node.js |
|--------|-------|---------|
| **Speed** | Fast | Slow |
| **Memory** | Low | High |

## Features

- Lightning fast
- Memory efficient
- Easy to use

Read more at [Architecture](/docs/architecture).
````

---

## Remember

✅ **Use**: Standard Markdown
❌ **Don't use**: React components (`<CodeBlock>`, `<Callout>`, etc.)

**Why?** Static sites need HTML at build time. React components need runtime rendering.

---

For details see: [STATIC_SITE_MARKDOWN_GUIDE.md](./STATIC_SITE_MARKDOWN_GUIDE.md)

