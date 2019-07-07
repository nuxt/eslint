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

2. Add the [`peerDependencies`](./package.json) to your project

```bash
$ npm i -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-jest eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue eslint-plugin-unicorn
# or
$ yarn add -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-jest eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue eslint-plugin-unicorn
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

## Migration guide from v0.x.y to v1.x.y

1. Install the new peer dependencies (`yarn add -D eslint-plugin-unicorn` *or* `npm i -D eslint-plugin-unicorn`)
2. Fix issues brought up due to new rules or disable them if needed

## License

Setup inspired by [eslint-config-standard](https://github.com/standard/eslint-config-standard)

MIT - Nuxt.js team
