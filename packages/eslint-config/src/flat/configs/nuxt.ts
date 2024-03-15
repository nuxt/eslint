import { join } from 'pathe'
import type { FlatConfig, NuxtESLintConfigOptions } from '../types'
import nuxtPlugin from '@nuxt/eslint-plugin'
import { GLOB_EXTS } from '../constants'

export default function nuxt(options: NuxtESLintConfigOptions): FlatConfig[] {
  const dirs = options.dirs ?? {}

  const fileSingleRoot = [
    ...(dirs.layouts?.map(layoutsDir => join(layoutsDir, `**/*.${GLOB_EXTS}`)) || []),
    ...(dirs.pages?.map(pagesDir => join(pagesDir, `**/*.${GLOB_EXTS}`)) || []),
  ]

  const configs: FlatConfig[] = [
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
      }
    })


  return configs
}
