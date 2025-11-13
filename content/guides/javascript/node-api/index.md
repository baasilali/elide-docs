---
title: Node API
description: Entry points, lifecycle, and permissions for the Node adapter.
order: 1
---

# Node API

The Node API adapter bootstraps JavaScript modules inside a sandboxed Node runtime. It exposes lifecycle hooks and a standard library subset aligned with Elide's capability model.

## Module entrypoint

- Export an asynchronous `main` function that receives the invocation payload.
- Return values are serialized back to the caller's language runtime automatically.
- Throwing an error propagates a structured fault that callers can handle.

## Lifecycle hooks

### `elide.init`

Register initialization logic that runs once per module load. Ideal for establishing database connections or warming caches.

### `elide.shutdown`

Provide cleanup logic to release resources before the runtime unloads your module.

## Permissions

Declare permissions in `elide.toml`. For example:

```toml
[module.permissions]
fs = ["read:./static"]
net = ["https://api.elide.dev"]
```

Permissions are enforced at runtime. Calls outside the allowed set throw capability violations.

## Next steps

Review the [assertions helper](./assertions/) for reusable test utilities.

