const eslint = require('eslint')

test.skip('load config in eslint to validate all rule syntax is correct', () => {
  const CLIEngine = eslint.CLIEngine

  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: 'index.js'
  })

  const code = 'const foo = 1\nconst bar = function () {}\nbar(foo)\n'

  expect(cli.executeOnText(code).errorCount).toEqual(0)
})
