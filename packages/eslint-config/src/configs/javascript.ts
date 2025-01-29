import pluginESLint from '@eslint/js'
import type { Linter } from 'eslint'
import globals from 'globals'

export default function javascript(): Linter.Config[] {
  return [
    {
      ...pluginESLint.configs.recommended,
      name: 'nuxt/javascript',
      languageOptions: {
        ecmaVersion: 2022,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
    },
  ]
}
