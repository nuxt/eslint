# Nuxt ESLint packages

## `@nuxt/eslint-config`

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]
[![Bundlephobia][bundlephobia-src]][bundlephobia-href]
[![LGTM][lgtm-src]][lgtm-href]

> Non-opinionated [ESlint](https://eslint.org/) configuration for Nuxt 3 apps.

### Features

- Works out-of-the-box with no additional configuration.
- Nuxt-specific rules for pages, components and more.
- ... under active development

### Installation

1. Install this package and `eslint` in your `devDependencies`.

```bash
npm i -D @nuxt/eslint-config eslint
yarn add -D @nuxt/eslint-config eslint
pnpm add -D @nuxt/eslint-config eslint
```

2. Extend the default Nuxt config:

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

## `@nuxtjs/eslint-config` and `@nuxtjs/eslint-config-typescript`

[![GitHub Actions](https://flat.badgen.net/github/checks/nuxt/eslint-config/main)](https://github.com/nuxt/eslint-config/actions?query=workflow%3Aci)
[![npm](https://flat.badgen.net/npm/dm/@nuxtjs/eslint-config)](https://npmjs.com/package/@nuxtjs/eslint-config)
[![npm (scoped with tag)](https://flat.badgen.net/npm/v/@nuxtjs/eslint-config)](https://npmjs.com/package/@nuxtjs/eslint-config)

> Opinionated [ESlint](https://eslint.org/) configuration used internally by Nuxt projects.

## Usage

Do you want to add the config to your own projects? There you go:

1. Add this package to your devDependencies

```bash
$ npm i -D @nuxtjs/eslint-config
# or
$ yarn add -D @nuxtjs/eslint-config
```

2. Install `eslint` if not already present locally or globally

```bash
$ npm i -D eslint
# or
$ yarn add -D eslint
```

3. Create a `.eslintrc` file

4. Extend our config (you can use just the scope name as ESLint will assume the `eslint-config` prefix):

```json
{
  "extends": ["@nuxtjs"]
}
```

## Full example

A full example `.eslintrc` for a project with babel support:

> Dont forget to `npm i -D @babel/eslint-parser` or `yarn add -D @babel/eslint-parser`

```json
{
  "root": true,
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "sourceType": "module"
  },
  "extends": ["@nuxtjs"]
}
```

## TypeScript

If you're using TypeScript, follow [Usage](#usage) section by replacing `@nuxtjs/eslint-config` by `@nuxtjs/eslint-config-typescript`.

And in your `.eslintrc` all you need is :

```json
{
  "extends": ["@nuxtjs/eslint-config-typescript"]
}
```

You can then edit/override same rules as you could with `@nuxtjs/eslint-config` but also TypeScript rules.
You can find the list of supported TypeScript rules [here](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules).

Also see [Nuxt TypeScript Support](https://typescript.nuxtjs.org/guide/lint.html).

### License

Made with ❤️

Published under [MIT License](./LICENCE).

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
