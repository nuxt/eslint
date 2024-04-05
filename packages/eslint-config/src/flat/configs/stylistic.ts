import stylistic from '@stylistic/eslint-plugin'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

export default (options?: StylisticCustomizeOptions<true>) => {
  return {
    name: 'nuxt/stylistic',
    ...stylistic.configs.customize(options),
  }
}
