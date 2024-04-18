import { addTemplate } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { ESLintConfigGenAddon } from '../../types'
import type { ModuleOptions } from '../../module'
import { createAddonGlobals } from './addons/globals'
import { setupDevToolsIntegration } from './devtools'
import { initRootESLintConfig } from './init'
import { generateESLintConfig } from './generate'

const ESLINT_CONFIG_DTS = [
  'import type { FlatConfigComposer } from "eslint-flat-config-utils"',
  'import { defineFlatConfigs } from "@nuxt/eslint-config/flat"',
  'import type { NuxtESLintConfigOptionsResolved } from "@nuxt/eslint-config/flat"',
  '',
  'declare const configs: FlatConfigComposer',
  'declare const options: NuxtESLintConfigOptionsResolved',
  'declare const withNuxt: typeof defineFlatConfigs',
  'export default withNuxt',
  'export { withNuxt, defineFlatConfigs, configs, options }',
].join('\n')

export async function setupConfigGen(options: ModuleOptions, nuxt: Nuxt) {
  const {
    autoInit = true,
  } = typeof options.config !== 'boolean' ? options.config || {} : {}

  const defaultAddons = [
    createAddonGlobals(nuxt),
  ]

  nuxt.hook('prepare:types', ({ declarations }) => {
    declarations.push('/// <reference path="./eslint-typegen.d.ts" />')
  })

  const template = addTemplate({
    filename: 'eslint.config.mjs',
    write: true,
    async getContents() {
      const addons: ESLintConfigGenAddon[] = [
        ...defaultAddons,
      ]
      await nuxt.callHook('eslint:config:addons', addons)
      return generateESLintConfig(options, nuxt, addons)
    },
  })

  addTemplate({
    filename: 'eslint.config.d.mts',
    write: true,
    getContents() {
      return ESLINT_CONFIG_DTS
    },
  })

  if (autoInit) {
    await initRootESLintConfig(nuxt, template.dst)
  }

  setupDevToolsIntegration(nuxt)
}
