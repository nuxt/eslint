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

  if (fileSingleRoot.length)
    configs.push({
      name: 'nuxt/vue/single-root',
      files: fileSingleRoot,
      rules: {
        'vue/no-multiple-template-root': 'error',
      },
    })

  configs.push({
    name: 'nuxt/rules',
    rules: {
      'nuxt/prefer-import-meta': 'error',
    },
  })

  if (sortConfigKeys) {
    configs.push({
      name: 'nuxt/sort-config',
      files: [
        '**/.config/nuxt.?([cm])[jt]s?(x)',
        '**/nuxt.config.?([cm])[jt]s?(x)',
        resolved.configFile
      ],
      rules: {
        'nuxt/nuxt-config-keys-order': 'error',
      },
    })
  }

  return configs
}
