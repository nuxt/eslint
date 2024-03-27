// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
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
}).append(
  {
    ignores: [
      'packages-legacy/**',
    ],
  },
  {
    files: ['docs/**/*.vue'],
    rules: {
      'vue/no-v-html': 'off',
    },
  },
)
