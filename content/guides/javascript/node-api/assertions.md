---
title: Assertions Helper
description: Validate node adapter behavior using the built-in assertions toolkit.
order: 2
---

# Assertions Helper

Elide ships a lightweight assertions helper for the Node adapter. Use it to validate contract expectations while keeping tests portable across languages.

## Importing the helper

```ts
import { assert, assertRejects } from "@elide/node/assertions";
```

The module exports type-aware assertions built on top of the runtime's diagnostics subsystem.

## Common assertions

### `assert.equal(actual, expected, message?)`

Performs a deep comparison between values. Fails with a descriptive diff when the structures diverge.

### `assert.rejects(promise, errorMatcher, message?)`

Validates that an asynchronous function rejects with the expected error shape.

## Snapshot testing

Snapshot support is optional. Enable it in `elide.toml`:

```toml
[module.testing]
snapshots = true
```

Snapshots are stored alongside your module and replayed during CI runs.

