import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import CultureAutocomplete from './CultureAutocomplete.svelte'
import type { CultureRecord } from '@/types/cultivo'

const mockCultures: CultureRecord[] = [
  {
    id: 'culture-1',
    name: 'Alface',
    variant: 'Quatro Estações',
    type: 'leaf',
    slug: 'alface-quatro-estacoes',
    created: '2026-01-01',
    updated: '2026-01-01'
  },
  {
    id: 'culture-2',
    name: 'Tomate',
    variant: 'Coração de Boi',
    type: 'fruit',
    slug: 'tomate-coracao-de-boi',
    created: '2026-01-01',
    updated: '2026-01-01'
  },
  {
    id: 'culture-3',
    name: 'Cenoura',
    variant: '',
    type: 'root',
    slug: 'cenoura',
    created: '2026-01-01',
    updated: '2026-01-01'
  }
]

describe('CultureAutocomplete.svelte', () => {
  it('renders input element with label Cultura and search icon', async () => {
    const { container } = await render(CultureAutocomplete, {
      cultures: mockCultures
    })

    const inputEl = container.querySelector('wa-input')
    expect(inputEl).not.toBeNull()
    expect(inputEl?.getAttribute('label')).toBe('Cultura')
    expect(inputEl?.getAttribute('placeholder')).toBe('Pesquisar cultura...')

    const icon = inputEl?.querySelector('wa-icon')
    expect(icon?.getAttribute('name')).toBe('magnifying-glass')
  })

  it('renders pre-selected culture card when selectedCultureId is provided', async () => {
    const { container } = await render(CultureAutocomplete, {
      cultures: mockCultures,
      selectedCultureId: 'culture-1'
    })

    const card = container.querySelector('wa-card')
    expect(card).not.toBeNull()
    expect(card?.textContent).toContain('Alface')
    expect(card?.textContent).toContain('Quatro Estações')
    expect(card?.textContent).toContain('Folha')
  })

  it('opens dropdown and displays filtered options on input', async () => {
    const { container } = await render(CultureAutocomplete, {
      cultures: mockCultures
    })

    const inputEl = container.querySelector('wa-input')
    expect(inputEl).not.toBeNull()

    if (inputEl) {
      Object.defineProperty(inputEl, 'value', {
        value: 'Tomate',
        writable: true
      })
      inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    }

    await vi.waitFor(() => {
      const items = Array.from(container.querySelectorAll('wa-dropdown-item'))
      expect(items.length).toBe(1)
      expect(items[0]?.textContent).toContain('Tomate')
      expect(items[0]?.textContent).toContain('Coração de Boi')
    })
  })

  it('filters accent-insensitively (e.g. feijao matches Feijão)', async () => {
    const culturesWithAccents: CultureRecord[] = [
      ...mockCultures,
      {
        id: 'culture-4',
        name: 'Feijão Verde',
        variant: 'Rasteiro',
        type: 'legume',
        slug: 'feijao-verde-rasteiro',
        created: '2026-01-01',
        updated: '2026-01-01'
      }
    ]

    const { container } = await render(CultureAutocomplete, {
      cultures: culturesWithAccents
    })

    const inputEl = container.querySelector('wa-input')
    if (inputEl) {
      Object.defineProperty(inputEl, 'value', {
        value: 'feijao',
        writable: true
      })
      inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    }

    await vi.waitFor(() => {
      const items = Array.from(container.querySelectorAll('wa-dropdown-item'))
      expect(items.length).toBe(1)
      expect(items[0]?.textContent).toContain('Feijão Verde')
    })
  })

  it('shows empty message when no cultures match query', async () => {
    const { container } = await render(CultureAutocomplete, {
      cultures: mockCultures
    })

    const inputEl = container.querySelector('wa-input')
    if (inputEl) {
      Object.defineProperty(inputEl, 'value', {
        value: 'xyznonexistent',
        writable: true
      })
      inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    }

    await vi.waitFor(() => {
      const card = container.querySelector('wa-card')
      expect(card?.textContent).toContain('Nenhuma cultura encontrada.')
    })
  })

  it('selects culture when clicking an item and triggers callbacks', async () => {
    const onselect = vi.fn()
    const onchange = vi.fn()

    const { container } = await render(CultureAutocomplete, {
      cultures: mockCultures,
      onselect,
      onchange
    })

    const inputEl = container.querySelector('wa-input')
    if (inputEl) {
      Object.defineProperty(inputEl, 'value', {
        value: 'Cenoura',
        writable: true
      })
      inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    }

    await vi.waitFor(() => {
      const item = container.querySelector('wa-dropdown-item')
      expect(item).not.toBeNull()
    })

    const item = container.querySelector('wa-dropdown-item')
    item?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(onselect).toHaveBeenCalledWith({
      culture: expect.objectContaining({ id: 'culture-3', name: 'Cenoura' })
    })
    expect(onchange).toHaveBeenCalledWith({
      culture: expect.objectContaining({ id: 'culture-3', name: 'Cenoura' })
    })
  })

  it('clears selection on clear event', async () => {
    const onchange = vi.fn()

    const { container } = await render(CultureAutocomplete, {
      cultures: mockCultures,
      selectedCultureId: 'culture-2',
      onchange
    })

    const inputEl = container.querySelector('wa-input')
    inputEl?.dispatchEvent(new CustomEvent('wa-clear', { bubbles: true }))

    expect(onchange).toHaveBeenCalledWith({ culture: null })
  })
})
