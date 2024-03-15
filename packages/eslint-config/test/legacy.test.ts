import { fileURLToPath } from 'node:url'
import { it, expect, describe } from 'vitest'
import { ESLint } from 'eslint'

describe('eslint-config', () => {
  it('loads config in eslint to validate all rule syntax is correct', async () => {
    const cli = new ESLint({
      useEslintrc: false,
      overrideConfigFile: fileURLToPath(new URL('../dist/legacy.cjs', import.meta.url)),
    })

    const code = 'const foo = 1\nconst bar = function () {}\nbar(foo)\n'

    const [{ errorCount }] = await cli.lintText(code, { filePath: 'test.ts' })
    expect(errorCount).toEqual(0)

    const rules = await cli.calculateConfigForFile('test.ts')
    expect(rules.plugins).toContain('vue')
  })
})

