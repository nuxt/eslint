import type { Import } from 'unimport'
import type { ESLintPluginOptions as ViteCheckerOptions } from 'vite-plugin-eslint2'
import type { Options as WebpackCheckerOptions } from 'eslint-webpack-plugin'
import type { NuxtESLintFeaturesOptions } from '@nuxt/eslint-config/flat'

declare module '@nuxt/schema' {
  interface NuxtHooks {
    /**
     * Called before generating ESLint config, can be used to custom ESLint config integrations
     */
    'eslint:config:addons': (addons: ESLintConfigGenAddon[]) => void
  }
}

export interface ConfigGenOptions extends NuxtESLintFeaturesOptions {
  /**
   * Create `eslint.config.mjs` file automatically if not exists
   *
   * @default true
   */
  autoInit?: boolean
}

export interface CheckerOptions {
  /**
   * Use ESLint cache to improve performance
   *
   * @default true
   */
  cache?: boolean

  /**
   * ESLint config type
   *
   * Default to `flat` unless env `ESLINT_USE_FLAT_CONFIG` is set to `false`
   *
   * @default 'flat'
   */
  configType?: 'flat' | 'eslintrc'

  /**
   * Files to include for linting
   */
  include?: string[]

  /**
   * Files to exclude from linting
   */
  exclude?: string[]

  /**
   * ESLint formatter for the output
   *
   * @see https://eslint.org/docs/user-guide/formatters/
   */
  formatter?: string

  /**
   * Path to the ESLint module
   *
   * @default 'eslint' or 'eslint/use-at-your-own-risk' based on configType
   */
  eslintPath?: string

  /**
   * Lint on start
   *
   * @default true
   */
  lintOnStart?: boolean

  /**
   * The warnings found will printed
   *
   * @default true
   */
  emitWarning?: boolean

  /**
   * The errors found will printed
   *
   * @default true
   */
  emitError?: boolean

  /**
   * Run ESLint fix
   * @default false
   */
  fix?: boolean

  /**
   * Vite specific options
   */
  vite?: ViteCheckerOptions

  /**
   * Webpack specific options
   *
   * @see https://www.npmjs.com/package/eslint-webpack-plugin
   */
  webpack?: WebpackCheckerOptions
}

export interface ModuleOptions {
  /**
   * Options for ESLint flat config generation (.nuxt/eslint.config.mjs)
   */
  config?: ConfigGenOptions | boolean

  /**
   * Enable ESLint checker align with dev server or build process
   * Not enabled by default
   *
   * @default false
   */
  checker?: CheckerOptions | boolean
}

export interface ESLintConfigGenAddonResult {
  /**
   * Imports statements to add to the generated ESLint config
   */
  imports?: Import[]
  /**
   * Flat config items, should be stringified lines
   */
  configs?: string[]
}

export type Awaitable<T> = T | Promise<T>

export type ESLintConfigGenAddon = {
  name: string
  getConfigs: () => Awaitable<ESLintConfigGenAddonResult | undefined>
}
