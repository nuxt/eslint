import type { Awaitable, FlatConfig, NuxtESLintConfigOptions } from './types'
import disables from './configs/disables'
import nuxt from './configs/nuxt'
import base from './configs/base'
import javascript from './configs/javascript'
import typescript from './configs/typescript'
import vue from './configs/vue'
import stylistic from './configs/stylistic'

export * from './types'

/**
 * Provide type definitions for constructing ESLint flat config items.
 *
 * This function takes flat config item, or an array of them as rest arguments.
 * It also automatically resolves the promise if the config item is a promise.
 */
export async function defineFlatConfigs(...configs: Awaitable<FlatConfig | FlatConfig[]>[]): Promise<FlatConfig[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

/**
 * Create an array of ESLint flat configs for Nuxt 3, based on the given options.
 *
 * Usually it would be use `@nuxt/eslint` module which will generate the necessary configuration based on your project.
 *
 * @see https://eslint.nuxt.com/packages/module
 */
export async function createConfigForNuxt(options: NuxtESLintConfigOptions = {}): Promise<FlatConfig[]> {
  const items: FlatConfig[] = []

  if (options.features?.standalone !== false) {
    items.push(...base())
    items.push(...javascript())
    items.push(...typescript())
    items.push(...vue(options))
  }

  if (options.features?.stylistic) {
    items.push(stylistic(options.features.stylistic === true ? {} : options.features.stylistic))
  }

  items.push(...nuxt(options))
  items.push(...disables(options))

  return items
}
