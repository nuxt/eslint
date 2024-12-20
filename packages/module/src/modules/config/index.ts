import { dirname } from 'node:path'
import fs from 'node:fs/promises'
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

  let _configFile: string = undefined!

  async function writeConfigFile() {
    const addons: ESLintConfigGenAddon[] = [
      ...defaultAddons,
    ]
    await nuxt.callHook('eslint:config:addons', addons)
    const { code, configFile } = await generateESLintConfig(options, nuxt, addons)
    await fs.mkdir(dirname(configFile), { recursive: true })
    await fs.writeFile(configFile, code, 'utf-8')
    _configFile = configFile
  }

  addTemplate({
    filename: 'eslint.config.d.mts',
    write: true,
    getContents() {
      return ESLINT_CONFIG_DTS
    },
  })

  setupDevToolsIntegration(options, nuxt)

  await writeConfigFile()
  nuxt.hook('builder:generateApp', () => {
    writeConfigFile()
  })

  if (autoInit) {
    await initRootESLintConfig(nuxt, _configFile)
  }
}
