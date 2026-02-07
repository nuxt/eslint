import { RuleTester } from 'eslint'
import { describe, it } from 'vitest'
import { rule } from './no-page-meta-runtime-values'

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
})

describe('no-page-meta-runtime-values', () => {
  it('runs', () => {
    tester.run('no-page-meta-runtime-values', rule as any, {
      valid: [
        // ---- Static values (always fine) ----
        {
          code: `definePageMeta({ layout: 'admin', name: 'home' })`,
        },
        {
          code: `definePageMeta({ layout: false, scrollToTop: true })`,
        },
        {
          code: `definePageMeta({ meta: { title: 'Home', description: 'Welcome' } })`,
        },
        {
          code: 'definePageMeta({ name: `home` })',
        },
        // String middleware references
        {
          code: `definePageMeta({ middleware: ['auth', 'guest'] })`,
        },

        // ---- External variables/imports ARE fine (hoisted by the build) ----
        {
          code: `
            const layout = 'admin'
            definePageMeta({ layout })
          `,
        },
        {
          code: `
            import { PAGE_TITLE } from './constants'
            definePageMeta({ name: PAGE_TITLE })
          `,
        },
        {
          code: `
            import myLayout from './layouts'
            definePageMeta({ layout: myLayout })
          `,
        },
        {
          code: `
            const baseMeta = { layout: 'default' }
            definePageMeta({ ...baseMeta })
          `,
        },
        {
          code: `
            const meta = { layout: 'admin' }
            definePageMeta(meta)
          `,
        },

        // ---- Inline functions for middleware/validate ----
        {
          code: `definePageMeta({ middleware: (to, from) => { return true } })`,
        },
        {
          code: `definePageMeta({ validate: function (route) { return !!route.params.id } })`,
        },
        {
          code: `
            definePageMeta({
              middleware: (to) => {
                const path = to.path
                return path === '/admin'
              }
            })
          `,
        },

        // ---- Composables INSIDE inline functions are fine (they run at navigation time) ----
        {
          code: `
            definePageMeta({
              middleware: () => {
                const route = useRoute()
                return route.path === '/'
              }
            })
          `,
        },
        {
          code: `
            definePageMeta({
              validate: () => {
                const app = useNuxtApp()
                return !!app
              }
            })
          `,
        },
        {
          code: `
            definePageMeta({
              middleware: () => {
                const config = useRuntimeConfig()
                return !!config.public.apiBase
              }
            })
          `,
        },

        // ---- await inside inline function is fine ----
        {
          code: `
            definePageMeta({
              middleware: async (to) => {
                await someCheck()
                return true
              }
            })
          `,
        },

        // ---- this inside a function expression is fine ----
        {
          code: `
            definePageMeta({
              middleware: function () {
                return this
              }
            })
          `,
        },

        // ---- No definePageMeta — nothing to check ----
        {
          code: `const route = useRoute()`,
        },
        {
          code: `const data = ref('hello')`,
        },

        // ---- Non-matching function calls at eager level ----
        {
          code: `definePageMeta({ name: someHelper() })`,
        },
        {
          code: `definePageMeta({ name: t('home') })`,
        },
      ],

      invalid: [
        // ---- Vue composables at eager level ----
        {
          code: `definePageMeta({ layout: ref('admin') })`,
          errors: [{ messageId: 'composableCall', data: { name: 'ref' } }],
        },
        {
          code: `definePageMeta({ title: computed(() => 'hello') })`,
          errors: [{ messageId: 'composableCall', data: { name: 'computed' } }],
        },
        {
          code: `definePageMeta({ data: reactive({ foo: 'bar' }) })`,
          errors: [{ messageId: 'composableCall', data: { name: 'reactive' } }],
        },
        {
          code: `definePageMeta({ data: shallowRef(null) })`,
          errors: [{ messageId: 'composableCall', data: { name: 'shallowRef' } }],
        },

        // ---- Nuxt composables at eager level ----
        {
          code: `definePageMeta({ name: useRoute().name })`,
          errors: [{ messageId: 'composableCall', data: { name: 'useRoute' } }],
        },
        {
          code: `definePageMeta({ title: useI18n().t('home') })`,
          errors: [{ messageId: 'composableCall', data: { name: 'useI18n' } }],
        },
        {
          code: `definePageMeta({ config: useRuntimeConfig() })`,
          errors: [{ messageId: 'composableCall', data: { name: 'useRuntimeConfig' } }],
        },
        {
          code: `definePageMeta({ app: useNuxtApp() })`,
          errors: [{ messageId: 'composableCall', data: { name: 'useNuxtApp' } }],
        },
        {
          code: `definePageMeta({ state: useState('key') })`,
          errors: [{ messageId: 'composableCall', data: { name: 'useState' } }],
        },
        {
          code: `definePageMeta({ cookie: useCookie('token') })`,
          errors: [{ messageId: 'composableCall', data: { name: 'useCookie' } }],
        },

        // ---- Vue lifecycle hooks at eager level ----
        {
          code: `
            definePageMeta({
              middleware: [onMounted(() => console.log('mounted'))]
            })
          `,
          errors: [{ messageId: 'composableCall', data: { name: 'onMounted' } }],
        },

        // ---- inject at eager level ----
        {
          code: `definePageMeta({ value: inject('key') })`,
          errors: [{ messageId: 'composableCall', data: { name: 'inject' } }],
        },

        // ---- this at eager level ----
        {
          code: `definePageMeta({ layout: this.layout })`,
          errors: [{ messageId: 'thisExpression' }],
        },

        // ---- await at eager level ----
        {
          code: `definePageMeta({ title: await getTitle() })`,
          errors: [{ messageId: 'awaitExpression' }],
        },

        // ---- Multiple errors ----
        {
          code: `definePageMeta({ route: useRoute(), data: ref(null) })`,
          errors: [
            { messageId: 'composableCall', data: { name: 'useRoute' } },
            { messageId: 'composableCall', data: { name: 'ref' } },
          ],
        },
      ],
    })
  })
})
