import pluginImportLite from 'eslint-plugin-import-lite'
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
        import: pluginImportLite as any,
      },
      rules: {
        'import/consistent-type-specifier-style': ['error', 'top-level'],
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',

        ...resolved.features.stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ]
}
