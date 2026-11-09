import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import RegionSelect from './RegionSelect.svelte'

describe('RegionSelect.svelte', () => {
  it('renders select element and locate button', async () => {
    const { container } = await render(RegionSelect)

    const selectEl = container.querySelector('wa-select')
    expect(selectEl).not.toBeNull()

    const buttonEl = container.querySelector('wa-button')
    expect(buttonEl).not.toBeNull()
    expect(buttonEl?.textContent).toContain('Usar localização atual')
  })

  it('renders district options in alphabetical order', async () => {
    const { container } = await render(RegionSelect)

    const options = Array.from(container.querySelectorAll('wa-option'))
    expect(options.length).toBe(20)

    const optionLabels = options.map((opt) => opt.textContent?.trim())
    expect(optionLabels[0]).toBe('Açores')
    expect(optionLabels[1]).toBe('Aveiro')
    expect(optionLabels[optionLabels.length - 1]).toBe('Viseu')
  })

  it('renders region information when a district is pre-selected', async () => {
    const { container } = await render(RegionSelect, {
      selectedDistrictId: 'lisboa'
    })

    const card = container.querySelector('wa-card')
    expect(card).not.toBeNull()
    expect(card?.textContent).toContain('Região 3')
    expect(card?.textContent).toContain('Lisboa, Setúbal e Vale do Tejo')
  })
})
