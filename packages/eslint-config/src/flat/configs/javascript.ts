// @ts-expect-error missing types
import pluginESLint from '@eslint/js'
import type { FlatConfigItem } from 'eslint-flat-config-utils'
import globals from 'globals'

export default function javascript(): FlatConfigItem[] {
  return [
    {
      name: 'nuxt:javascript',
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
      ...pluginESLint.configs.recommended,
    },
  ]
}
