import { test, expect } from 'vitest'
import { CLIEngine } from 'eslint'

test.todo('load config in eslint to validate all rule syntax is correct', () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: 'index.js'
  })

  const code = 'const foo = 1\nconst bar = function () {}\nbar(foo)\n'

  expect(cli.executeOnText(code).errorCount).toEqual(0)
})
