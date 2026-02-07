import { run } from 'eslint-vitest-rule-tester'
import { rule } from './no-nuxt-config-test-key'

run({
  name: 'no-nuxt-config-test-key',
  rule,
  valid: [
    'export default { ssr: true }',
    'export default { app: { head: {} } }',
    'export default defineNuxtConfig({ ssr: true })',
    'export default defineNuxtConfig({ modules: [] })',
    // test key with non-boolean value is allowed
    'export default { test: "string" }',
    'export default { test: 123 }',
    'export default { test: {} }',
    'export default defineNuxtConfig({ test: {} })',
  ],
  invalid: [
    {
      code: 'export default { test: true }',
      errors: [{
        messageId: 'default',
      }],
    },
    {
      code: 'export default { test: false }',
      errors: [{
        messageId: 'default',
      }],
    },
    {
      code: 'export default defineNuxtConfig({ test: true })',
      errors: [{
        messageId: 'default',
      }],
    },
    {
      code: 'export default defineNuxtConfig({ test: false })',
      errors: [{
        messageId: 'default',
      }],
    },
    {
      code: `export default {
  ssr: true,
  test: true,
  modules: []
}`,
      errors: [{
        messageId: 'default',
      }],
    },
    {
      code: `export default defineNuxtConfig({
  app: { head: {} },
  test: false
})`,
      errors: [{
        messageId: 'default',
      }],
    },
  ],
})
