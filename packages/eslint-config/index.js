require('@rushstack/eslint-patch/modern-module-resolution')

/** @type {import('eslint').ESLint.ConfigData}  */
module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    parser: {
      js: 'espree',
      jsx: 'espree',

      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser'
    },
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    }
  },
  env: { node: true },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:vue/vue3-recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
        // does not work with type definitions.
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn'
      }
    },
    {
      // These pages are not used directly by users so they can have one-word names.
      files: [
        '**/pages/**/*.{js,ts,vue}',
        '**/layouts/**/*.{js,ts,vue}',
        '**/app.{js,ts,vue}',
        '**/error.{js,ts,vue}'
      ],
      rules: { 'vue/multi-word-component-names': 'off' }
    },
    {
      // Pages and layouts are required to have a single root element if transitions are enabled.
      files: ['**/pages/**/*.{js,ts,vue}', '**/layouts/**/*.{js,ts,vue}'],
      rules: { 'vue/no-multiple-template-root': 'error' }
    }
  ]
}
