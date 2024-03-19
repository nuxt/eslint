import * as parserTs from '@typescript-eslint/parser'
import pluginTs from '@typescript-eslint/eslint-plugin'
import { FlatConfig } from '../types'

export default function typescript(): FlatConfig[] {
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
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      languageOptions: {
        parser: parserTs,
      },
      rules: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...pluginTs.configs['eslint-recommended'].overrides![0].rules as any,
        ...pluginTs.configs.recommended.rules,
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
