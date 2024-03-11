import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/legacy.ts',
    'src/flat.ts',
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
