import { defineNuxtModule } from '@nuxt/kit'
import { setupConfigGen } from './modules/config'
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
      setupConfigGen(options, nuxt)
    }
    if (options.checker) {
      await import('./modules/checker')
        .then(({ setupESLintChecker }) => {
          setupESLintChecker(options, nuxt)
        })
    }
  },
})
