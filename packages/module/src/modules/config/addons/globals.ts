import type { Nuxt } from '@nuxt/schema'
import type { Unimport } from 'unimport'
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
      ].sort((a, b) => 10 * a.from.localeCompare(b.from) + a.name.localeCompare(b.name))

      return {
        configs: [
          [
            '// Set globals from imports registry',
            '{',
            `  name: 'nuxt/import-globals',`,
            '  languageOptions: {',
            `    globals: Object.fromEntries(${JSON.stringify(imports.map(i => i.as || i.name))}.map(i => [i, 'readonly'])),`,
            `  },`,
            '}',
          ].join('\n'),
        ],
      }
    },
  }
}
