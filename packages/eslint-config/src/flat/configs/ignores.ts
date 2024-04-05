import type { FlatConfigItem } from 'eslint-flat-config-utils'

export default function ignores(): FlatConfigItem[] {
  return [
    {
      ignores: [
        '**/dist',
        '**/node_modules',
        '**/.nuxt',
        '**/.output',
        '**/.vercel',
        '**/.netlify',
      ],
    },
  ]
}
