import { rule as preferImportMetaRule } from './prefer-import-meta/prefer-import-meta'
import { rule as nuxtConfigOrderKeysRule } from './nuxt-config-keys-order/nuxt-config-keys-order'
import { rule as noNuxtConfigTestKeyRule } from './no-nuxt-config-test-key/no-nuxt-config-test-key'

export default {
  'prefer-import-meta': preferImportMetaRule,
  'nuxt-config-keys-order': nuxtConfigOrderKeysRule,
  'no-nuxt-config-test-key': noNuxtConfigTestKeyRule,
}
