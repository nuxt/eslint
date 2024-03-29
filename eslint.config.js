// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
  dirs: {
    src: [
      'playground',
      'docs',
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
