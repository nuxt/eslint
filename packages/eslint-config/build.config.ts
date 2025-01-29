import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/flat.ts',
    'src/index.ts',
  ],
  declaration: true,
})
