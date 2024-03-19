import { ESLintUtils } from '@typescript-eslint/utils'
import type { Rule } from 'eslint'

export function createRule<
  TMessageIds extends string,
  TOptions extends readonly unknown[],
>(
  rule: Readonly<ESLintUtils.RuleWithMetaAndName<TOptions, TMessageIds>>,
) {
  const _createRule = ESLintUtils.RuleCreator(
    name => `https://eslint.nuxt.com/rules/${name}`,
  )
  return _createRule(rule) as unknown as Rule.RuleModule
}
