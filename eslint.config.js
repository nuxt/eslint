// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: true,
    tooling: true,
    formatters: true,
  },
  dirs: {
    src: [
      'playground',
      'docs',
    ],
    componentsPrefixed: [
      'playground/components-prefixed',
    ],
  },
})
  .append(
    {
      files: ['docs/**/*.vue'],
      rules: {
        'vue/no-v-html': 'off',
      },
    },
  )
