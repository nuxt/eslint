import type { ResolvableFlatConfig, FlatConfigComposer } from 'eslint-flat-config-utils'
import { composer } from 'eslint-flat-config-utils'
import gitignore from 'eslint-config-flat-gitignore'
import type { NuxtESLintConfigOptions } from './types'
import disables from './configs/disables'
import nuxt from './configs/nuxt'
import ignores from './configs/ignores'
import javascript from './configs/javascript'
import { resolveOptions } from './utils'

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
): FlatConfigComposer {
  return composer(...configs)
}

/**
 * Create an array of ESLint flat configs for Nuxt 3, based on the given options.
 * Accepts appending user configs as rest arguments from the second argument.
 *
 * For Nuxt apps, it's recommended to use `@nuxt/eslint` module instead, which will generate the necessary configuration based on your project.
 * @see https://eslint.nuxt.com/packages/module
 */
export function createConfigForNuxt(
  options: NuxtESLintConfigOptions = {},
  ...userConfigs: ResolvableFlatConfig[]
): FlatConfigComposer {
  const c = composer()

  const resolved = resolveOptions(options)

  if (resolved.features.standalone !== false) {
    c.append(
      gitignore({ strict: false }),
      ignores(),
      javascript(),
      // Make these imports async, as they are optional and imports plugins
      resolved.features.typescript !== false
        ? import('./configs/typescript').then(m => m.default(resolved))
        : undefined,
      import('./configs/vue').then(m => m.default(resolved)),
      import('./configs/import').then(m => m.default(resolved)),
    )
  }

  c.append(
    nuxt(resolved),
  )

  if (resolved.features.tooling) {
    const toolingOptions = typeof resolved.features.tooling === 'boolean' ? {} : resolved.features.tooling
    c.append(
      toolingOptions.jsdoc !== false && import('./configs-tooling/jsdoc').then(m => m.default(resolved)),
      toolingOptions.unicorn !== false && import('./configs-tooling/unicorn').then(m => m.default()),
      toolingOptions.regexp !== false && import('./configs-tooling/regexp').then(m => m.default()),
    )
  }

  const stylisticOptions = typeof resolved.features.stylistic === 'boolean'
    ? {}
    : resolved.features.stylistic

  if (resolved.features.stylistic) {
    c.append(
      import('./configs/stylistic').then(m => m.default(stylisticOptions)),
    )
  }

  if (resolved.features.formatters) {
    c.append(
      import('./configs/formatters').then(m => m.formatters(resolved.features.formatters, stylisticOptions)),
    )
  }

  c.append(
    disables(resolved),
  )

  if (userConfigs.length > 0) {
    c.append(...userConfigs)
  }

  c
    .setPluginConflictsError()
    .setPluginConflictsError('import', [
      'Different instances of plugin "{{pluginName}}" found in multiple configs:',
      '{{configNames}}.',
      'You might forget to set `standalone: false`.',
      'Please refer to https://eslint.nuxt.com/packages/module#custom-config-presets.',
      '',
    ].join('\n'))

  return c
}

export default createConfigForNuxt
