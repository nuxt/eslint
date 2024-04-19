import { createRule } from '../utils'

type MessageIds = 'noSince' | 'noJSDoc'

type Options = []

export const rule = createRule<MessageIds, Options>({
  name: 'prefer-import-meta',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require `@since` tag in JSDoc comment.',
    },
    schema: [],
    messages: {
      noSince: 'Missing `@since` tag in JSDoc comment.',
      noJSDoc: 'Missing JSDoc comment.',
    },
  },
  defaultOptions: [],
  create: context => ({
    Program: function (node) {
      // Filter only named and default exports
      const onlyExported = node.body.filter(node => node.type === 'ExportNamedDeclaration' || node.type === 'ExportDefaultDeclaration')

      onlyExported.forEach((exportNode) => {
        // Filter out interfaces and type aliases
        const declarationType = exportNode.declaration?.type
        if (declarationType === 'TSInterfaceDeclaration' || declarationType === 'TSTypeAliasDeclaration') return

        // TODO: Check if it's an override, and the function above has a valid JSDoc

        // Check if the exported node has a leading comment
        const leadingComments = context.sourceCode.getCommentsBefore(exportNode)
        if (!leadingComments.length) {
          // No leading comment, report missing JSDoc
          context.report({
            messageId: 'noJSDoc',
            node: exportNode,
            loc: exportNode.loc,
          })
        }
        else {
          // Check if the leading comment has a valid JSDoc
          const hasValidJsDoc = leadingComments.some((comment) => {
            return comment.type === 'Block' && comment.value.startsWith('*') && comment.value.includes('@since')
          })

          if (!hasValidJsDoc) {
            context.report({
              messageId: 'noSince',
              node: exportNode,
              loc: leadingComments[0].loc,
            })
          }
        }
      })
    },
  }),
})
