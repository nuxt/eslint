import type { ESLint } from 'eslint'
import rules from './rules'

export default {
  meta: {
    name: '@nuxt/eslint-plugin',
  },
  rules,
} satisfies ESLint.Plugin
