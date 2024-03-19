import { join, relative } from 'pathe'
import { GLOB_EXTS } from '../constants'
import type { FlatConfig, NuxtESLintConfigOptions } from '../types'

export default function disables(options: NuxtESLintConfigOptions): FlatConfig[] {
  const dirs = options.dirs ?? {}
  const nestedGlobPattern = `**/*.${GLOB_EXTS}`

  const fileRoutes = [
    relative(dirs.src || '', `app.${GLOB_EXTS}`),
    relative(dirs.src || '', `error.${GLOB_EXTS}`),

    // Layouts and pages are not used directly by users so they can have one-word names.
    ...(dirs.layouts?.map(layoutsDir => join(layoutsDir, nestedGlobPattern)) || []),
    ...(dirs.pages?.map(pagesDir => join(pagesDir, nestedGlobPattern)) || []),

    // These files should have multiple words in their names as they are within subdirectories.
    ...(dirs.components?.map(componentsDir => join(componentsDir, nestedGlobPattern)) || []),
  ]

  const configs: FlatConfig[] = []

  if (fileRoutes.length) {
    configs.push({
      name: 'nuxt:vue-routes-disables',
      files: fileRoutes,
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    })
  }

  return configs
}
