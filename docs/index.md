---
title: Nuxt ESLint
description: 'All-in-one ESLint integration for Nuxt, generating a project-aware ESLint flat config.'
navigation:
  title: Quick Start
---

## Introduction

All-in-one ESLint integration for Nuxt. It generates a project-aware [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) and provides the ability to optionally run ESLint check along side the dev server.

::tip
This module is designed for the [new ESLint flat config format](https://eslint.org/docs/latest/use/configure/configuration-files) which is the [default format since ESLint v9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/). It supports ESLint v9 and v10. We recommend you to use the latest version of ESLint to get the best experience.
::

::warning
The legacy `.eslintrc` config is **not supported** by this module. We highly recommend you to migrate over the flat config to be future-proof.
::

::note
The source code of the module is in [`packages/module`](https://github.com/nuxt/eslint/tree/main/packages/module) on GitHub.
::

## Features

- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files), composable, customizable and future-proof.
- Project-aware Nuxt-specific settings, also supports [layers](/docs/getting-started/layers).
- [Nuxt DevTools](/modules/devtools) integration powered by [`@eslint/config-inspector`](https://github.com/eslint/config-inspector).
- [Extensible with other modules](/modules/eslint/recipes#integrate-with-other-modules).
- Optional [dev server checker](/modules/eslint/recipes#dev-server-checker) integration.

## Quick Setup

Run the following command to add the `@nuxt/eslint` module to your project:

```bash [Terminal]
npx nuxt add eslint
```

Once you start your Nuxt app, a `eslint.config.mjs` file will be generated under your project root. You can customize it as needed.

::note
If you are using TypeScript, you need to install the `typescript` in your project:

:::code-group
```bash [yarn]
yarn add --dev typescript
```
```bash [npm]
npm install -D typescript
```
```bash [pnpm]
pnpm add -D typescript
```
```bash [bun]
bun add -D typescript
```
:::
::

### Manual Setup

::code-group
```bash [yarn]
yarn add --dev @nuxt/eslint eslint typescript
```
```bash [npm]
npm install -D @nuxt/eslint eslint typescript
```
```bash [pnpm]
pnpm add -D @nuxt/eslint eslint typescript
```
```bash [bun]
bun add -D @nuxt/eslint eslint typescript
```
::

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  eslint: {
    // options here
  }
})
```

And create an `eslint.config.mjs` file under your project root, with the following content:

```js [eslint.config.mjs]
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // your custom flat configs go here, for example:
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   rules: {
  //     'no-console': 'off' // allow console.log in TypeScript files
  //   }
  // },
  // {
  //   ...
  // }
)
```

`withNuxt` will take the rest arguments of flat configs and append them after Nuxt flat config items. You can either use the [Nuxt DevTools](/modules/devtools) panel to inspect the resolved ESLint flat config, or manually run [`npx @eslint/config-inspector`](https://github.com/eslint/config-inspector).
