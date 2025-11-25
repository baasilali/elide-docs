# Elide Documentation

Fast, static documentation site for Elide, served by Elide.

## Tech Stack

**Build:**
- Build script (`build-static.mjs`)
- Gray-matter (frontmatter parsing)
- Custom MDX-to-HTML converter
- Tailwind CSS v4

**Output:**
- Pure static HTML/CSS/JS
- No React runtime
- No client-side framework
- Vanilla JavaScript for interactivity

**Serving:**
- Elide's built-in static file server
- Command: `elide serve dist --port 3000`
- Fast startup, low memory
- Production-ready HTTP server

## Architecture

### Static Site Generation
All UI is hard-coded HTML strings in `build-static.mjs`:
- `generateNavBarHTML()` - Two-row navbar with icons, search, install button
- `generateSidebarHTML()` - Dynamic sidebar filtered by active navbar section
- `generateTOCHTML()` - Auto-generated table of contents from h2/h3 headings
- `processMDXFile()` - MDX -> HTML with regex-based markdown parsing

### Key Features
1. **Dynamic Navigation**: Sidebar changes based on active navbar section
2. **Search UI**: Pop-out search bar with backdrop blur (non-functional search)
3. **TOC Auto-scroll**: Active heading tracking with smooth scroll
4. **Syntax Highlighting**: Custom regex-based highlighter for code blocks
5. **Responsive**: Mobile-friendly with hamburger menu

### Why Hard-coded?
- Faster builds (no React SSR)
- Smaller bundle (no framework overhead)
- Full control over HTML output
- Simple debugging

## Step-by-Step Reproduction

### Prerequisites
1. **Install Elide** (required for serving):
   ```bash
   curl -sSL --tlsv1.2 https://elide.sh | bash -s -
   ```
   
2. **Verify Elide installation**:
   ```bash
   elide --version
   ```

3. **Install Bun** (or Node.js):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

### From Scratch Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd elide-docs
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # Only installs: gray-matter, tailwindcss, @tailwindcss/postcss
   ```

3. **Build the CSS**:
   ```bash
   bun run build:css
   # Compiles styles/globals.css -> public/styles.css
   # Uses Tailwind CLI to process CSS + custom styles
   ```

4. **Generate static HTML**:
   ```bash
   node build-static.mjs
   # [CLEAN] Cleaning dist directory...
   # [COPY] Copying static assets...
   # [DOCS] Processing documentation files...
   # [OK] Generated 22 HTML files
   # [INDEX] Generating index page...
   # [SUCCESS] Build complete! Files in dist/
   ```

5. **Serve with Elide**:
   ```bash
   elide serve dist --port 3000
   # Elide starts HTTP server instantly
   # Listening on http://localhost:3000
   ```

### Quick Start (All-in-One)

```bash
# Install dependencies
bun install

# Build everything (CSS + HTML)
bun run build

# Serve with Elide
bun run serve

# OR: Do it all in one command
bun run dev
```

### What Happens During Build

1. **CSS Compilation** (`build-css.mjs`):
   - Reads `styles/globals.css`
   - Processes Tailwind directives
   - Applies custom CSS (fonts, gradients, animations)
   - Outputs minified `public/styles.css`

2. **HTML Generation** (`build-static.mjs`):
   - Creates `dist/` directory
   - Copies `public/` assets to `dist/assets/`
   - For each `.mdx` file in `content/docs/`:
     - Parses frontmatter with gray-matter
     - Converts markdown to HTML with regex
     - Generates navbar (filtered by section)
     - Generates sidebar (filtered by active section)
     - Generates TOC (from h2/h3 headings)
     - Injects inline JavaScript (scroll tracking, search UI)
     - Writes complete HTML file to `dist/docs/`
   - Generates `dist/index.html` landing page

3. **Serving** (`elide serve`):
   - Elide's native HTTP server starts
   - Serves static files from `dist/`
   - Handles routing (e.g., `/docs/introduction.html`)
   - No server-side rendering or processing
   - Pure file serving with HTTP headers

## Project Structure

```
elide-docs/
├── build-static.mjs        # Static site generator (all UI logic)
├── build-css.mjs            # Tailwind CSS compiler
├── content/docs/            # MDX documentation files
├── styles/globals.css       # Tailwind source + custom CSS
├── public/                  # Static assets + compiled CSS
└── dist/                    # Generated HTML (gitignored)
```

## Writing Docs

Create `content/docs/new-page.mdx`:

```mdx
---
title: "Page Title"
---

# Heading

Content with **markdown** and `code`.
```

Add to `navbarSections` array in `build-static.mjs`:

```js
{
  id: 'runtime',
  title: 'Runtime',
  sections: [
    {
      title: 'Getting Started',
      items: [
        { title: 'New Page', slug: 'new-page' }  // Add here
      ]
    }
  ]
}
```

Rebuild: `bun run build`

## UI Customization

**All UI is in `build-static.mjs`**:
- Lines 295-418: Navbar generation
- Lines 420-550: Sidebar generation  
- Lines 550-650: HTML page template
- Lines 670-800: Client-side JavaScript (scroll tracking, search UI, etc.)

Changes to navbar/sidebar/layout = edit `build-static.mjs`, NOT component files (there are none).

## Styling

Edit `styles/globals.css`:
- Tailwind directives
- CSS variables (colors, fonts)
- Custom classes (.glow-bg, .feature-card, etc.)
- Font declarations (Satoshi)

Rebuild CSS: `bun run build:css`

## Implementation Details

### Navbar
- Two-row layout: Logo/Search/Install (top), Nav links (bottom)
- Full-width design with responsive padding
- Active section highlighted with purple/pink gradient underline
- Search bar pops out on focus with backdrop blur

### Sidebar
- Dynamically filtered by active navbar section
- Purple section header icons
- Faint horizontal separators between major sections
- Active item highlighted with semi-transparent purple
- Scrollable with overflow

### Table of Contents
- Dynamically generated from h2/h3 headings
- Auto-scrolls to keep active item visible
- Purple/pink highlight on active + hover
- Smooth scroll behavior

### Scroll Effects
- TOC updates on scroll with 150px offset for early detection
- Auto-scroll centers active TOC item in viewport
- Overscroll-behavior disabled (no rubber band effect)

### Colors
- Purple: `rgb(168, 85, 247)`
- Pink: `rgb(219, 39, 119)`
- Gradients: `from-purple-500 to-pink-500`

### Fonts
- Satoshi
- Weights: Light (300), Regular (400), Medium (500), Bold (700), Black (900)

## Build Output

`dist/` contains:
- `index.html` - Landing page
- `docs/*.html` - All documentation pages
- `assets/` - Copied from `public/` (CSS, images, fonts)

Each HTML file includes:
- Inline styles for overscroll behavior
- Full navbar HTML
- Filtered sidebar HTML
- Dynamic TOC HTML
- Main content with syntax-highlighted code blocks
- Inline JavaScript for interactivity

## Dependencies

```json
{
  "dependencies": {
    "gray-matter": "^4.0.3"  // Frontmatter parsing only
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.17",
    "tailwindcss": "^4.1.17"
  }
}
```

No React, no MDX runtime, no UI frameworks.

## Performance

- Build time: ~2-3s for 22 pages
- Page size: ~50-80KB HTML per page
- No JavaScript framework overhead
- Instant page loads (static HTML)

## Notes

- All navigation config is in `build-static.mjs` navbarSections array
- Feature cards on introduction page use inline HTML in `introduction.mdx`
- Mobile menu toggles but requires JavaScript implementation
- Git hooks prevent committing `dist/` files
