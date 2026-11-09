import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import MonthSelect from './MonthSelect.svelte'

describe('MonthSelect.svelte', () => {
  it('renders select element with all 12 months', async () => {
    const { container } = await render(MonthSelect)

    const selectEl = container.querySelector('wa-select')
    expect(selectEl).not.toBeNull()
    expect(selectEl?.getAttribute('label')).toBe('Mês')

    const options = Array.from(container.querySelectorAll('wa-option'))
    expect(options.length).toBe(12)

    const optionLabels = options.map((opt) => opt.textContent?.trim())
    expect(optionLabels[0]).toBe('Janeiro')
    expect(optionLabels[11]).toBe('Dezembro')
  })

  it('defaults to current month', async () => {
    const expectedMonth = String(new Date().getMonth() + 1)
    const { container } = await render(MonthSelect)

    const selectEl = container.querySelector('wa-select')
    expect(selectEl?.getAttribute('value')).toBe(expectedMonth)
  })

  it('respects initial selectedMonth prop', async () => {
    const { container } = await render(MonthSelect, {
      selectedMonth: 5
    })

    const selectEl = container.querySelector('wa-select')
    expect(selectEl?.getAttribute('value')).toBe('5')
  })

  it('triggers onchange when an option is selected', async () => {
    const onchange = vi.fn()
    const { container } = await render(MonthSelect, {
      selectedMonth: 1,
      onchange
    })

    const selectEl = container.querySelector('wa-select')
    expect(selectEl).not.toBeNull()

    if (selectEl) {
      Object.defineProperty(selectEl, 'value', {
        value: '7',
        writable: true
      })
      selectEl.dispatchEvent(new Event('change', { bubbles: true }))
    }

    expect(onchange).toHaveBeenCalledWith({
      month: { id: 7, name: 'Julho', shortName: 'Jul' }
    })
  })
})
