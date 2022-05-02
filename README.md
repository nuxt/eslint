# Nuxt ESLint Config

[![GitHub Actions](https://flat.badgen.net/github/checks/nuxt/eslint-config/main)](https://github.com/nuxt/eslint-config/actions?query=workflow%3Aci)
[![npm](https://flat.badgen.net/npm/dm/@nuxtjs/eslint-config)](https://npmjs.com/package/@nuxtjs/eslint-config)
[![npm (scoped with tag)](https://flat.badgen.net/npm/v/@nuxtjs/eslint-config)](https://npmjs.com/package/@nuxtjs/eslint-config)

[ESlint](https://eslint.org/) config used for Nuxt.

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
  "extends": [
    "@nuxtjs"
  ]
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
  "extends": [
    "@nuxtjs"
  ]
}
```

## TypeScript

If you're using TypeScript, follow [Usage](#usage) section by replacing `@nuxtjs/eslint-config` by `@nuxtjs/eslint-config-typescript`.

And in your `.eslintrc` all you need is :

```json
{
  "extends": [
    "@nuxtjs/eslint-config-typescript"
  ]
}
```

You can then edit/override same rules as you could with `@nuxtjs/eslint-config` but also TypeScript rules.
You can find the list of supported TypeScript rules [here](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules).

Also see [Nuxt TypeScript Support](https://typescript.nuxtjs.org/guide/lint.html).

## License

Setup inspired by [eslint-config-standard](https://github.com/standard/eslint-config-standard)

Published under the [MIT License](./LICENSE).
