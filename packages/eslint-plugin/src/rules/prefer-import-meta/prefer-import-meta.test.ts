import { run } from 'eslint-vitest-rule-tester'
import { rule } from './prefer-import-meta'

run({
  name: 'prefer-import-meta',
  rule,
  valid: [
    'import.meta.client',
    'import.meta.server',
    'import.meta.dev',
    'import.meta.test',
    'const x = import.meta.browser',
    'if (import.meta.nitro) {}',
    'process.env.NODE_ENV',
    'process.cwd()',
    'process.exit()',
  ],
  invalid: [
    {
      code: 'process.client',
      output: 'import.meta.client',
      errors: [{
        messageId: 'default',
        data: { suffix: 'client' },
      }],
    },
    {
      code: 'process.server',
      output: 'import.meta.server',
      errors: [{
        messageId: 'default',
        data: { suffix: 'server' },
      }],
    },
    {
      code: 'process.browser',
      output: 'import.meta.browser',
      errors: [{
        messageId: 'default',
        data: { suffix: 'browser' },
      }],
    },
    {
      code: 'process.dev',
      output: 'import.meta.dev',
      errors: [{
        messageId: 'default',
        data: { suffix: 'dev' },
      }],
    },
    {
      code: 'process.test',
      output: 'import.meta.test',
      errors: [{
        messageId: 'default',
        data: { suffix: 'test' },
      }],
    },
    {
      code: 'process.nitro',
      output: 'import.meta.nitro',
      errors: [{
        messageId: 'default',
        data: { suffix: 'nitro' },
      }],
    },
    {
      code: 'process.prerender',
      output: 'import.meta.prerender',
      errors: [{
        messageId: 'default',
        data: { suffix: 'prerender' },
      }],
    },
    {
      code: 'if (process.client) { console.log("client") }',
      output: 'if (import.meta.client) { console.log("client") }',
      errors: [{
        messageId: 'default',
        data: { suffix: 'client' },
      }],
    },
    {
      code: 'const isServer = process.server',
      output: 'const isServer = import.meta.server',
      errors: [{
        messageId: 'default',
        data: { suffix: 'server' },
      }],
    },
  ],
})
