import type { Linter } from 'eslint'
import { configs } from 'eslint-plugin-regexp'

export default function regexp(): Linter.Config[] {
  return [
    {
      ...configs['flat/recommended'] as Linter.Config,
      name: 'nuxt/tooling/regexp',
    },
  ]
}
