import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/module.ts',
    'src/config.ts',
    'src/plugin.ts',
  ],
  rollup: {
    emitCJS: true,
  },
})
