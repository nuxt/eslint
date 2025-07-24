import { dirname, join } from 'node:path'
import fs from 'node:fs/promises'
import type { Nuxt } from '@nuxt/schema'
import type { ESLintConfigGenAddon } from '../../types'
import type { ModuleOptions } from '../../module'
import { createAddonGlobals } from './addons/globals'
import { setupDevToolsIntegration } from './devtools'
import { initRootESLintConfig } from './init'
import { generateESLintConfig } from './generate'

export async function setupConfigGen(options: ModuleOptions, nuxt: Nuxt) {
  const {
    autoInit = true,
  } = typeof options.config !== 'boolean' ? options.config || {} : {}

  const defaultAddons = [
    createAddonGlobals(nuxt),
  ]

  nuxt.hook('prepare:types', ({ declarations, nodeReferences }) => {
    declarations.push('/// <reference path="./eslint-typegen.d.ts" />')
    if (nodeReferences)
      nodeReferences.push({ path: join(nuxt.options.buildDir, 'eslint-typegen.d.ts') })
  })

  let _configFile: string = undefined!

  async function writeConfigFile() {
    const addons: ESLintConfigGenAddon[] = [
      ...defaultAddons,
    ]
    await nuxt.callHook('eslint:config:addons', addons)
    const { code, codeDts, configFile } = await generateESLintConfig(options, nuxt, addons)
    await fs.mkdir(dirname(configFile), { recursive: true })
    await fs.writeFile(configFile, code, 'utf-8')
    await fs.writeFile(configFile.replace(/\.mjs$/, '.d.mts'), codeDts, 'utf-8')
    _configFile = configFile
  }

  setupDevToolsIntegration(options, nuxt)

  await writeConfigFile()
  nuxt.hook('builder:generateApp', () => {
    writeConfigFile()
  })

  if (autoInit) {
    await initRootESLintConfig(nuxt, _configFile)
  }
}
