import parserTs from '@typescript-eslint/parser'
import pluginTs from '@typescript-eslint/eslint-plugin'
import type { Linter } from 'eslint'
import type { NuxtESLintConfigOptions } from '@nuxt/eslint-config/flat'
import { resolveOptions } from '../utils'

export { parserTs, pluginTs }

export default function typescript(options: NuxtESLintConfigOptions): Linter.Config[] {
  const resolved = resolveOptions(options)

  if (resolved.features.typescript === false) {
    return []
  }

  const tsOptions = resolved.features.typescript === true ? {} : resolved.features.typescript

  return [
    {
      name: 'nuxt/typescript/setup',
      plugins: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        '@typescript-eslint': pluginTs as any,
      },
    },
    {
      name: 'nuxt/typescript/rules',
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

        // Include typescript eslint rules in *.vue files
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
        'constructor-super': 'off', // ts(2335) & ts(2377)
        'getter-return': 'off', // ts(2378)
        'no-const-assign': 'off', // ts(2588)
        'no-dupe-args': 'off', // ts(2300)
        'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
        'no-dupe-keys': 'off', // ts(1117)
        'no-func-assign': 'off', // ts(2539)
        'no-import-assign': 'off', // ts(2539) & ts(2540)
        'no-new-symbol': 'off', // ts(7009)
        'no-obj-calls': 'off', // ts(2349)
        'no-redeclare': 'off', // ts(2451)
        'no-setter-return': 'off', // ts(2408)
        'no-this-before-super': 'off', // ts(2376)
        'no-undef': 'off', // ts(2304)
        'no-unreachable': 'off', // ts(7027)
        'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
        'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
        'prefer-const': 'error', // ts provides better types with const
        'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
        'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
        'valid-typeof': 'off', // ts(2367)
        'no-unused-vars': 'off', // ts takes care of this

        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          prefer: 'type-imports',
        }],
        '@typescript-eslint/no-unused-vars': ['error', {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        }],
        '@typescript-eslint/no-import-type-side-effects': 'error',
      },
    },
  ]
}
