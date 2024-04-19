import { createRule } from '../utils'

type MessageIds = 'default'

type Options = []

export const rule = createRule<MessageIds, Options>({
  name: 'prefer-import-meta',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require @since tag in JSDoc comment.',
    },
    schema: [],
    messages: {
      default: 'Missing @since tag in JSDoc comment.',
    },
  },
  defaultOptions: [],
  create: context => ({
    Program: function (node) {
      const sourceCode = context.sourceCode
      const comments = sourceCode.getAllComments()

      comments.forEach((comment) => {
        if (comment.type === 'Block' && comment.value.startsWith('*')) {
          const jsdoc = comment.value.replace(/^\/\*\*|\*\/$/g, '')
          console.warn(jsdoc)
          if (!jsdoc.includes('@since')) {
            context.report({
              messageId: 'default',
              node,
            })
          }
        }
      })
    },
  }),
})
