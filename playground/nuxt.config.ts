export default defineNuxtConfig({
  modules: [
    '../packages/module/src/module',
  ],
  devtools: {
    enabled: true,
  },
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
