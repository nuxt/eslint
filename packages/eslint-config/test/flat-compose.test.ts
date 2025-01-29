import { describe, expect, it } from 'vitest'
import type { Linter } from 'eslint'
import { createConfigForNuxt } from '../src'

const cwd = process.cwd()

function getFlatConfigDigest(configs: Linter.Config[]) {
  return configs.map((config) => {
    return JSON.parse(JSON.stringify({
      name: config.name,
      files: config.files,
      ignores: config.ignores,
    }).replaceAll(cwd, '<cwd>'))
  })
}

describe('flat config composition', () => {
  it('empty', async () => {
    const configs = await createConfigForNuxt()

    expect(getFlatConfigDigest(configs))
      .toMatchSnapshot()
  })

  it('non-standalone', async () => {
    const configs = await createConfigForNuxt({
      features: {
        standalone: false,
      },
    })

    expect(getFlatConfigDigest(configs))
      .toMatchSnapshot()
  })

  it('custom src dirs', async () => {
    const configs = await createConfigForNuxt({
      dirs: {
        src: ['src1', 'src2'],
      },
    })

    expect(getFlatConfigDigest(configs))
      .toMatchSnapshot()
  })

  it('with stylistic', async () => {
    const configs = await createConfigForNuxt({
      features: {
        stylistic: true,
      },
    })

    expect(getFlatConfigDigest(configs))
      .toMatchSnapshot()
  })
})
