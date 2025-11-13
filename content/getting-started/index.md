---
title: Getting Started
description: Create your first Elide workspace and run a polyglot module.
order: 3
---

# Getting Started

This quickstart provisions a new Elide workspace, links language runtimes, and executes a polyglot module that bridges JavaScript and Rust.

## 1. Initialize a workspace

```bash
mkdir hello-elide
cd hello-elide
elide init
```

The initializer scaffolds the project structure and creates a `elide.toml` manifest describing your modules.

## 2. Add language targets

```bash
elide targets add javascript
elide targets add rust
```

Elide downloads the appropriate adapters the first time you target a new language. Subsequent runs reuse the cached toolchains.

## 3. Create a module

```bash
elide modules create greet --from javascript --to rust
```

This command wires a JavaScript entrypoint to a Rust implementation. Elide exposes an idiomatic API surface to both sides automatically.

## 4. Execute the module

```bash
elide run greet
```

You should see the JavaScript driver invoke the compiled Rust routine synchronously. For additional recipes advance to [Polyglot 101](/polyglot-101/).

