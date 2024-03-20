// @ts-check
import createConfig from '@nuxt/eslint-config/flat'

export default [
  {
    ignores: [
      'packages-legacy/**',
    ],
  },
  ...createConfig({
    features: {
      stylistic: true,
    },
    dirs: {
      src: 'playground',
      pages: [
        'playground/pages',
        'docs/pages',
      ],
      layouts: [
        'playground/layouts',
        'docs/layouts',
      ],
      components: [
        'playground/components',
        'docs/components',
      ],
    },
  }),
  {
    files: ['docs/**/*.vue'],
    rules: {
      'vue/no-v-html': 'off',
    },
  },
]
