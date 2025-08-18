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

          // This is technically not a global function, but it's a common practice in nuxt.config.ts,
          // we include it here to avoid false positives.
          defineNuxtConfig: 'readonly',
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
    },
  ]
}
