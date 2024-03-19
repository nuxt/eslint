import type { Nuxt } from '@nuxt/schema'
import type { Unimport } from 'unimport'
import type { ESLintConfigGenAddon } from '../types'
import type { FlatConfig } from '@nuxt/eslint-config/flat'

export function createAddonGlobals(nuxt: Nuxt): ESLintConfigGenAddon {
  let unimport: Unimport

  nuxt.hook('imports:context', (context) => {
    unimport = context
  })

  return async () => ({
    configs: [
      '// Set globals from imports registry\n'
      + JSON.stringify(<FlatConfig>{
        name: 'nuxt:import-globals',
        languageOptions: {
          globals: Object.fromEntries((await unimport.getImports()).map(i => [i.as || i.name, 'readonly'])),
        },
      }),
    ],
  })
}
