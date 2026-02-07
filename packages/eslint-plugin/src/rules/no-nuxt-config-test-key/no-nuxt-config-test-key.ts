import type { TSESTree as Tree } from '@typescript-eslint/utils'
import { createRule } from '../utils'

type MessageIds = 'default'

type Options = []

export const rule = createRule<MessageIds, Options>({
  name: 'no-nuxt-config-test-key',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow setting `test` key in Nuxt config',
    },
    schema: [],
    messages: {
      default: 'Do not set `test` key in Nuxt config. The test environment is automatically detected.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        let object: Tree.ObjectExpression | undefined
        if (node.declaration.type === 'ObjectExpression') {
          object = node.declaration
        }
        else if (node.declaration.type === 'CallExpression' && node.declaration.arguments[0]?.type === 'ObjectExpression') {
          object = node.declaration.arguments[0]
        }
        if (!object) {
          return
        }

        for (const prop of object.properties) {
          if (
            prop.type === 'Property'
            && prop.key.type === 'Identifier'
            && prop.key.name === 'test'
            && (
              (prop.value.type === 'Literal' && typeof prop.value.value === 'boolean')
              || (prop.value.type === 'Identifier' && (prop.value.name === 'true' || prop.value.name === 'false'))
            )
          ) {
            context.report({
              node: prop,
              messageId: 'default',
            })
          }
        }
      },
    }
  },
})
