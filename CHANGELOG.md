# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [10.0.0](https://github.com/nuxt/eslint-config/compare/v1.0.1...v10.0.0) (2022-05-02)


### Bug Fixes

* add missing dependency `eslint-plugin-n` ([022aa5f](https://github.com/nuxt/eslint-config/commit/022aa5f69c260242db89d9b4b08ed80de74b2928))
* add missing peer dependency `eslint-plugin-import` (resolves [#148](https://github.com/nuxt/eslint-config/issues/148)) ([80f0b89](https://github.com/nuxt/eslint-config/commit/80f0b89f6de7f5723c117d4a5554fae2bf7f9606))
* disable `vue/multi-word-component-names` for `app.vue` and `error.vue` (resolves [#201](https://github.com/nuxt/eslint-config/issues/201)) ([bbb0e27](https://github.com/nuxt/eslint-config/commit/bbb0e27b5d1b5a7f995f0a352baa5fce88669dc5))
* disable multiword-rule ([#190](https://github.com/nuxt/eslint-config/issues/190)) ([821057e](https://github.com/nuxt/eslint-config/commit/821057e36dab67caf8052a4282df42ea25e61f3a))
* **eslint-config-typescript:** use parser config ([7617549](https://github.com/nuxt/eslint-config/commit/7617549147d16018ed46a073bffff920b89e1bfb))
* eslint-plugin-import ordering errors in windows ([39ad2b4](https://github.com/nuxt/eslint-config/commit/39ad2b46da470198f71ba111ee23d9b037a49a75))
* eslint-plugin-import ordering errors in windows ([4f6f4a9](https://github.com/nuxt/eslint-config/commit/4f6f4a9566149e438bfdf9046f82151e050d7ce7))
* remove dependency on `eslint-plugin-standard` ([#185](https://github.com/nuxt/eslint-config/issues/185)) ([ee47f83](https://github.com/nuxt/eslint-config/commit/ee47f83e45497354c7002c30a2374a7941bc7ee8))
* turn off typescript 'no-undef' rule per docs ([#144](https://github.com/nuxt/eslint-config/issues/144)) ([ddb552b](https://github.com/nuxt/eslint-config/commit/ddb552bb76b4f379f9f23827ccdf8708be12ad27))
* **typescript:** import/named errors when using TypeScript ([#170](https://github.com/nuxt/eslint-config/issues/170)) ([401d626](https://github.com/nuxt/eslint-config/commit/401d6262eed320465b3fb3eb8a0067fc8bf935b3))
* use @typescript-eslint/parser under vue-eslint-parser ([bea5b05](https://github.com/nuxt/eslint-config/commit/bea5b052e322d8c59bdef96d90300d3dda28ed9c))


* feat!: remove `eslint-plugin-jest` dependency (resolves #180) ([952edbb](https://github.com/nuxt/eslint-config/commit/952edbba907501933b71e725d6a668b2870a7d9b)), closes [#180](https://github.com/nuxt/eslint-config/issues/180)


### Features

* update eslint config packages ([a3bb0bf](https://github.com/nuxt/eslint-config/commit/a3bb0bfb923f18fd11447e048a29d11f29a3aa75))
* warn console and debugger in dev ([#56](https://github.com/nuxt/eslint-config/issues/56)) ([425a8fa](https://github.com/nuxt/eslint-config/commit/425a8fa4e19d62455a0e37b6cbfc232c96c1a381))


### BREAKING CHANGES

* You have to manually add jest plugin and `jest/globals` to the `env` object in eslint config
