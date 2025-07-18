import type { Linter } from 'eslint'
import type { NuxtESLintConfigOptions } from '../types'
import { resolveOptions } from '../utils'

export default async function imports(options: NuxtESLintConfigOptions): Promise<Linter.Config[]> {
  const resolved = resolveOptions(options)

  if (resolved.features.import === false) {
    return []
  }

  const importOptions = resolved.features.import === true
    ? {}
    : resolved.features.import || {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugin: any = importOptions.package === 'eslint-plugin-import-lite'
    ? (await import('eslint-plugin-import-lite')).default
    : (await import('eslint-plugin-import-x')).default

  return [
    {
      name: 'nuxt/import/rules',
      plugins: {
        import: plugin,
      },
      rules: {
        ...(importOptions.package === 'eslint-plugin-import-lite'
          ? {
              'import/consistent-type-specifier-style': ['error', 'top-level'],
            }
          : {}),
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
