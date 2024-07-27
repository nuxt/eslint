import type { Nuxt } from '@nuxt/schema'
import type { Unimport } from 'unimport'
import type { Linter } from 'eslint'
import type { ESLintConfigGenAddon } from '../../../types'

export function createAddonGlobals(nuxt: Nuxt): ESLintConfigGenAddon {
  let unimport: Unimport | undefined
  let nitroUnimport: Unimport | undefined

  nuxt.hook('imports:context', (context) => {
    unimport = context
  })

  nuxt.hook('nitro:init', (nitro) => {
    nitroUnimport = nitro.unimport
  })

  return {
    name: 'nuxt:eslint:import-globals',
    async getConfigs() {
      const imports = [
        ...await unimport?.getImports() || [],
        ...await nitroUnimport?.getImports() || [],
      ]

      return {
        configs: [
          '// Set globals from imports registry',
          JSON.stringify(<Linter.Config>{
            name: 'nuxt/import-globals',
            languageOptions: {
              globals: Object.fromEntries(imports.map(i => [i.as || i.name, 'readonly'])),
            },
          }),
        ],
      }
    },
  }
}
