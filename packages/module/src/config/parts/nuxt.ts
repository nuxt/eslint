import type { FlatConfig } from '../types'
import nuxtPlugin from '../../plugin'

export default function nuxt(): FlatConfig[] {
  return [
    {
      name: 'nuxt:rules',
      plugins: {
        nuxt: nuxtPlugin,
      },
      rules: {
        'nuxt/prefer-import-meta': 'error',
      },
    },
  ]
}
