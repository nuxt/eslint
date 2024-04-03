import { join } from 'pathe'
import type { NuxtESLintConfigOptions } from '../types'
import nuxtPlugin from '@nuxt/eslint-plugin'
import { GLOB_EXTS } from '../constants'
import type { FlatConfigItem } from 'eslint-flat-config-utils'
import { resolveOptions } from '../utils'

export default function nuxt(options: NuxtESLintConfigOptions): FlatConfigItem[] {
  const resolved = resolveOptions(options)
  const dirs = resolved.dirs

  const fileSingleRoot = [
    ...(dirs.layouts?.map(layoutsDir => join(layoutsDir, `**/*.${GLOB_EXTS}`)) || []),
    ...(dirs.pages?.map(pagesDir => join(pagesDir, `**/*.${GLOB_EXTS}`)) || []),
  ]

  const configs: FlatConfigItem[] = []

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
    plugins: {
      nuxt: nuxtPlugin,
    },
    rules: {
      'nuxt/prefer-import-meta': 'error',
    },
  })

  return configs
}
