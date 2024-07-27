import type { Linter } from 'eslint'

export default function ignores(): Linter.Config[] {
  return [
    {
      ignores: [
        '**/dist',
        '**/node_modules',
        '**/.nuxt',
        '**/.output',
        '**/.vercel',
        '**/.netlify',
        '**/public',
      ],
    },
  ]
}
