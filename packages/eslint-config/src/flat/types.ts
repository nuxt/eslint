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
   * Enable rules for Nuxt module authors or library authors
   *
   * @experimental Changes might not follow semver
   * @default false
   */
  tooling?: boolean

  /**
   * Enable stylistic ESLint rules for formatting and code style check
   *
   * @see https://eslint.style/guide/config-presets
   * @default false
   */
  stylistic?: boolean | StylisticCustomizeOptions<true>

  /**
   * Options for TypeScript setup
   *
   * @default true
   */
  typescript?: boolean | {
    /**
     * Enable strict rules
     * @see https://typescript-eslint.io/users/configs#strict
     * @default true
     */
    strict?: boolean
  }
}

export interface NuxtESLintConfigOptions {
  features?: NuxtESLintFeaturesOptions

  dirs?: {
    /**
     * Nuxt source directory
     */
    src?: string[]

    /**
     * Root directory for nuxt project
     */
    root?: string[]

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
     * Directory for components with prefix
     * Ignore `vue/multi-word-component-names`
     */
    componentsPrefixed?: string[]

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
  }
}

type NotNill<T> = T extends null | undefined ? never : T

export interface NuxtESLintConfigOptionsResolved {
  features: Required<NotNill<NuxtESLintFeaturesOptions>>
  dirs: Required<NotNill<NuxtESLintConfigOptions['dirs']>>
}

export type Awaitable<T> = T | Promise<T>
