import type { TSESTree as Tree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/types'
import { createRule } from '../utils'

type MessageIds = 'composableCall' | 'thisExpression' | 'awaitExpression'
type Options = []

/**
 * Non-`use*` APIs from Vue/Nuxt that depend on the component
 * setup context being active. Any `use*()` call is caught separately
 * via the naming convention check.
 *
 * All of these will not work inside `definePageMeta` at the eager (top)
 * level because the macro is extracted into a separate chunk that runs
 * before component setup.
 */
const CONTEXT_APIS = new Set([
  // Vue reactivity (require active effect scope)
  'ref',
  'shallowRef',
  'customRef',
  'computed',
  'reactive',
  'shallowReactive',
  'readonly',
  'shallowReadonly',
  'toRef',
  'toRefs',
  'watch',
  'watchEffect',
  'watchPostEffect',
  'watchSyncEffect',
  'effectScope',
  'onScopeDispose',
  // Vue lifecycle hooks
  'onBeforeMount',
  'onMounted',
  'onBeforeUpdate',
  'onUpdated',
  'onBeforeUnmount',
  'onUnmounted',
  'onActivated',
  'onDeactivated',
  'onErrorCaptured',
  'onRenderTracked',
  'onRenderTriggered',
  'onServerPrefetch',
  // Vue component context
  'inject',
  'getCurrentInstance',
])

/**
 * Matches the Vue composable naming convention: `use` followed by
 * an uppercase letter. This catches both Nuxt built-in composables
 * (useRoute, useNuxtApp, …) and third-party ones (useI18n, useAuth, …)
 * which all require an active setup/app context.
 */
const USE_COMPOSABLE_RE = /^use[A-Z]/

export const rule = createRule<MessageIds, Options>({
  name: 'no-page-meta-runtime-values',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow runtime context values inside `definePageMeta` at the eager level, which is extracted into a separate chunk at build time and runs before component setup',
    },
    schema: [],
    messages: {
      composableCall: '`definePageMeta()` is extracted at build time and runs before component setup. `{{ name }}()` requires a Nuxt/Vue runtime context that is not available here. Move it inside a `middleware` or `validate` function.',
      thisExpression: '`definePageMeta()` is extracted at build time and runs before component setup. `this` is not available in the extracted context.',
      awaitExpression: '`definePageMeta()` is extracted at build time. `await` is not supported inside `definePageMeta`.',
    },
  },
  defaultOptions: [],
  create(context) {
    let definePageMetaNode: Tree.CallExpression | null = null
    // Tracks depth of function boundaries inside definePageMeta.
    // Eager level = 0 means we're directly in the definePageMeta argument.
    // Inside inline functions (middleware, validate) depth >= 1 — those are fine.
    let functionDepth = 0

    function isAtEagerLevel() {
      return definePageMetaNode !== null && functionDepth === 0
    }

    function enterFunction() {
      if (definePageMetaNode)
        functionDepth++
    }

    function exitFunction() {
      if (definePageMetaNode)
        functionDepth--
    }

    return {
      // ---- definePageMeta boundary ----

      CallExpression(node: Tree.CallExpression) {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier
          && node.callee.name === 'definePageMeta'
          && !definePageMetaNode
        ) {
          definePageMetaNode = node
        }
        // Report composable/context-dependent calls at the eager level
        else if (
          isAtEagerLevel()
          && node.callee.type === AST_NODE_TYPES.Identifier
          && (CONTEXT_APIS.has(node.callee.name) || USE_COMPOSABLE_RE.test(node.callee.name))
        ) {
          context.report({
            node,
            messageId: 'composableCall',
            data: { name: node.callee.name },
          })
        }
      },

      'CallExpression:exit'(node: Tree.CallExpression) {
        if (node === definePageMetaNode) {
          definePageMetaNode = null
          functionDepth = 0
        }
      },

      // ---- Track function scopes ----

      ArrowFunctionExpression: enterFunction,
      'ArrowFunctionExpression:exit': exitFunction,
      FunctionExpression: enterFunction,
      'FunctionExpression:exit': exitFunction,
      FunctionDeclaration: enterFunction,
      'FunctionDeclaration:exit': exitFunction,

      // ---- Report eager-level problems ----

      ThisExpression(node: Tree.ThisExpression) {
        if (!isAtEagerLevel())
          return
        context.report({
          node,
          messageId: 'thisExpression',
        })
      },

      AwaitExpression(node: Tree.AwaitExpression) {
        if (!isAtEagerLevel())
          return
        context.report({
          node,
          messageId: 'awaitExpression',
        })
      },
    }
  },
})
