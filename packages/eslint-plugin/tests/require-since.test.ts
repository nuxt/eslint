import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from '../src/rules/require-jsdoc-since'

const ruleTester = new RuleTester()

ruleTester.run('require-jsdoc-since', rule, {
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
    },
    {
      code: `
        /**
         * This is a comment.
         * @param {string} bar - This is a bar.
         * @since 1.0.0
         */
        function foo(bar) {}
      `,
    },
    // TODO: Check overloads
  ],
  invalid: [
    {
      code: `
        /**
         * This is a comment.
         * @param {string} bar - This is a bar.
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
