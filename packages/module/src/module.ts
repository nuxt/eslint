import { defineNuxtModule } from '@nuxt/kit'
import { setupConfigGen } from './modules/config'
import { setupESLintChecker } from './modules/checker'
import { ModuleOptions } from './types'

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
  setup(options, nuxt) {
    if (options.config) {
      setupConfigGen(options, nuxt)
    }
    if (options.checker) {
      setupESLintChecker(options, nuxt)
    }
  },
})
