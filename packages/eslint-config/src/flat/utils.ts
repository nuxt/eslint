import { isPackageExists } from 'local-pkg'
import type { NuxtESLintConfigOptions, NuxtESLintConfigOptionsResolved } from '../flat'

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
      nuxt: {},
      ...config.features,
    },
    dirs,
  }

  Object.defineProperty(resolved, '__resolved', { value: true, enumerable: false })

  return resolved
}
