import { Import } from 'unimport'

export interface ESLintPluginAddon {
  imports: Import[]
  configs: string[]
}
