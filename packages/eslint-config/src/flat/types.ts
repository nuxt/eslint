import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

export interface ToolingOptions {
  /**
   * Enable RegExp rules
   *
   * @see https://github.com/ota-meshi/eslint-plugin-regexp
   * @default true
   */
  regexp?: boolean
  /**
   * Enable Unicorn rules
   *
   * @see https://github.com/sindresorhus/eslint-plugin-unicorn
   * @default true
   */
  unicorn?: boolean
  /**
   * Enable jsdoc rules
   *
   * @default true
   */
  jsdoc?: boolean
}

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
  tooling?: boolean | ToolingOptions

  /**
   * Enable stylistic ESLint rules for formatting and code style check
   *
   * @see https://eslint.style/guide/config-presets
   * @default false
   */
  stylistic?: boolean | StylisticOptions

  /**
   * Enable TypeScript support. Can also be an object to config the options.
   *
   * By default it enables automatic when `typescript` is installed in the project.
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

export interface NuxtSpecificStylisticOptions {
  /**
   * Sort keys in nuxt.config to maintain a consistent order
   *
   * @default true
   */
  nuxtConfigSort?: boolean
}

export interface StylisticOptions extends StylisticCustomizeOptions<true>, NuxtSpecificStylisticOptions {}

type NotNill<T> = T extends null | undefined ? never : T

export interface NuxtESLintConfigOptionsResolved {
  features: Required<NotNill<NuxtESLintFeaturesOptions>>
  dirs: Required<NotNill<NuxtESLintConfigOptions['dirs']>>
}

export type Awaitable<T> = T | Promise<T>
