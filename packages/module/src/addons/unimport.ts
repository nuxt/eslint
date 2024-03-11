import { join } from 'pathe'
import { addTemplate } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import { defineESLintPluginAddon } from '../utils'

export const Unimport = defineESLintPluginAddon((nuxt: Nuxt) => {
  console.warn('[eslint-config] Unimport addon is not yet ready.')

  let dataPath = join(nuxt.options.buildDir, '.unimport.json')
  nuxt.hook('imports:context', (ctx) => {
    dataPath = addTemplate({
      filename: '.unimport.json',
      write: true,
      async getContents() {
        return JSON.stringify(await ctx.getImports(), null, 2)
      },
    }).filename
  })

  return {
    imports: [
      {
        from: 'eslint-plugin-unimport',
        name: 'createUnimportConfig',
      },
      {
        from: 'fs',
        name: 'default',
        as: 'fs',
      },
    ],
    configLines: [
      `createUnimportConfig({`,
      `  getImports() {`,
      `    return JSON.parse(fs.readFileSync(${JSON.stringify(dataPath)}, "utf-8"))`,
      `  }`,
      `}),`,
    ],
  }
})
