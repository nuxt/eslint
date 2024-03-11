import type { ESLint } from 'eslint'
import rules from './rules'

export default {
  meta: {
    name: 'nuxt-module-eslint-config/plugin',
  },
  rules,
} satisfies ESLint.Plugin
