import * as parserTs from '@typescript-eslint/parser'
import * as parserVue from 'vue-eslint-parser'
import pluginTs from '@typescript-eslint/eslint-plugin'

// @ts-expect-error missing types
import pluginVue from 'eslint-plugin-vue'

// @ts-expect-error missing types
import pluginESLint from '@eslint/js'
import type { Linter } from 'eslint'

export default function setup(): Linter.FlatConfig[] {
  return [
    {
      ignores: [
        '**/dist',
        '**/node_modules',
        '**/.nuxt',
        '**/.output',
        '**/.vercel',
        '**/.netlify',
      ],
    },
    {
      name: 'nuxt:plugins-setup',
      plugins: {
        '@typescript-eslint': pluginTs as any,
        'vue': pluginVue as any,
      },
    },
    {
      name: 'nuxt:setup',
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
    pluginESLint.configs.recommended,
    {
      name: 'nuxt:typescript',
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      languageOptions: {
        parser: parserTs,
      },
      rules: {
        ...pluginTs.configs['eslint-recommended'].overrides![0].rules,
        ...pluginTs.configs.recommended.rules,
      },
    },
    {
      name: 'nuxt:vue',
      files: [
        '**/*.vue',
      ],
      languageOptions: {
        parser: parserVue,
      },
      processor: pluginVue.processors['.vue'] as any,
      rules: {
        ...pluginVue.configs.base.rules,
        ...pluginVue.configs['vue3-essential'].rules,
        ...pluginVue.configs['vue3-strongly-recommended'].rules,
        ...pluginVue.configs['vue3-recommended'].rules,

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
