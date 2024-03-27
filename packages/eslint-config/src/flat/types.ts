import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

export interface NuxtESLintFeaturesOptions {
  /**
   * Setup basic JavaScript, TypeScript and Vue plugins and rules.
   *
   * You might want to disable it when you are using other ESLint config that handles the basic setup.
   *
   * @default true
   */
  standalone?: boolean

  /**
   * Enable stylistic ESLint rules for formatting and code style check
   *
   * @see https://eslint.style/guide/config-presets
   * @default false
   */
  stylistic?: boolean | StylisticCustomizeOptions<true>
}

export interface NuxtESLintConfigOptions {
  features?: NuxtESLintFeaturesOptions

  dirs?: {
    /**
     * Nuxt source directory
     */
    src?: string

    /**
     * Directory for pages
     */
    pages?: string[]

    /**
     * Directory for layouts
     */
    layouts?: string[]

    /**
     * Directory for components
     */
    components?: string[]

    /**
     * Directory for composobles
     */
    composables?: string[]

    /**
     * Directory for plugins
     */
    plugins?: string[]

    /**
     * Directory for modules
     */
    modules?: string[]

    /**
     * Directory for middleware
     */
    middleware?: string[]

    /**
     * Directory for server
     */
    servers?: string[]

    /**
     * Directory for layers
     */
    layers?: string[]
  }
}

export type Awaitable<T> = T | Promise<T>
