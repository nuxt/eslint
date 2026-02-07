import type { TSESTree as Tree, TSESLint } from '@typescript-eslint/utils'
import { createRule } from '../utils'
import { ORDER_KEYS } from './keys'

type MessageIds = 'default'

type Options = []

export const rule = createRule<MessageIds, Options>({
  name: 'nuxt-config-keys-order',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer recommended order of Nuxt config properties',
    },
    schema: [],
    messages: {
      default: 'Expected config key "{{a}}" to come before "{{b}}"',
    },
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        let object: Tree.ObjectExpression | undefined
        if (node.declaration.type === 'ObjectExpression') {
          object = node.declaration
        }
        else if (node.declaration.type === 'CallExpression' && node.declaration.arguments[0].type === 'ObjectExpression') {
          object = node.declaration.arguments[0]
        }
        if (!object) {
          return
        }

        const hasFixes = sort(context, object)
        if (!hasFixes) {
          const envProps = object.properties.filter(i => i.type === 'Property' && i.key.type === 'Identifier' && i.key.name.startsWith('$')) as Tree.Property[]
          for (const prop of envProps) {
            if (prop.value.type === 'ObjectExpression')
              sort(context, prop.value)
          }
        }
      },
    }
  },
})

function sort(context: TSESLint.RuleContext<MessageIds, Options>, node: Tree.ObjectExpression) {
  return sortAst(
    context,
    node,
    node.properties as Tree.Property[],
    (prop) => {
      if (prop.type === 'Property')
        return getString(prop.key)
      return null
    },
    sortKeys,
  )
}

function sortKeys(a: string, b: string) {
  const indexA = ORDER_KEYS.findIndex(k => typeof k === 'string' ? k === a : k.test(a))
  const indexB = ORDER_KEYS.findIndex(k => typeof k === 'string' ? k === b : k.test(b))
  if (indexA === -1 && indexB !== -1)
    return 1
  if (indexA !== -1 && indexB === -1)
    return -1
  if (indexA < indexB)
    return -1
  if (indexA > indexB)
    return 1
  return a.localeCompare(b)
}

// Ported from https://github.com/gauben/eslint-plugin-command/blob/04efa47a2319a5f9afb395cf0efccc9cb111058d/src/commands/keep-sorted.ts#L138-L144
function sortAst<T extends Tree.Node>(
  context: TSESLint.RuleContext<MessageIds, Options>,
  node: Tree.Node,
  list: T[],
  getName: (node: T) => string | (string | null)[] | null,
  sort: (a: string, b: string) => number = (a, b) => a.localeCompare(b),
  insertComma = true,
) {
  const firstToken = context.sourceCode.getFirstToken(node)!
  const lastToken = context.sourceCode.getLastToken(node)!
  if (!firstToken || !lastToken)
    return false

  if (list.length < 2)
    return false

  const reordered = list.slice()
  const ranges = new Map<typeof list[number], [number, number, string]>()
  const names = new Map<typeof list[number], (string | null)[] | null>()

  const rangeStart = Math.max(
    firstToken.range[1],
    context.sourceCode.getIndexFromLoc({
      line: list[0].loc.start.line,
      column: 0,
    }),
  )

  let rangeEnd = rangeStart
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    let name = getName(item)
    if (typeof name === 'string')
      name = [name]
    names.set(item, name)

    let lastRange = item.range[1]
    const nextToken = context.sourceCode.getTokenAfter(item)
    if (nextToken?.type === 'Punctuator' && nextToken.value === ',')
      lastRange = nextToken.range[1]
    const nextChar = context.sourceCode.getText()[lastRange]

    // Insert comma if it's the last item without a comma
    let text = getTextOf(context.sourceCode, [rangeEnd, lastRange])
    if (nextToken === lastToken && insertComma)
      text += ','

    // Include subsequent newlines
    if (nextChar === '\n') {
      lastRange++
      text += '\n'
    }

    ranges.set(item, [rangeEnd, lastRange, text])
    rangeEnd = lastRange
  }

  const segments: [number, number][] = []
  let segmentStart: number = -1
  for (let i = 0; i < list.length; i++) {
    if (names.get(list[i]) == null) {
      if (segmentStart > -1)
        segments.push([segmentStart, i])
      segmentStart = -1
    }
    else {
      if (segmentStart === -1)
        segmentStart = i
    }
  }
  if (segmentStart > -1 && segmentStart !== list.length - 1)
    segments.push([segmentStart, list.length])

  for (const [start, end] of segments) {
    reordered.splice(
      start,
      end - start,
      ...reordered
        .slice(start, end)
        .sort((a, b) => {
          const nameA: (string | null)[] = names.get(a)!
          const nameB: (string | null)[] = names.get(b)!

          const length = Math.max(nameA.length, nameB.length)
          for (let i = 0; i < length; i++) {
            const a = nameA[i]
            const b = nameB[i]
            if (a == null || b == null || a === b)
              continue
            return sort(a, b)
          }
          return 0
        }),
    )
  }

  const changed = reordered.some((prop, i) => prop !== list[i])
  if (!changed)
    return false

  const newContent = reordered
    .map(i => ranges.get(i)![2])
    .join('')

  // console.log({
  //   reordered,
  //   newContent,
  //   oldContent: ctx.context.sourceCode.text.slice(rangeStart, rangeEnd),
  // })

  context.report({
    node,
    messageId: 'default',
    data: {
      a: names.get(reordered[0])![0]!,
      b: names.get(reordered[1])![0]!,
    },
    fix(fixer) {
      return fixer.replaceTextRange([rangeStart, rangeEnd], newContent)
    },
  })
}

function getTextOf(sourceCode: TSESLint.SourceCode, node?: Tree.Node | Tree.Token | Tree.Range | null) {
  if (!node)
    return ''
  if (Array.isArray(node))
    return sourceCode.text.slice(node[0], node[1])
  return sourceCode.getText(node)
}

function getString(node: Tree.Node): string | null {
  if (node.type === 'Identifier')
    return node.name
  if (node.type === 'Literal')
    return String(node.raw)
  return null
}
