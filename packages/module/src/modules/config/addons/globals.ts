import type { Nuxt } from '@nuxt/schema'
import type { Unimport } from 'unimport'
import type { Linter } from 'eslint'
import type { ESLintConfigGenAddon } from '../../../types'

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
          + JSON.stringify(<Linter.Config>{
            name: 'nuxt/import-globals',
            languageOptions: {
              globals: Object.fromEntries((await unimport.getImports()).map(i => [i.as || i.name, 'readonly'])),
            },
          }),
        ],
      }
    },
  }
}
