import * as parserTs from '@typescript-eslint/parser'
import pluginTs from '@typescript-eslint/eslint-plugin'
import type { FlatConfigItem } from 'eslint-flat-config-utils'

export default function typescript(): FlatConfigItem[] {
  return [
    {
      name: 'nuxt:setup:typescript',
      plugins: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        '@typescript-eslint': pluginTs as any,
      },
    },
    {
      name: 'nuxt:typescript',
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.vue'],
      languageOptions: {
        parser: parserTs,
      },
      rules: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...pluginTs.configs['eslint-recommended'].overrides![0].rules as any,
        ...pluginTs.configs.recommended.rules,

        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
      },
    },
    {
      name: 'nuxt:typescript-disables',
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.vue'],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
        // does not work with type definitions.
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ]
}
