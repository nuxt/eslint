// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: true,
    tooling: true,
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
