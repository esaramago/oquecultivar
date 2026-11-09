import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Grid from './Grid.svelte'

describe('Grid.svelte', () => {
  it('renders with default div tag and l-grid class', async () => {
    const { container } = await render(Grid)
    const gridEl = container.querySelector('.l-grid')

    expect(gridEl).not.toBeNull()
    expect(gridEl?.tagName.toLowerCase()).toBe('div')
  })

  it('applies custom tag, layout CSS variables, and break modifier class', async () => {
    const { container } = await render(Grid, {
      tag: 'section',
      direction: 'column',
      gap: 'l',
      align: 'center',
      justify: 'space-between',
      wrap: true,
      fullWidth: true,
      break: 'small'
    })

    const gridEl = container.querySelector('section.l-grid') as HTMLElement
    expect(gridEl).not.toBeNull()
    expect(gridEl.classList.contains('break--small')).toBe(true)
    expect(gridEl.classList.contains('l-grid--full-width')).toBe(true)

    const styleAttr = gridEl.getAttribute('style') ?? ''
    expect(styleAttr).toContain('--gap: var(--wa-space-l)')
    expect(styleAttr).toContain('--direction: column')
    expect(styleAttr).toContain('--align: center')
    expect(styleAttr).toContain('--justify: space-between')
    expect(styleAttr).toContain('--wrap: wrap')
    await expect.element(page.elementLocator(gridEl)).toBeInTheDocument()
  })
})
