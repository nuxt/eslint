import { defineNuxtModule } from '@nuxt/kit'
import type { ModuleOptions } from './types'

export * from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt/eslint',
    configKey: 'eslint',
  },
  defaults: {
    config: true,
    checker: false,
  },
  async setup(options, nuxt) {
    if (options.config) {
      await import('./modules/config')
        .then(({ setupConfigGen }) => setupConfigGen(options, nuxt))
    }
    if (options.checker) {
      // TODO: maybe support build mode later on
      if (nuxt.options.dev) {
        await import('./modules/checker')
          .then(({ setupESLintChecker }) => {
            setupESLintChecker(options, nuxt)
          })
      }
    }
  },
})
