import { join } from 'pathe'
import nuxtPlugin from '@nuxt/eslint-plugin'
import type { Linter } from 'eslint'
import type { NuxtESLintConfigOptions } from '../types'
import { GLOB_EXTS } from '../constants'
import { resolveOptions } from '../utils'

export default function nuxt(options: NuxtESLintConfigOptions): Linter.Config[] {
  const resolved = resolveOptions(options)
  const dirs = resolved.dirs

  const fileSingleRoot = [
    ...(dirs.layouts?.map(layoutsDir => join(layoutsDir, `**/*.${GLOB_EXTS}`)) || []),
    ...(dirs.pages?.map(pagesDir => join(pagesDir, `**/*.${GLOB_EXTS}`)) || []),
    ...(dirs.components?.map(componentsDir => join(componentsDir, `**/*.server.${GLOB_EXTS}`)) || []),
  ].sort()

  const {
    sortConfigKeys = !!(options.features?.stylistic),
  } = options.features?.nuxt || {}

  const configs: Linter.Config[] = []

  configs.push({
    name: 'nuxt/setup',
    plugins: {
      nuxt: nuxtPlugin,
    },
    languageOptions: {
      globals: {
        // Nuxt's runtime globals
        $fetch: 'readonly',
      },
    },
  })

  // Pages, layouts and server components must have a single root element
  // (comments count as one) so Nuxt can wrap them in `<Transition>`/`<KeepAlive>`.
  //
  // See documentation:
  // - https://nuxt.com/docs/4.x/directory-structure/app/pages
  // - https://nuxt.com/docs/4.x/directory-structure/app/layouts#enable-layouts
  // - https://nuxt.com/docs/4.x/directory-structure/app/components#standalone-server-components
  if (fileSingleRoot.length)
    configs.push({
      name: 'nuxt/vue/single-root',
      files: fileSingleRoot,
      rules: {
        'vue/no-multiple-template-root': ['error', { disallowComments: true }],
      },
    })

  configs.push({
    name: 'nuxt/rules',
    rules: {
      'nuxt/prefer-import-meta': 'error',
    },
  })

  const filePages = [
    ...(dirs.pages?.map(pagesDir => join(pagesDir, `**/*.${GLOB_EXTS}`)) || []),
  ].sort()

  if (filePages.length) {
    configs.push({
      name: 'nuxt/pages',
      files: filePages,
      rules: {
        'nuxt/no-page-meta-runtime-values': 'error',
      },
    })
  }

  configs.push({
    name: 'nuxt/nuxt-config',
    files: [
      '**/.config/nuxt.?([cm])[jt]s?(x)',
      '**/nuxt.config.?([cm])[jt]s?(x)',
    ],
    rules: {
      'nuxt/no-nuxt-config-test-key': 'error',
    },
  })

  if (sortConfigKeys) {
    configs.push({
      name: 'nuxt/sort-config',
      files: [
        '**/.config/nuxt.?([cm])[jt]s?(x)',
        '**/nuxt.config.?([cm])[jt]s?(x)',
      ],
      rules: {
        'nuxt/nuxt-config-keys-order': 'error',
      },
    })
  }

  return configs
}
