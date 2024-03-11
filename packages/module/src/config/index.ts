import type { FlatConfig, NuxtESLintConfigOptions } from './types'
import setup from './parts/setup'
import disables from './parts/disables'
import nuxt from './parts/nuxt'

export function createBasicNuxtConfig(options: NuxtESLintConfigOptions = {}): FlatConfig[] {
  const items: FlatConfig[] = []

  if (options.features?.standalone !== false)
    items.push(...setup())

  items.push(...nuxt())
  items.push(...disables(options))

  return items
}
