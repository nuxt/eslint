import { join } from 'pathe'
import { GLOB_EXTS } from '../constants'
import type { NuxtESLintConfigOptions } from '../types'
import type { FlatConfigItem } from 'eslint-flat-config-utils'
import { resolveOptions } from '../utils'

export default function disables(options: NuxtESLintConfigOptions): FlatConfigItem[] {
  const resolved = resolveOptions(options)
  const dirs = resolved.dirs
  const nestedGlobPattern = `**/*.${GLOB_EXTS}`

  const fileRoutes = [
    // These files must have one-word names as they have a special meaning in Nuxt.
    ...dirs.src.flatMap(layersDir => [
      join(layersDir, `app.${GLOB_EXTS}`),
      join(layersDir, `error.${GLOB_EXTS}`),
    ]) || [],

    // Layouts and pages are not used directly by users so they can have one-word names.
    ...(dirs.layouts.map(layoutsDir => join(layoutsDir, nestedGlobPattern)) || []),
    ...(dirs.pages.map(pagesDir => join(pagesDir, nestedGlobPattern)) || []),

    // These files should have multiple words in their names as they are within subdirectories.
    ...(dirs.components.map(componentsDir => join(componentsDir, '*', nestedGlobPattern)) || []),
  ]

  const configs: FlatConfigItem[] = []

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
