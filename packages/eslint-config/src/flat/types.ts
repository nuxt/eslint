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

export interface NuxtSpecificOptions {
  /**
   * Sort keys in nuxt.config to maintain a consistent order
   *
   * @default true when `features.stylistic` is enabled
   */
  sortConfigKeys?: boolean
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
  stylistic?: boolean | StylisticCustomizeOptions<true>

  /**
   * Enable formatters to handling formatting for different file types
   *
   * Requires `eslint-plugin-format` to be installed
   *
   * @default false
   */
  formatters?: boolean | OptionsFormatters

  /**
   * Options for Nuxt specific rules
   */
  nuxt?: NuxtSpecificOptions

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

export interface OptionsFormatters {
  /**
   * Enable formatting support for CSS, Less, Sass, and SCSS.
   *
   * Currently only support Prettier.
   */
  css?: 'prettier' | boolean

  /**
   * Enable formatting support for HTML.
   *
   * Currently only support Prettier.
   */
  html?: 'prettier' | boolean

  /**
   * Enable formatting support for XML.
   *
   * Currently only support Prettier.
   */
  xml?: 'prettier' | boolean

  /**
   * Enable formatting support for SVG.
   *
   * Currently only support Prettier.
   */
  svg?: 'prettier' | boolean

  /**
   * Enable formatting support for Markdown.
   *
   * Support both Prettier and dprint.
   *
   * When set to `true`, it will use Prettier.
   */
  markdown?: 'prettier' | 'dprint' | boolean

  /**
   * Enable formatting support for GraphQL.
   */
  graphql?: 'prettier' | boolean

  /**
   * Custom options for Prettier.
   *
   * By default it's controlled by our own config.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prettierOptions?: any

  /**
   * Custom options for dprint.
   *
   * By default it's controlled by our own config.
   */
  dprintOptions?: boolean
}

type NotNill<T> = T extends null | undefined ? never : T

export interface NuxtESLintConfigOptionsResolved {
  features: Required<NotNill<NuxtESLintFeaturesOptions>>
  dirs: Required<NotNill<NuxtESLintConfigOptions['dirs']>>
}

export type Awaitable<T> = T | Promise<T>
