// @ts-expect-error missing types
import pluginESLint from '@eslint/js'
import type { Linter } from 'eslint'

export default function javascript(): Linter.FlatConfig[] {
  return [
    {
      name: 'eslint:recommended',
      ...pluginESLint.configs.recommended,
    },
  ]
}
