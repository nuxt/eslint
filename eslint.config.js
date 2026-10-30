// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import pnpm from 'eslint-plugin-pnpm'
import * as jsoncParser from 'jsonc-eslint-parser'

export default createConfigForNuxt({
  features: {
    stylistic: true,
    tooling: true,
    formatters: true,
    // typescript: {
    //   tsconfigPath: 'tsconfig.json',
    // },
  },
  dirs: {
    src: [
      'playground',
    ],
    componentsPrefixed: [
      'playground/components-prefixed',
    ],
  },
})
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
