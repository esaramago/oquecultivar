import { page } from 'vitest/browser'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import RegionSelect from './RegionSelect.svelte'

describe('RegionSelect.svelte', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('renders trigger button and dialog with select and locate button', async () => {
    const { container } = await render(RegionSelect)

    const triggerButton = container.querySelector('wa-button')
    expect(triggerButton).not.toBeNull()
    expect(triggerButton?.textContent).toContain('Selecionar distrito')

    const dialogEl = container.querySelector('wa-dialog')
    expect(dialogEl).not.toBeNull()

    const selectEl = container.querySelector('wa-select')
    expect(selectEl).not.toBeNull()

    const locateButton = Array.from(container.querySelectorAll('wa-button')).find((btn) =>
      btn.textContent?.includes('Usar localização atual')
    )
    expect(locateButton).not.toBeUndefined()
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

    const triggerButton = container.querySelector('wa-button')
    expect(triggerButton?.textContent).toContain('Lisboa · Região 3')

    const card = container.querySelector('wa-card')
    expect(card).not.toBeNull()
    expect(card?.textContent).toContain('Região 3')
    expect(card?.textContent).toContain('Lisboa, Setúbal e Vale do Tejo')
  })

  it('restores district from localStorage on mount if no district is pre-selected', async () => {
    localStorage.setItem('oquecultivar_district', 'porto')
    const { container } = await render(RegionSelect)

    const triggerButton = container.querySelector('wa-button')
    expect(triggerButton?.textContent).toContain('Porto · Região 1')

    const card = container.querySelector('wa-card')
    expect(card).not.toBeNull()
    expect(card?.textContent).toContain('Região 1')
    expect(card?.textContent).toContain('Litoral norte e centro')
  })

  it('opens dialog when trigger button is clicked', async () => {
    const { container } = await render(RegionSelect)

    const triggerButton = container.querySelector('wa-button')
    const dialogEl = container.querySelector('wa-dialog') as HTMLElement
    expect(dialogEl.hasAttribute('open')).toBe(false)

    triggerButton?.click()
    await vi.waitFor(() => {
      expect(dialogEl.hasAttribute('open')).toBe(true)
    })
  })
})
