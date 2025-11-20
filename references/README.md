# References Documentation

This folder contains documentation and guides for the Elide documentation project.

## Quick Links

### For Writing Documentation (START HERE!)

- **[Static Site Markdown Guide](./STATIC_SITE_MARKDOWN_GUIDE.md)** - **USE THIS!** How to write docs for static sites
- **[Docs Style Guide](./DOCS_STYLE_GUIDE.md)** - Writing style guide

### React Components (For Future SPA/SSR Setup)

- **[MDX Components Quick Reference](./MDX_QUICK_REFERENCE.md)** - Copy-paste examples (React)
- **[MDX Components Guide](./MDX_COMPONENTS_GUIDE.md)** - Detailed component docs (React)
- **[Components Overview](./COMPONENTS_OVERVIEW.md)** - What's available and why (React)

### For Project History

- **[Components Created](./COMPONENTS_CREATED.md)** - Summary of all components
- **[Docs Style Guide](./DOCS_STYLE_GUIDE.md)** - Writing style guide
- **[Elide Status](./ELIDE_STATUS.md)** - Project status
- **[Migration Complete](./MIGRATION_COMPLETE.md)** - Migration notes
- **[Static Build Migration](./STATIC_BUILD_MIGRATION.md)** - Build system docs
- **[Styling Changes](./STYLING_CHANGES.md)** - CSS updates
- **[Styling Fix](./STYLING_FIX.md)** - Style fixes
- **[Success](./SUCCESS.md)** - Success metrics

## I Want To...

### Write a new MDX page for the static site

1. **Read [STATIC_SITE_MARKDOWN_GUIDE.md](./STATIC_SITE_MARKDOWN_GUIDE.md)** - Everything you need!
2. Look at `content/docs/introduction.mdx` for examples
3. Use standard Markdown (not React components)

### Use syntax-highlighted code blocks

**Use standard Markdown code blocks**:

````markdown
```javascript
// app.js
const app = Elide.http
app.router.handle("GET", "/", (req, res) => {
  res.send(200, "Hello!")
})
```
````

Result: Beautiful syntax highlighting automatically!

See: [STATIC_SITE_MARKDOWN_GUIDE.md](./STATIC_SITE_MARKDOWN_GUIDE.md#code-blocks-with-syntax-highlighting)

### Create a comparison table

**Use standard Markdown tables**:

```markdown
| Metric | Elide (Native) | Node.js |
|--------|----------------|---------|
| **Cold Start** | ~5ms | ~500ms |
| **Memory** | ~10MB | ~50MB |
```

Result: Green highlighting for Elide column automatically!

See: [STATIC_SITE_MARKDOWN_GUIDE.md](./STATIC_SITE_MARKDOWN_GUIDE.md#tables)

### Add emphasis or inline code

```markdown
Use `const app` for inline code.

**Bold text** and *italic text* work too!
```

See: [STATIC_SITE_MARKDOWN_GUIDE.md](./STATIC_SITE_MARKDOWN_GUIDE.md)

### Learn all component features

Read [MDX_COMPONENTS_GUIDE.md](./MDX_COMPONENTS_GUIDE.md) - it has:
- Every prop explained
- Multiple examples per component
- Best practices
- Tips and tricks

### Understand the project

Read [COMPONENTS_CREATED.md](./COMPONENTS_CREATED.md) for:
- What was created
- Why it was created
- How everything fits together
- File structure

## Component List

| Component | Purpose | Doc Link |
|-----------|---------|----------|
| `CodeBlock` | Syntax-highlighted code | [Guide](./MDX_COMPONENTS_GUIDE.md#codeblock) |
| `ComparisonTable` | Performance comparisons | [Guide](./MDX_COMPONENTS_GUIDE.md#comparisontable) |
| `SimpleTable` | Basic tables | [Guide](./MDX_COMPONENTS_GUIDE.md#simpletable) |
| `Callout` | Info/warning boxes | [Guide](./MDX_COMPONENTS_GUIDE.md#callout) |
| `InlineCode` | Inline code text | [Guide](./MDX_COMPONENTS_GUIDE.md#inlinecode) |

## Getting Started

1. **New to writing docs?**
   → Start with [MARKDOWN_QUICK_REFERENCE.md](./MARKDOWN_QUICK_REFERENCE.md) ⭐

2. **Need detailed info?**
   → Read [STATIC_SITE_MARKDOWN_GUIDE.md](./STATIC_SITE_MARKDOWN_GUIDE.md)

3. **Confused about React vs Markdown?**
   → Check [REACT_VS_STATIC_EXPLAINED.md](./REACT_VS_STATIC_EXPLAINED.md)

4. **Looking for project history?**
   → See [COMPONENTS_CREATED.md](./COMPONENTS_CREATED.md)

## Examples

All examples live in:
- `content/docs/introduction.mdx` - Real usage
- `MDX_QUICK_REFERENCE.md` - Copy-paste snippets
- `MDX_COMPONENTS_GUIDE.md` - Detailed examples

## Need Help?

1. Check the quick reference first
2. Look at introduction.mdx for patterns
3. Read the full guide if needed

---

**Last Updated**: November 20, 2025

