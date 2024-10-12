export default defineNuxtConfig({
  extends: '@nuxt/ui-pro',

  modules: [
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    '@nuxtjs/plausible',
    'nuxt-og-image',
  ],

  $production: {
    nitro: {
      experimental: {
        wasm: true,
      },
    },
  },

  site: {
    url: 'https://eslint.nuxt.com',
  },

  colorMode: {
    preference: 'dark',
  },

  ui: {
    icons: ['heroicons', 'simple-icons', 'ph'],
  },

  routeRules: {
    '/guide': { redirect: '/guide/getting-started' },
  },

  nitro: {
    prerender: {
      routes: ['/api/search.json'],
      autoSubfolderIndex: false,
    },
  },

  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // Adding all global components to the main entry
    // To avoid lagging during page navigation on client-side
    'components:extend': function (components) {
      for (const comp of components) {
        if (comp.global)
          comp.global = 'sync'
      }
    },
  },

  compatibilityDate: '2024-09-01',
})
