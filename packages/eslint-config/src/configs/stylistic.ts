import stylistic from '@stylistic/eslint-plugin'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import { GLOB_SRC, GLOB_VUE } from '../globs'

export default (options?: StylisticCustomizeOptions): Linter.Config => {
  return {
    name: 'nuxt/stylistic',
    files: [GLOB_SRC, GLOB_VUE],
    ...stylistic.configs.customize(options) as Linter,
  }
}
