import { Nuxt } from '@nuxt/schema'
import { CheckerOptions, ModuleOptions } from '../module'
import { addVitePlugin, addWebpackPlugin, useLogger } from '@nuxt/kit'
import { relative, resolve } from 'pathe'
import { watch } from 'chokidar'
import { existsSync } from 'fs'
import type { ESLintPluginOptions as ViteCheckerOptions } from 'vite-plugin-eslint2'
import type { Options as WebpackCheckerOptions } from 'eslint-webpack-plugin'

const logger = useLogger('nuxt:eslint:checker')

const flatConfigFiles = [
  'eslint.config.js',
  'eslint.config.mjs',
  'eslint.config.cjs',
]

export async function setupESLintChecker(moduleOptions: ModuleOptions, nuxt: Nuxt) {
  // TODO: maybe support build mode later on
  if (!nuxt.options.dev) {
    return
  }

  const options: CheckerOptions = {
    cache: true,
    include: [`${nuxt.options.srcDir}/**/*.{js,jsx,ts,tsx,vue}`],
    exclude: ['**/node_modules/**', nuxt.options.buildDir],
    lintOnStart: true,
    formatter: 'stylish',
    emitWarning: true,
    emitError: true,
    ...(typeof moduleOptions.checker === 'boolean' ? {} : moduleOptions.checker || {}),
  }

  // When not specified, we try to detect the configType
  options.configType ||= (process.env.ESLINT_USE_FLAT_CONFIG || flatConfigFiles.some(file => existsSync(resolve(nuxt.options.rootDir, file))))
    ? 'flat'
    : 'eslintrc'

  // Vite: https://github.com/ModyQyW/vite-plugin-eslint2#eslintpath
  // Webpack: https://github.com/webpack-contrib/eslint-webpack-plugin#configtype
  options.eslintPath ||= options.configType === 'flat'
    ? 'eslint/use-at-your-own-risk'
    : 'eslint'

  const configPaths = [
    '.eslintignore',
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
    ...flatConfigFiles,
  ].map(path => relative(nuxt.options.rootDir, path))

  if (nuxt.options.watch) {
    nuxt.options.watch.push(...configPaths)
  }
  else {
    const watcher = watch(configPaths, { depth: 0 }).on('change', (path: string) => {
      logger.info(`Eslint config changed: ${path}`)
      logger.warn('Please restart the Nuxt server to apply changes or upgrade to latest Nuxt for automatic restart.')
    })
    nuxt.hook('close', () => watcher.close())
  }

  if (nuxt.options.builder === '@nuxt/vite-builder') {
    const vitePluginEslint = await import('vite-plugin-eslint2').then(m => 'default' in m ? m.default : m)
    addVitePlugin(() => {
      const viteOptions: Partial<ViteCheckerOptions> = {
        lintInWorker: true,
        ...options,
        ...options.vite,
      }
      // @ts-expect-error extra vite options
      delete viteOptions.configType
      return vitePluginEslint(viteOptions)
    }, { server: false })
  }
  else if (nuxt.options.builder === '@nuxt/webpack-builder') {
    const EslintWebpackPlugin = await import('eslint-webpack-plugin').then(m => 'default' in m ? m.default : m)

    addWebpackPlugin(() => {
      const webpackOptions: WebpackCheckerOptions = {
        ...options,
        context: nuxt.options.srcDir,
        files: options.include,
        lintDirtyModulesOnly: !options.lintOnStart,
      }

      return new EslintWebpackPlugin(webpackOptions)
    }, { server: false })
  }
  else {
    logger.warn('Unsupported builder ' + nuxt.options.builder + ', ESLint checker is not enabled.')
  }
}
