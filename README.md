# Nuxt ESLint Config

[![Build Status](https://flat.badgen.net/circleci/github/nuxt/eslint-config)](https://circleci.com/gh/nuxt/eslint-config)
[![npm (scoped with tag)](https://flat.badgen.net/npm/v/@nuxtjs/eslint-config)](https://npmjs.com/package/@nuxtjs/eslint-config)
[![npm](https://flat.badgen.net/npm/dt/@nuxtjs/eslint-config)](https://npmjs.com/package/@nuxtjs/eslint-config)

[ESlint](https://eslint.org/) config used for Nuxt.js.

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
> Dont forget to `npm i -D babel-eslint` or `yarn add -D babel-eslint`

```json
{
  "root": true,
  "parserOptions": {
    "parser": "babel-eslint",
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

## Migration guide from v0.x.y to v1.x.y

1. ~~Install the new peer dependencies (`yarn add -D eslint-plugin-unicorn` *or* `npm i -D eslint-plugin-unicorn`)~~
2. Fix issues brought up due to new rules or disable them if needed

## License

Setup inspired by [eslint-config-standard](https://github.com/standard/eslint-config-standard)

MIT - Nuxt.js team
