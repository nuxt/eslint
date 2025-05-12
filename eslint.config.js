// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import pnpm from 'eslint-plugin-pnpm'
import jsoncParser from 'jsonc-eslint-parser'

export default createConfigForNuxt({
  features: {
    stylistic: true,
    tooling: true,
    formatters: true,
  },
  dirs: {
    src: [
      'playground',
      'docs',
    ],
    componentsPrefixed: [
      'playground/components-prefixed',
    ],
  },
})
  .append(
    {
      files: ['docs/**/*.vue'],
      rules: {
        'vue/no-v-html': 'off',
      },
    },
  )
  .append({
    name: 'pnpm/package.json',
    files: [
      'package.json',
      '**/package.json',
    ],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      pnpm: pnpm,
    },
    rules: {
      'pnpm/json-enforce-catalog': 'error',
      'pnpm/json-valid-catalog': 'error',
      'pnpm/json-prefer-workspace-settings': 'error',
    },
  })
