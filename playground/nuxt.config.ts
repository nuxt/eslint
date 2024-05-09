export default defineNuxtConfig({
  modules: [
    '../packages/module/src/module',
  ],
  devtools: {
    enabled: true,
  },
  components: [
    '~/components',
    { path: '~/components-prefixed', prefix: 'Prefix' },
  ],
  eslint: {
    config: {
      stylistic: true,
    },
    checker: {
      lintOnStart: true,
      fix: true,
    },
  },
})
