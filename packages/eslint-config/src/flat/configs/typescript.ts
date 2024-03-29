import * as parserTs from '@typescript-eslint/parser'
import pluginTs from '@typescript-eslint/eslint-plugin'
import type { FlatConfigItem } from 'eslint-flat-config-utils'
import { resolveOptions } from '../utils'
import type { NuxtESLintConfigOptions } from '@nuxt/eslint-config/flat'

export default function typescript(options: NuxtESLintConfigOptions): FlatConfigItem[] {
  const resolved = resolveOptions(options)

  if (resolved.features.typescript === false) {
    return []
  }

  const tsOptions = resolved.features.typescript === true ? {} : resolved.features.typescript

  return [
    {
      name: 'nuxt:typescript:setup',
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
        ...(tsOptions.strict === false
          ? {}
          : pluginTs.configs.strict.rules),

        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
      },
    },
    {
      name: 'nuxt:typescript:disables',
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
