---
title: JavaScript
description: Elide's JavaScript adapter and Node runtime integration.
order: 1
---

# JavaScript Guide

Elide supports JavaScript via the Node adapter. Modules can export functions that are callable from any other language runtime participating in an Elide workspace.

## Adapter overview

- Runs on the Node 20 LTS runtime embedded within Elide.
- Supports ECMAScript modules by default; CommonJS packages can be wrapped using the compatibility loader.
- Provides zero-copy transfers for `ArrayBuffer`, `TypedArray`, and `DataView` instances.

## Available guides

- [Node API overview](/guides/javascript/node-api/)
- Recipes for streaming payloads (coming soon)

