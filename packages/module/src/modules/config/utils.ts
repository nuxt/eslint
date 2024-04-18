import type { Nuxt } from '@nuxt/schema'
import { relative, resolve } from 'pathe'
import type { NuxtESLintConfigOptions } from '@nuxt/eslint-config/flat'

export function getDirs(nuxt: Nuxt): NuxtESLintConfigOptions['dirs'] {
  const dirs: Required<NuxtESLintConfigOptions['dirs']> = {
    pages: [],
    composables: [],
    components: [],
    layouts: [],
    plugins: [],
    middleware: [],
    modules: [],
    servers: [],
    root: [nuxt.options.rootDir],
    src: [],
  }

  for (const layer of nuxt.options._layers) {
    const r = (t: string) => relative(nuxt.options.rootDir, resolve(layer.config.srcDir, t))

    dirs.src.push(r(''))
    dirs.pages.push(r(nuxt.options.dir.pages || 'pages'))
    dirs.layouts.push(r(nuxt.options.dir.layouts || 'layouts'))
    dirs.plugins.push(r(nuxt.options.dir.plugins || 'plugins'))
    dirs.middleware.push(r(nuxt.options.dir.middleware || 'middleware'))
    dirs.modules.push(r(nuxt.options.dir.modules || 'modules'))

    dirs.composables.push(r('composables'))
    dirs.composables.push(r('utils'))
    for (const dir of (layer.config.imports?.dirs ?? [])) {
      if (dir)
        dirs.composables.push(r(dir))
    }

    if (layer.config.components) {
      const options = layer.config.components || {}
      if (options !== true && 'dirs' in options) {
        for (const dir of options.dirs || []) {
          if (typeof dir === 'string')
            dirs.components.push(r(dir))
          else if (dir && 'path' in dir && typeof dir.path === 'string')
            dirs.components.push(r(dir.path))
        }
      }
    }
    else {
      dirs.components.push(r('components'))
    }
  }

  return dirs
}
