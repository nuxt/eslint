import type { FlatConfigItem, ResolvableFlatConfig, FlatConfigComposer } from 'eslint-flat-config-utils'
import { composer } from 'eslint-flat-config-utils'
import gitignore from 'eslint-config-flat-gitignore'
import type { NuxtESLintConfigOptions } from './types'
import disables from './configs/disables'
import nuxt from './configs/nuxt'
import base from './configs/base'
import javascript from './configs/javascript'
import typescript from './configs/typescript'
import vue from './configs/vue'
import stylistic from './configs/stylistic'
import { resolveOptions } from './utils'
import imports from './configs/import'

export * from './types'

export { resolveOptions }

/**
 * Provide type definitions for constructing ESLint flat config items.
 *
 * This function takes flat config item, or an array of them as rest arguments.
 * It also automatically resolves the promise if the config item is a promise.
 */
export function defineFlatConfigs(
  ...configs: ResolvableFlatConfig[]
): FlatConfigComposer<FlatConfigItem> {
  return composer(...configs)
}

/**
 * Create an array of ESLint flat configs for Nuxt 3, based on the given options.
 *
 * Usually it would be use `@nuxt/eslint` module which will generate the necessary configuration based on your project.
 *
 * @see https://eslint.nuxt.com/packages/module
 */
export function createConfigForNuxt(options: NuxtESLintConfigOptions = {}): FlatConfigComposer<FlatConfigItem> {
  const c = composer()

  const resolved = resolveOptions(options)

  if (resolved.features.standalone !== false) {
    c.append(
      gitignore({ strict: false }),
      base(),
      javascript(),
      typescript(resolved),
      vue(resolved),
      imports(resolved),
    )
  }

  c.append(
    nuxt(resolved),
  )

  if (resolved.features.stylistic) {
    c.append({
      name: 'nuxt/stylistic',
      ...stylistic(
        resolved.features.stylistic === true
          ? {}
          : resolved.features.stylistic,
      ),
    })
  }

  c.append(
    disables(resolved),
  )

  return c
}
