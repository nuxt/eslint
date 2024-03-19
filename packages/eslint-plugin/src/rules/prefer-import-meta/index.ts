import { AST_NODE_TYPES } from '@typescript-eslint/types'
import { createRule } from '../utils'

type MessageIds = 'default'

type Options = []

const processSuffixes = new Set([
  'client',
  'browser',
  'server',
  'nitro',
  'dev',
  'test',
  'prerender',
])

export const rule = createRule<MessageIds, Options>({
  name: 'prefer-import-meta',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer using `import.meta.*` over `process.*`',
    },
    schema: [],
    messages: {
      default: 'Replace `process.{{ suffix }}` with `import.meta.{{ suffix }}`.',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create: context => ({
    MemberExpression: (node) => {
      if (
        node.object.type === AST_NODE_TYPES.Identifier
        && node.object.name === 'process'
        && node.property.type === AST_NODE_TYPES.Identifier
        && processSuffixes.has(node.property.name)
      ) {
        const suffix = node.property.name

        context.report({
          node,
          messageId: 'default',
          data: {
            suffix,
          },
          fix: fixer => fixer.replaceText(node, `import.meta.${suffix}`),
        })
      }
    },
  }),
})
