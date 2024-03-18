/* eslint-disable @typescript-eslint/no-unused-vars */
import { Nuxt } from '@nuxt/schema'
import { CheckerOptions, ModuleOptions } from '../module'
import { defineNuxtModule, addVitePlugin, addWebpackPlugin, useLogger } from '@nuxt/kit'
import vitePluginEslint from 'vite-plugin-eslint'
import EslintWebpackPlugin from 'eslint-webpack-plugin'
import { relative } from 'pathe'
import { watch } from 'chokidar'

const logger = useLogger('nuxt:eslint:checker')

export function setupESLintChecker(moduleOptions: ModuleOptions, nuxt: Nuxt) {
  // TODO: maybe support build mode later on
  if (!nuxt.options.dev) {
    return
  }

  const options: CheckerOptions = {
    cache: true,
    include: [`${nuxt.options.srcDir}/**/*.{js,jsx,ts,tsx,vue}`],
    exclude: ['**/node_modules/**', nuxt.options.buildDir],
    eslintPath: 'eslint',
    formatter: 'stylish',
    lintOnStart: true,
    emitWarning: true,
    emitError: true,
    failOnWarning: false,
    failOnError: false,
    ...(typeof moduleOptions.checker === 'boolean' ? {} : moduleOptions.checker || {}),
  }

  const configPaths = [
    '.eslintignore',
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
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

  addVitePlugin(() => vitePluginEslint(options), { server: false })

  addWebpackPlugin(() => {
    const webpackOptions = {
      ...options,
      context: nuxt.options.srcDir,
      files: options.include,
      lintDirtyModulesOnly: !options.lintOnStart,
    }

    delete webpackOptions.include
    delete webpackOptions.lintOnStart

    return new EslintWebpackPlugin(webpackOptions)
  }, { server: false })
}
