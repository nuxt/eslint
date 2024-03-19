export default defineNuxtConfig({
  modules: [
    '../packages/module/src/module',
  ],
  devtools: {
    enabled: true,
  },
  eslint: {
    checker: true,
  },
})
