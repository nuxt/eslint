# `@nuxt/eslint-config`

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

> Non-opinionated [ESlint](https://eslint.org/) configuration for Nuxt 3 apps.

### Features

- Works out-of-the-box with no additional configuration.
- Nuxt-specific rules for pages, components and more.

### Installation

1. Install this package and `eslint` in your `devDependencies`.

```bash
npm i -D @nuxt/eslint-config eslint
yarn add -D @nuxt/eslint-config eslint
pnpm add -D @nuxt/eslint-config eslint
```

2. Extend the default Nuxt config by creating an `.eslintrc.cjs`:

```js
module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
};
```

You might also want to add a script entry to your `package.json:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxt/eslint-config?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxt/eslint-config
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxt/eslint-config?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxt/eslint-config
[github-actions-src]: https://img.shields.io/github/workflow/status/nuxt/eslint-config/ci/main?style=flat-square
[github-actions-href]: https://github.com/nuxt/eslint-config/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/nuxt/eslint-config/main?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt/eslint-config
[lgtm-src]: https://img.shields.io/lgtm/grade/javascript/github/nuxt/eslint-config?style=flat-square
[lgtm-href]: https://lgtm.com/projects/g/nuxt/eslint-config
[bundlephobia-src]: https://img.shields.io/bundlephobia/minzip/@nuxt/eslint-config?style=flat-square
[bundlephobia-href]: https://bundlephobia.com/package/@nuxt/eslint-config
