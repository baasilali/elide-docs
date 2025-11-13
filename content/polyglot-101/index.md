---
title: Polyglot 101
description: Learn how Elide isolates, links, and executes code across languages.
order: 4
---

# Polyglot 101

Elide treats every language runtime as a peer process connected through secure capability channels. Understanding the model helps you design portable modules.

## Runtime isolation

- Each module executes inside a sandbox with a minimal syscall surface.
- Capabilities such as filesystem or network access are granted explicitly through the manifest.
- Language runtimes communicate through shared memory queues managed by Elide.

## Module boundaries

Modules expose typed interfaces defined in the manifest. Elide generates bindings for each target language so the calling code feels native.

### Type coercion

Elide marshals primitives, collections, and structured records automatically. Use `elide schema check` to validate new interface definitions before publishing.

## Capability security

Elide adopts a capability-based security model. A module can only call interfaces that have been granted via the manifest and the runtime cannot escalate privileges at execution time.

## Where to go next

- Review the [JavaScript Node API guide](/guides/javascript/node-api/) for adapter details.
- Explore additional language guides under the **Guides by language** section.

