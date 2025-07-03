import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import type { NuxtESLintConfigOptions, NuxtESLintConfigOptionsResolved } from './flat'
import type { Awaitable } from './types'

export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: { end: code.length, start: 0 },
      range: [0, code.length],
      tokens: [],
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [],
    },
  }),
}

export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
  if (process.env.CI || !process.stdout.isTTY)
    return

  const nonExistingPackages = packages.filter(i => i && !isPackageExists(i)) as string[]
  if (nonExistingPackages.length === 0)
    return

  const p = await import('@clack/prompts')
  const result = await p.confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  })
  if (result)
    await import('@antfu/install-pkg').then(i => i.installPackage(nonExistingPackages, { dev: true }))
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (resolved as any).default || resolved
}

export function removeUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as T
}

export function resolveOptions(
  config: NuxtESLintConfigOptions,
): NuxtESLintConfigOptionsResolved {
  if ('__resolved' in config) {
    return config as NuxtESLintConfigOptionsResolved
  }

  const dirs = {
    ...config.dirs,
  } as NuxtESLintConfigOptionsResolved['dirs']

  dirs.root ||= ['.', './app'] // Support both Nuxt 3 and 4 conventions by default
  dirs.src ||= dirs.root
  dirs.pages ||= dirs.src.map(src => `${src}/pages`)
  dirs.layouts ||= dirs.src.map(src => `${src}/layouts`)
  dirs.components ||= dirs.src.map(src => `${src}/components`)
  dirs.composables ||= dirs.src.map(src => `${src}/composables`)
  dirs.plugins ||= dirs.src.map(src => `${src}/plugins`)
  dirs.modules ||= dirs.src.map(src => `${src}/modules`)
  dirs.middleware ||= dirs.src.map(src => `${src}/middleware`)
  dirs.servers ||= dirs.src.map(src => `${src}/servers`)
  dirs.componentsPrefixed ||= []

  const resolved: NuxtESLintConfigOptionsResolved = {
    features: {
      standalone: true,
      stylistic: false,
      typescript: isPackageExists('typescript'),
      tooling: false,
      formatters: false,
      nuxt: {},
      import: {},
      ...config.features,
    },
    dirs,
  }

  Object.defineProperty(resolved, '__resolved', { value: true, enumerable: false })

  return resolved
}
