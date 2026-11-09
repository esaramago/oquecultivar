import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import CodeBlock from './CodeBlock.svelte'

describe('CodeBlock.svelte', () => {
  it('renders code content, language label, and WebAwesome copy button', async () => {
    const sampleCode = 'pnpm test'
    const { container } = await render(CodeBlock, {
      code: sampleCode,
      language: 'bash'
    })

    await expect.element(page.getByText('bash')).toBeInTheDocument()
    await expect.element(page.getByText(sampleCode)).toBeInTheDocument()

    const copyButton = container.querySelector('wa-copy-button') as
      | (HTMLElement & { value?: string })
      | null
    expect(copyButton).not.toBeNull()
    expect(copyButton?.value).toBe(sampleCode)
  })
})
