module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/recommended'
  ],
  plugins: [
    'jest',
    'unicorn',
    'vue'
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] }
    }
  },
  rules: {

    /**********************/
    /* General Code Rules */
    /**********************/

    // Enforce import order
    'import/order': 'error',

    // Imports should come first
    'import/first': 'error',

    // Other import rules
    'import/no-mutable-exports': 'error',

    // Allow unresolved imports
    'import/no-unresolved': 'off',

    // Allow paren-less arrow functions only when there's no braces
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

    // Allow async-await
    'generator-star-spacing': 'off',

    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Prefer const over let
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],

    // No single if in an "else" block
    'no-lonely-if': 'error',

    // Force curly braces for control flow,
    // including if blocks with a single statement
    curly: ['error', 'all'],

    // No async function without await
    'require-await': 'error',

    // Force dot notation when possible
    'dot-notation': 'error',

    'no-var': 'error',

    // Force object shorthand where possible
    'object-shorthand': 'error',

    // No useless destructuring/importing/exporting renames
    'no-useless-rename': 'error',

    /**********************/
    /*   Unicorn Rules    */
    /**********************/

    // Pass error message when throwing errors
    'unicorn/error-message': 'error',

    // Uppercase regex escapes
    'unicorn/escape-case': 'error',

    // Use "new" for most builtins (not String, Number, ..., though)
    'unicorn/new-for-builtins': 'error',

    // Array.isArray instead of instanceof
    'unicorn/no-array-instanceof': 'error',

    // for-of instead traditional for loop
    'unicorn/no-for-loop': 'error',

    // Prevent deprecated `new Buffer()`
    'unicorn/no-new-buffer': 'error',

    // Keep regex literals safe!
    'unicorn/no-unsafe-regex': 'off',

    // Use non-fraction numbers if possible, e.g. 1 instead of 1.0
    'unicorn/no-zero-fractions': 'error',

    // Lowercase number formatting for octal, hex, binary (0x12 instead of 0X12)
    'unicorn/number-literal-case': 'error',

    // ** instead of Math.pow()
    'unicorn/prefer-exponentiation-operator': 'error',

    // includes over indexOf when checking for existence
    'unicorn/prefer-includes': 'error',

    // append over appendChild
    'unicorn/prefer-node-append': 'error',

    // remove over removeChild
    'unicorn/prefer-node-remove': 'error',

    // querySelector instead of getElementBy...
    'unicorn/prefer-query-selector': 'error',

    // String methods startsWith/endsWith instead of more complicated stuff
    'unicorn/prefer-starts-ends-with': 'error',

    // textContent instead of innerText
    'unicorn/prefer-text-content': 'error',

    // Enforce throwing type error when throwing error while checking typeof
    'unicorn/prefer-type-error': 'error',

    // Favor regex shorthands (e.g. \d instead of [0-9])
    'unicorn/regex-shorthand': 'error',

    // Use new when throwing error
    'unicorn/throw-new-error': 'error',

    /**********************/
    /*     Vue Rules      */
    /**********************/

    // Disable template errors regarding invalid end tags
    'vue/no-parsing-error': ['error', {
      'x-invalid-end-tag': false
    }],

    // Maximum 5 attributes per line instead of one
    'vue/max-attributes-per-line': ['error', {
      'singleline': 5
    }]
  }
}
