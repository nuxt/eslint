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
      // configFile: './eslint.nuxt.config.mjs',
      stylistic: true,
    },
    checker: {
      lintOnStart: true,
      fix: true,
    },
  },

  compatibilityDate: '2024-07-27',
})
