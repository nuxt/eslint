import * as parserVue from 'vue-eslint-parser'
import * as parserTs from '@typescript-eslint/parser'

// @ts-expect-error missing types
import pluginVue from 'eslint-plugin-vue'
import { FlatConfig, NuxtESLintConfigOptions } from '../types'
import { removeUndefined } from '../utils'

export default function vue(options: NuxtESLintConfigOptions): FlatConfig[] {
  return [
    {
      name: 'nuxt:setup-vue',
      plugins: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        vue: pluginVue as any,
      },
    },
    {
      name: 'nuxt:vue-language-options',
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
          parser: parserTs,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
        // This allows Vue plugin to work with auto imports
        // https://github.com/vuejs/eslint-plugin-vue/pull/2422
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          defineProps: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          reactive: 'readonly',
          ref: 'readonly',
          shallowReactive: 'readonly',
          shallowRef: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly',
        },
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      processor: pluginVue.processors['.vue'] as any,
      rules: removeUndefined({
        ...pluginVue.configs.base.rules,
        ...pluginVue.configs['vue3-essential'].rules,
        ...pluginVue.configs['vue3-strongly-recommended'].rules,
        ...pluginVue.configs['vue3-recommended'].rules,

        // Deprecated in favor of 'vue/block-order'
        'vue/component-tags-order': undefined,
        'vue/block-order': 'warn',

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

        ...(options.features?.stylistic
          ? {}
          : {
              // Disable Vue's default stylistic rules when stylistic is not enabled
              'vue/max-attributes-per-line': undefined,
              'vue/no-multi-spaces': undefined,
              'vue/no-spaces-around-equal-signs-in-attribute': undefined,
              'vue/html-indent': undefined,
              'vue/html-quotes': undefined,
              'vue/multiline-html-element-content-newline': undefined,
            }),
      }),
    },
  ]
}
