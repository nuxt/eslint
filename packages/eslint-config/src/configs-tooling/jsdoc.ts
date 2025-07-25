import type { Linter } from 'eslint'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import { GLOB_SRC, GLOB_VUE } from '../globs'
import { resolveOptions } from '../utils'
import type { NuxtESLintConfigOptions } from '../types'

export default function jsdoc(options: NuxtESLintConfigOptions = {}): Linter.Config[] {
  const resolved = resolveOptions(options)

  return [
    {
      name: 'nuxt/tooling/jsdoc',
      files: [GLOB_SRC, GLOB_VUE],
      plugins: {
        jsdoc: jsdocPlugin,
      },
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/no-defaults': 'warn',
        'jsdoc/no-multi-asterisks': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-yields-check': 'warn',

        ...resolved.features.stylistic
          ? {
              'jsdoc/check-alignment': 'warn',
              'jsdoc/multiline-blocks': 'warn',
            }
          : {},
      },
    },
  ]
}
