import type { FlatConfigItem } from 'eslint-flat-config-utils'

export default function base(): FlatConfigItem[] {
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
