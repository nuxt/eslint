import { join, relative } from 'pathe'
import { GLOB_EXTS } from '../constants'
import type { FlatConfig, NuxtESLintConfigOptions } from '../types'

export default function disables(options: NuxtESLintConfigOptions): FlatConfig[] {
  const dirs = options.dirs ?? {}
  const nestedGlobPattern = `**/*.${GLOB_EXTS}`

  return [
    {
      name: 'nuxt:vue-routes-disables',
      files: [
        relative(dirs.src || '', `app.${GLOB_EXTS}`),
        relative(dirs.src || '', `error.${GLOB_EXTS}`),

        // Layouts and pages are not used directly by users so they can have one-word names.
        ...(dirs.layouts?.map(layoutsDir => join(layoutsDir, nestedGlobPattern)) || []),
        ...(dirs.pages?.map(pagesDir => join(pagesDir, nestedGlobPattern)) || []),

        // These files should have multiple words in their names as they are within subdirectories.
        ...(dirs.components?.map(componentsDir => join(componentsDir, nestedGlobPattern)) || []),
      ],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    // Layouts and pages are required to have a single root element if transitions are enabled.
    {
      name: 'nuxt:vue-single-root',
      files: [
        ...(dirs.layouts?.map(layoutsDir => join(layoutsDir, nestedGlobPattern)) || []),
        ...(dirs.pages?.map(pagesDir => join(pagesDir, nestedGlobPattern)) || []),
      ],
      rules: {
        'vue/no-multiple-template-root': 'error',
      },
    },
  ]
}
