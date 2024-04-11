import * as parserVue from 'vue-eslint-parser'
import parserTs from '@typescript-eslint/parser'
import INLINE_ELEMENTS from 'eslint-plugin-vue/lib/utils/inline-non-void-elements.json' with { type: 'json' }

// @ts-expect-error missing types
import pluginVue from 'eslint-plugin-vue'
import type { FlatConfigItem } from 'eslint-flat-config-utils'
import type { NuxtESLintConfigOptions } from '../types'
import { removeUndefined, resolveOptions } from '../utils'

export default function vue(options: NuxtESLintConfigOptions): FlatConfigItem[] {
  const resolved = resolveOptions(options)
  const hasTs = resolved.features.typescript !== false

  const {
    indent = 2,
    commaDangle = 'always-multiline',
  } = typeof resolved.features.stylistic === 'boolean' ? {} : resolved.features.stylistic

  return [
    {
      name: 'nuxt/vue/setup',
      plugins: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        vue: pluginVue as any,
      },
      languageOptions: {
        parserOptions: {
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
          parser: hasTs ? parserTs : undefined,
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
      name: 'nuxt/vue/rules',
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

        ...(resolved.features.stylistic
          ? {
              'vue/array-bracket-spacing': ['error', 'never'],
              'vue/arrow-spacing': ['error', { after: true, before: true }],
              'vue/block-spacing': ['error', 'always'],
              'vue/block-tag-newline': [
                'error',
                {
                  multiline: 'always',
                  singleline: 'always',
                },
              ],
              'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
              'vue/html-indent': ['error', indent],
              'vue/html-quotes': ['error', 'double'],
              'vue/comma-dangle': ['error', commaDangle],
              'vue/comma-spacing': ['error', { after: true, before: false }],
              'vue/comma-style': ['error', 'last'],
              'vue/html-comment-content-spacing': [
                'error',
                'always',
                { exceptions: ['-'] },
              ],
              'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
              'vue/keyword-spacing': ['error', { after: true, before: true }],
              'vue/object-curly-newline': 'off',
              'vue/object-curly-spacing': ['error', 'always'],
              'vue/object-property-newline': [
                'error',
                { allowMultiplePropertiesPerLine: true },
              ],
              'vue/one-component-per-file': 'off',
              'vue/operator-linebreak': ['error', 'before'],
              'vue/padding-line-between-blocks': ['error', 'always'],
              'vue/quote-props': ['error', 'consistent-as-needed'],
              'vue/require-default-prop': 'off',
              'vue/space-in-parens': ['error', 'never'],
              'vue/template-curly-spacing': 'error',
              'vue/multiline-html-element-content-newline': ['error', {
                ignoreWhenEmpty: true,
                ignores: ['pre', 'textarea', 'router-link', 'RouterLink', 'nuxt-link', 'NuxtLink', 'u-link', 'ULink', ...INLINE_ELEMENTS],
                allowEmptyLines: false,
              }],
            }
          : {
              // Disable Vue's default stylistic rules when stylistic is not enabled
              'vue/html-closing-bracket-newline': undefined,
              'vue/html-closing-bracket-spacing': undefined,
              'vue/html-indent': undefined,
              'vue/html-quotes': undefined,
              'vue/max-attributes-per-line': undefined,
              'vue/multiline-html-element-content-newline': undefined,
              'vue/mustache-interpolation-spacing': undefined,
              'vue/no-multi-spaces': undefined,
              'vue/no-spaces-around-equal-signs-in-attribute': undefined,
              'vue/singleline-html-element-content-newline': undefined,
            }),
      }),
    },
  ]
}
