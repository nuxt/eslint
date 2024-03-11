import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index.ts',
  ],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
})
