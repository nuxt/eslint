import { createRule } from '../utils'

type MessageIds = 'default'

type Options = []

export const rule = createRule<MessageIds, Options>({
  name: 'nuxt-config-keys-order',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer recommended order of Nuxt config properties',
    },
    schema: [],
    messages: {
      default: 'Expected config key "{{a}}" to come before "{{b}}"',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create: context => ({
    // TODO: Implement
  }),
})
