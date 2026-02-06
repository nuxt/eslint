import { rule as preferImportMetaRule } from './prefer-import-meta'
import { rule as nuxtConfigOrderKeysRule } from './nuxt-config-keys-order'
import { rule as noNuxtConfigTestKeyRule } from './no-nuxt-config-test-key'
import { rule as noPageMetaRuntimeValuesRule } from './no-page-meta-runtime-values/index'

export default {
  'prefer-import-meta': preferImportMetaRule,
  'nuxt-config-keys-order': nuxtConfigOrderKeysRule,
  'no-nuxt-config-test-key': noNuxtConfigTestKeyRule,
  'no-page-meta-runtime-values': noPageMetaRuntimeValuesRule,
}
