import stylistic from '@stylistic/eslint-plugin'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'

export default (options?: StylisticCustomizeOptions<true>): Linter.Config => {
  return {
    name: 'nuxt/stylistic',
    ...stylistic.configs.customize(options) as Linter.Config,
  }
}
