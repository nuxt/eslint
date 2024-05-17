import type { Linter } from 'eslint'
import { configs } from 'eslint-plugin-regexp'

export default function regexp(): Linter.FlatConfig[] {
  return [
    {
      ...configs['flat/recommended'] as Linter.FlatConfig,
      name: 'nuxt/tooling/regexp',
    },
  ]
}
