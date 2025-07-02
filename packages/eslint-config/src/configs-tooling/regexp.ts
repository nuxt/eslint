import type { Linter } from 'eslint'
import { configs } from 'eslint-plugin-regexp'
import { GLOB_SRC, GLOB_VUE } from '../globs'

export default function regexp(): Linter.Config[] {
  return [
    {
      ...configs['flat/recommended'] as Linter.Config,
      name: 'nuxt/tooling/regexp',
      files: [GLOB_SRC, GLOB_VUE],
    },
  ]
}
