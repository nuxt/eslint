import type { Nuxt } from '@nuxt/schema'
import type { Unimport } from 'unimport'
import type { ESLintConfigGenAddon } from '../types'
import type { FlatConfig } from '@nuxt/eslint-config/flat'
import globals from "globals";

export function createAddonGlobals(nuxt: Nuxt): ESLintConfigGenAddon {
  let unimport: Unimport

  nuxt.hook('imports:context', (context) => {
    unimport = context
  })

  return {
    name: 'nuxt:eslint:import-globals',
    async getConfigs() {
      return {
        configs: [
          '// Set globals from imports registry\n'
          + JSON.stringify(<FlatConfig>{
            name: 'nuxt:import-globals',
            languageOptions: {
              globals: {
                ...Object.fromEntries((await unimport.getImports()).map(i => [i.as || i.name, 'readonly'])),
                ...Object.entries(globals.browser).reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {}),
                ...Object.entries(globals.node).reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {})
              }
            },
          }),
        ],
      }
    },
  }
}
