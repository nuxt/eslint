import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/module.ts',
  ],
  rollup: {
    emitCJS: true,
  },
})
