import type { FlatConfig, NuxtESLintConfigOptions } from './types'
import disables from './configs/disables'
import nuxt from './configs/nuxt'
import base from './configs/base'
import javascript from './configs/javascript'
import typescript from './configs/typescript'
import vue from './configs/vue'

export * from './types'

export function createNuxtESLintFlatConfig(options: NuxtESLintConfigOptions = {}): FlatConfig[] {
  const items: FlatConfig[] = []

  if (options.features?.standalone !== false) {
    items.push(...base())
    items.push(...javascript())
    items.push(...typescript())
    items.push(...vue())
  }

  items.push(...nuxt(options))
  items.push(...disables(options))

  return items
}
