// @ts-check
import { createConfigForNuxt, defineFlatConfigs } from '@nuxt/eslint-config/flat'

export default defineFlatConfigs(
  {
    ignores: [
      'packages-legacy/**',
    ],
  },
  createConfigForNuxt({
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
)
