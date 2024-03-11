import type { FlatConfig, NuxtESLintConfigOptions } from './types'
import setup from './configs/setup'
import disables from './configs/disables'
import nuxt from './configs/nuxt'

export * from './types'

export function createNuxtESLintFlatConfig(options: NuxtESLintConfigOptions = {}): FlatConfig[] {
  const items: FlatConfig[] = []

  if (options.features?.standalone !== false)
    items.push(...setup())

  items.push(...nuxt())
  items.push(...disables(options))

  return items
}
