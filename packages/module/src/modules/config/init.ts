import fs from 'node:fs/promises'
import { logger } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import { relative, join } from 'pathe'

export async function initRootESLintConfig(nuxt: Nuxt, generateConfigPath: string) {
  const { findUp } = await import('find-up')

  const hasFlatConfig = await findUp(
    [
      'eslint.config.js',
      'eslint.config.mjs',
      'eslint.config.cjs',
      'eslint.config.ts',
      'eslint.config.mts',
      'eslint.config.cts',
    ],
    {
      cwd: nuxt.options.rootDir,
    },
  )

  if (hasFlatConfig)
    return

  const targetPath = join(nuxt.options.rootDir, 'eslint.config.mjs')
  let relativeDistPath = relative(nuxt.options.rootDir, generateConfigPath)
  if (!relativeDistPath.startsWith('./') && !relativeDistPath.startsWith('../'))
    relativeDistPath = './' + relativeDistPath

  await fs.writeFile(
    targetPath,
    [
      '// @ts-check',
      `import withNuxt from '${relativeDistPath}'`,
      '',
      'export default withNuxt(',
      '  // Your custom configs here',
      ')',
      '',
    ].join('\n'),
    'utf-8',
  )

  logger.success(`ESLint config file created at ${targetPath}`)
  logger.info(`If you have .eslintrc or .eslintignore files, you might want to migrate them to the new config file`)
}
