import type { NuxtESLintConfigOptions } from './types'
import disables from './configs/disables'
import nuxt from './configs/nuxt'
import base from './configs/base'
import javascript from './configs/javascript'
import typescript from './configs/typescript'
import vue from './configs/vue'
import stylistic from './configs/stylistic'
import type { FlatConfigItem, ResolvableFlatConfig } from 'eslint-flat-config-utils'
import { FlatConfigPipeline } from 'eslint-flat-config-utils'
import { pipe } from 'eslint-flat-config-utils'

export * from './types'

/**
 * Provide type definitions for constructing ESLint flat config items.
 *
 * This function takes flat config item, or an array of them as rest arguments.
 * It also automatically resolves the promise if the config item is a promise.
 */
export function defineFlatConfigs(
  ...configs: ResolvableFlatConfig[]
): FlatConfigPipeline<FlatConfigItem> {
  return new FlatConfigPipeline().append(...configs)
}

/**
 * Create an array of ESLint flat configs for Nuxt 3, based on the given options.
 *
 * Usually it would be use `@nuxt/eslint` module which will generate the necessary configuration based on your project.
 *
 * @see https://eslint.nuxt.com/packages/module
 */
export function createConfigForNuxt(options: NuxtESLintConfigOptions = {}): FlatConfigPipeline<FlatConfigItem> {
  const pipeline = pipe()

  if (options.features?.standalone !== false) {
    pipeline.append(
      base(),
      javascript(),
      typescript(),
      vue(options),
    )
  }

  if (options.features?.stylistic) {
    pipeline.append(
      stylistic(options.features.stylistic === true ? {} : options.features.stylistic),
    )
  }

  pipeline.append(
    nuxt(options),
    disables(options),
  )

  return pipeline
}
