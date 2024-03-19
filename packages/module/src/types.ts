import type { Import } from 'unimport'
import type { ESLintPluginOptions as ViteCheckerOptions } from 'vite-plugin-eslint2'
import type { Options as WebpackCheckerOptions } from 'eslint-webpack-plugin'
import { FlatConfig, NuxtESLintFeaturesOptions } from '@nuxt/eslint-config/flat'
import { Nuxt } from '@nuxt/schema'

export interface ConfigGenOptions extends NuxtESLintFeaturesOptions {}

export interface CheckerOptions {
  /**
   * Use ESLint cache to improve performance
   *
   * @default true
   */
  cache?: boolean

  /**
   * ESLint config type
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
   * Flat config items, should be stringified
   */
  configs?: string[]
}

export type Awaitable<T> = T | Promise<T>

export type ESLintConfigGenAddon = () => Awaitable<ESLintConfigGenAddonResult | void>
