# Nuxt ESLint Config

[![Build Status](https://travis-ci.org/nuxt/eslint-config.svg?branch=master)](https://travis-ci.org/nuxt/eslint-config)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/eslint-config/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/eslint-config)
[![npm](https://img.shields.io/npm/dt/@nuxtjs/eslint-config.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/eslint-config)

[ESlint](https://eslint.org/) config used for Nuxt.js

## Usage

Do you want to add the config to your own projects? There you go:

1. Add this package to your devDependencies (`npm i -D @nuxtjs/eslint-config` or `yarn add -D @nuxtjs/eslint-config`)
2. Add the [`peerDependencies`](./package.json) to your project

`npm i -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-jest eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue`

3. Create a `.eslintrc.js` file

4. Extend our config (you can use just the scope name as ESLint will assume the `eslint-config` prefix):

```json
{
  "extends": [
    "@nuxtjs"
  ]
}
```


## License

Setup inspired by [eslint-config-standard](https://github.com/standard/eslint-config-standard)

MIT - Nuxt.js team
