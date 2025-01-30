import pluginImport from 'eslint-plugin-import-x'
import type { Linter } from 'eslint'
import type { NuxtESLintConfigOptions } from '../types'
import { resolveOptions } from '../utils'

export default function imports(options: NuxtESLintConfigOptions): Linter.Config[] {
  const resolved = resolveOptions(options)

  return [
    {
      name: 'nuxt/import/rules',
      plugins: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        import: pluginImport as any,
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',

        ...resolved.features.stylistic
          ? {
              'import/order': 'error',
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ]
}
