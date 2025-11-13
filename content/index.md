---
title: Welcome to Elide
description: Orientation for the Elide runtime documentation and how the docs are organized.
order: 1
---

# Welcome to Elide

Elide is a polyglot runtime designed to let engineers mix and match languages without sacrificing performance or ergonomics. This documentation site collects the core concepts, detailed guides, and language-specific references you need to ship with Elide confidently.

## How this documentation is organized

- **Installation** covers the system prerequisites, CLI tooling, and editor integrations needed to get up and running.
- **Getting Started** walks you through creating your first Elide workspace and running a cross-language module.
- **Polyglot 101** dives into the runtime model, module boundaries, and capability-based security that make Elide different.
- **Guides by language** breaks down runtime adapters, APIs, and recipes for each supported ecosystem. The JavaScript section is our living example.

Each page includes an “On this page” outline that lists the major headings. Use it to jump between sections quickly.

## Contributing to the docs

Every markdown file that powers this site lives in the `content/` directory and mirrors the sidebar hierarchy. To propose a change:

1. Edit or add the relevant `.md` file inside `content/`.
2. Include `title`, `description`, and (optionally) `order` metadata in the front matter.
3. Run `bun run build` locally to ensure the static export succeeds.
4. Open a pull request describing the update.

We welcome improvements to the text, examples, and structure. This site is intentionally simple so that the content itself stays front and center.
