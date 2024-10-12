export default defineNuxtConfig({
  modules: [
    '../packages/module/src/module',
  ],

  components: [
    '~/components',
    { path: '~/components-prefixed', prefix: 'Prefix' },
  ],

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-07-27',

  eslint: {
    config: {
      // configFile: './eslint.nuxt.config.mjs',
      stylistic: true,
    },
    checker: {
      lintOnStart: true,
      fix: true,
    },
  },
})
