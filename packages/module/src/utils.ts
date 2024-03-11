import type { Import } from 'unimport'

export interface ESLintPluginData {
  imports: Import[]
  configLines: string[]
}

export type ESLintPluginAddon<T> = (options: T) => ESLintPluginData

export function defineESLintPluginAddon<T>(module: ESLintPluginAddon<T>) {
  return module
}
