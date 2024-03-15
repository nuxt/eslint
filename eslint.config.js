// @ts-check
import { createNuxtESLintFlatConfig } from '@nuxt/eslint-config/flat'

export default [
  {
    ignores: [
      'packages-legacy/**',
    ]
  },
  ...createNuxtESLintFlatConfig({
    dirs: {
      src: 'playground',
      pages: ['playground/pages']
    }
  })
]
