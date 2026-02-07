import { run } from 'eslint-vitest-rule-tester'
import { rule } from './nuxt-config-keys-order'

run({
  name: 'nuxt-config-keys-order',
  rule,
  valid: [
    // Already in correct order
    'export default { modules: [], ssr: true }',
    'export default { extends: [], modules: [], ssr: true }',
    'export default defineNuxtConfig({ modules: [], ssr: true, app: {} })',
    // Single key
    'export default { ssr: true }',
    // Keys in proper order
    `export default {
  extends: [],
  modules: [],
  ssr: true,
  app: {},
  runtimeConfig: {}
}`,
    // With environment-specific config
    `export default {
  modules: [],
  $production: {
    modules: [],
    ssr: true
  }
}`,
    // Unknown keys come after known keys (sorted alphabetically among themselves)
    `export default {
  modules: [],
  customKey1: true,
  customKey2: false
}`,
  ],
  invalid: [
    // Simple wrong order - ssr before modules
    {
      code: 'export default { ssr: true, modules: [] }',
      output: 'export default { modules: [], ssr: true, }',
      errors: [{
        messageId: 'default',
      }],
    },
    // Multiple keys out of order
    {
      code: 'export default { app: {}, modules: [], ssr: true }',
      output: 'export default { modules: [], ssr: true, app: {}, }',
      errors: [{
        messageId: 'default',
      }],
    },
    // With defineNuxtConfig
    {
      code: 'export default defineNuxtConfig({ app: {}, ssr: true, modules: [] })',
      output: 'export default defineNuxtConfig({ modules: [], ssr: true, app: {}, })',
      errors: [{
        messageId: 'default',
      }],
    },
    // Complex config with multiple out-of-order keys
    {
      code: `export default {
  runtimeConfig: {},
  ssr: true,
  modules: [],
  app: {}
}`,
      output: `export default {
  modules: [],
  ssr: true,
  app: {},
  runtimeConfig: {},
}`,
      errors: [{
        messageId: 'default',
      }],
    },
    // Environment-specific config keys out of order
    {
      code: `export default {
  modules: [],
  $production: {
    app: {},
    modules: []
  }
}`,
      output: `export default {
  modules: [],
  $production: {
    modules: [],
    app: {},
  }
}`,
      errors: [{
        messageId: 'default',
      }],
    },
    // Build-related keys
    {
      code: 'export default { nitro: {}, build: {}, modules: [] }',
      output: 'export default { modules: [], build: {}, nitro: {}, }',
      errors: [{
        messageId: 'default',
      }],
    },
    // Dirs and runtime configs
    {
      code: `export default {
  srcDir: './src',
  modules: [],
  runtimeConfig: {}
}`,
      output: `export default {
  modules: [],
  runtimeConfig: {},
  srcDir: './src',
}`,
      errors: [{
        messageId: 'default',
      }],
    },
  ],
})
