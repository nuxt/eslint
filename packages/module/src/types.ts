import { Import } from 'unimport'
import type { Options as ViteCheckerOptions } from 'vite-plugin-eslint'
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

export interface CheckerOptions extends ViteCheckerOptions, WebpackCheckerOptions {
  /**
   * Checking matched files on start
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
