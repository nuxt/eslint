# `@nuxt/eslint`

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

> [!IMPORTANT]
> Experimental. Feedbacks are greatly welcome.

A module that generates project-aware [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) for Nuxt.

Different from [`@nuxtjs/eslint-module`](https://github.com/nuxt-modules/eslint), this module does not run ESLint but only generates config under `.nuxt/eslint.config.mjs` based on your project settings. We command using IDEs and `eslint` CLI to lint your code.

## Features

- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), future-proof
- Project-aware Nuxt-specific settings, [supports layers](https://nuxt.com/docs/getting-started/layers).
- [Nuxt DevTools](https://github.com/nuxt/devtools) integration powered by [`eslint-flat-config-viewer`](https://github.com/antfu/eslint-flat-config-viewer)

## Quick Setup

```bash
npm i -D @nuxt/eslint
```

```js
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ]
})
```

And create an `eslint.config.js` file in your project root, with the following content:

```js
// eslint.config.js
import nuxt from './.nuxt/eslint.config.mjs'

export default [
  ...nuxt,
  // your custom flat config here.
]
```

## Receipts

## Work with VS Code

Note that ESLint Flat config is not yet enabled by default in the [ESLint VS Code extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), you will need to enable it via the `eslint.experimental.useFlatConfig` to get ESLint working in VS Code. (This is likely not needed after ESLint v9).

```json
// .vscode/settings.json
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true
}
```

### Use with Prettier

This module does not enable any stylistic/formatting rules by default. You can use Prettier alongside directly.

### Use with Custom Config Presets

By default, this module installs the JS, TS and Vue plugins with their recommended rules. This might already been covered by your config presets. You can disable the default setup by disable `standalone` option.

```js
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint'
  ],
  eslint: {
    standalone: false // <---
  }
})
```

This will make this module only generate the Nuxt-specific rules and disables, so that you can merge it with your own config presets.

For example, with [`@antfu/eslint-config`](https://github.com/antfu/eslint-config):

```js
// eslint.config.js
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    // ...@antfu/eslint-config options,
  },
  // Add the Nuxt rules
  nuxt,
  // ...your other rules
)
```

## License

MIT

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxt/eslint/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxt/eslint

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxt/eslint.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxt/eslint

[license-src]: https://img.shields.io/npm/l/@nuxt/eslint.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxt/eslint

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
