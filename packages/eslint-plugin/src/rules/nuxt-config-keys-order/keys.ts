export const OFFICIAL_MODULES = {
  client: [
    'ui',
    'site', // SEO module
    'colorMode',
  ],

  server: [
    'hub',
  ],
}

export const ORDER_KEYS = [
  // Ids
  'appId',
  'buildId',

  // Extends
  'extends',
  'theme',

  // Extensions
  'modules',
  'plugins',

  // Env ($production, $development, $test)
  /^\$/,

  // Nuxt Core Features
  'ssr',
  'pages',
  'components',
  'imports',
  'devtools',

  // Client-side Integrations
  'app',
  'css',
  'vue',
  'router',
  'unhead',
  ...OFFICIAL_MODULES.client,
  'spaLoadingTemplate',

  // Runtime Configs
  'appConfig',
  'runtimeConfig',

  // Dirs
  'dir',
  'rootDir',
  'srcDir',
  'appDir',
  'workspaceDir',
  'serverDir',
  'buildDir',
  'modulesDir',
  'analyzeDir',

  // Resultions
  'alias',
  'extensions',
  'ignore',
  'ignoreOptions',
  'ignorePrefix',

  // Build Pipeline Configs
  'builder',
  'build',
  'generate',
  'routeRules',
  'sourcemap',
  'optimization',

  // Development
  'dev',
  'devServer',
  'watch',
  'watchers',

  // Feature flags
  'future',
  'features',
  'experimental',
  'compatibilityDate',

  // Nitro
  'nitro',
  ...OFFICIAL_MODULES.server,
  'serverHandlers',
  'devServerHandlers',

  // Tooling Integrations
  'vite',
  'webpack',
  'typescript',
  'postcss',

  // Other Integrations
  'test',
  'telemetry',

  // Logging
  'debug',
  'logLevel',

  // Hooks
  'hooks',
]
