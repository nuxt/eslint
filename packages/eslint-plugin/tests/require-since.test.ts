import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from '../src/rules/require-jsdoc-since'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('require-since', rule, {
  valid: [
    {
      code: `
        /** @since 1.0.0 */
        function foo() {}
    `,
    },
    {
      code: `
        /**
         * @since 1.0.0
        */
        function foo() {}
    `,
    // TODO: Check overloads
    },
    {
      code: `
        /**
         * This is a comment.
         * @param {string} foo - This is a foo.
         * @since 1.0.0
         */
        function foo(bar) {}
        `,
    },
  ],
  invalid: [
    {
      code: `
        /**
         * This is a comment.
         * @param {string} foo - This is a foo.
         */
        function foo(bar) {}
        `,
      errors: [{ messageId: 'missing' }],
    },
    {
      code: `function foo() {}`,
      errors: [{ messageId: 'missing' }],
    },
  ],
})
