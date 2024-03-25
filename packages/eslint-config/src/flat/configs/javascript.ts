// @ts-expect-error missing types
import pluginESLint from '@eslint/js'
import type { Linter } from 'eslint'
import globals from 'globals'

export default function javascript(): Linter.FlatConfig[] {
  return [
    {
      name: 'eslint:recommended',
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
      },
      ...pluginESLint.configs.recommended,
    },
  ]
}
