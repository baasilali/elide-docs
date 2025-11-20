# MDX Components Overview

## What Are These Components?

These are pre-built React components designed specifically for writing beautiful, consistent documentation in MDX files. They provide:

- **Syntax-highlighted code blocks** with support for multiple languages
- **Comparison tables** perfect for showing performance metrics
- **Callout boxes** for highlighting important information
- **Simple tables** for structured data
- **Inline code** formatting

## Quick Start

### 1. Import Components

At the top of your MDX file, add:

```jsx
import { CodeBlock, ComparisonTable, Callout } from '@/components/mdx-components'
```

### 2. Use Them

```jsx
<Callout title="Note" variant="info">
  This is an informational callout!
</Callout>

<CodeBlock language="javascript">
{`const x = 42`}
</CodeBlock>
```

## Available Components

| Component | Purpose | Best For |
|-----------|---------|----------|
| `CodeBlock` | Syntax-highlighted code | Code examples, tutorials |
| `ComparisonTable` | Performance comparisons | Benchmarks, feature matrices |
| `SimpleTable` | Basic data tables | API docs, specifications |
| `Callout` | Highlighted info boxes | Warnings, tips, notes |
| `InlineCode` | Inline code formatting | Mentioning variables/functions |

## Why Use These?

### Before (Plain Markdown)

```markdown
\`\`\`javascript
const app = Elide.http
\`\`\`
```

**Problems:**
- No syntax highlighting in static builds
- Limited customization
- No titles or line numbers
- Inconsistent styling

### After (Components)

```jsx
<CodeBlock language="javascript" title="server.js">
{`const app = Elide.http`}
</CodeBlock>
```

**Benefits:**
- ✓ Beautiful syntax highlighting
- ✓ Optional titles
- ✓ Line numbers support
- ✓ Consistent with design system
- ✓ Works in static builds

## Documentation

- **Comprehensive Guide**: [MDX_COMPONENTS_GUIDE.md](./MDX_COMPONENTS_GUIDE.md)
  - Detailed docs for each component
  - All props and options
  - Complete examples
  - Best practices

- **Quick Reference**: [MDX_QUICK_REFERENCE.md](./MDX_QUICK_REFERENCE.md)
  - Cheat sheet format
  - Copy-paste examples
  - Fast lookup

## Component Features

### CodeBlock

```jsx
<CodeBlock 
  language="javascript"     // 8 languages supported
  title="server.js"          // Optional filename
  showLineNumbers={true}     // Optional line numbers
>
{`your code here`}
</CodeBlock>
```

**Supported Languages:**
- JavaScript/TypeScript
- Python
- Bash/Shell
- JSON

### ComparisonTable

```jsx
<ComparisonTable
  columns={[
    { title: 'Metric' },
    { title: 'Elide', isHighlight: true },  // Green highlight
    { title: 'Others' }
  ]}
  rows={[
    { metric: 'Speed', values: ['Fast', 'Slow'] }
  ]}
/>
```

**Features:**
- Automatic green highlighting for "winner"
- Monospace fonts for numbers
- Responsive design
- Clean, modern styling

### Callout

```jsx
<Callout 
  title="Important"
  variant="warning"  // 5 variants
  icon="⚡"          // Custom icons
>
  Your message here
</Callout>
```

**5 Variants:**
- `default` - Purple (general info)
- `info` - Blue (FYI)
- `warning` - Yellow (caution)
- `success` - Green (good news)
- `danger` - Red (critical)

## Examples in the Wild

Check out these docs that use the components:

- `content/docs/introduction.mdx` - Uses all components
- Shows real-world usage
- Copy patterns from there

## Tips

1. **Always use template literals** for code:
   ```jsx
   {`code here`}
   ```

2. **Import at the top** of your MDX:
   ```jsx
   import { CodeBlock, ... } from '@/components/mdx-components'
   ```

3. **Pick the right variant** for callouts:
   - Info = neutral information
   - Warning = something to watch out for
   - Success = positive outcomes
   - Danger = critical issues

4. **Use SimpleTable** for docs, **ComparisonTable** for benchmarks

## Getting Help

- See [MDX_COMPONENTS_GUIDE.md](./MDX_COMPONENTS_GUIDE.md) for detailed documentation
- Check [MDX_QUICK_REFERENCE.md](./MDX_QUICK_REFERENCE.md) for quick examples
- Look at `content/docs/introduction.mdx` for real examples

## Contributing

When creating new components:
1. Add them to `components/ui/`
2. Export from `components/mdx-components.tsx`
3. Document in `MDX_COMPONENTS_GUIDE.md`
4. Add examples to `MDX_QUICK_REFERENCE.md`

