import { Import } from 'unimport'
import type { ESLintPluginOptions as ViteCheckerOptions } from 'vite-plugin-eslint2'
import type { Options as WebpackCheckerOptions } from 'eslint-webpack-plugin'

export interface ConfigGenOptions {
  /**
   * Setup basic JavaScript, TypeScript and Vue plugins and rules.
   *
   * You might want to disable it when you are using other ESLint config that handles the basic setup.
   *
   * @default true
   */
  standalone?: boolean
}

export interface CheckerOptions {
  /**
   * Use ESLint cache to improve performance
   *
   * @default true
   */
  cache?: boolean

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
   * Will cause the module build to fail if there are any errors, based on emitError.
   *
   * @default false
   */
  failOnError?: boolean

  /**
   * Will cause the module build to fail if there are any warnings, based on emitWarning.
   *
   * @default false
   */
  failOnWarning?: boolean

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

export interface ESLintPluginAddon {
  imports: Import[]
  configs: string[]
}
