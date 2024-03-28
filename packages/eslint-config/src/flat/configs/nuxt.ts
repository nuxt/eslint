import { join } from 'pathe'
import type { NuxtESLintConfigOptions } from '../types'
import nuxtPlugin from '@nuxt/eslint-plugin'
import { GLOB_EXTS } from '../constants'
import type { FlatConfigItem } from 'eslint-flat-config-utils'

export default function nuxt(options: NuxtESLintConfigOptions): FlatConfigItem[] {
  const dirs = options.dirs ?? {}

  const fileSingleRoot = [
    ...(dirs.layouts?.map(layoutsDir => join(layoutsDir, `**/*.${GLOB_EXTS}`)) || []),
    ...(dirs.pages?.map(pagesDir => join(pagesDir, `**/*.${GLOB_EXTS}`)) || []),
  ]

  const configs: FlatConfigItem[] = [
    {
      name: 'nuxt:rules',
      plugins: {
        nuxt: nuxtPlugin,
      },
      rules: {
        'nuxt/prefer-import-meta': 'error',
      },
    },
  ]

  if (fileSingleRoot.length)
    configs.push({
      name: 'nuxt:vue-single-root',
      files: fileSingleRoot,
      rules: {
        'vue/no-multiple-template-root': 'error',
      },
    })

  return configs
}
