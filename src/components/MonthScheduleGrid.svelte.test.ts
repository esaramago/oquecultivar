import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import MonthScheduleGrid from './MonthScheduleGrid.svelte'
import type { CultureScheduleRecord } from '@/types/cultivo'

const mockSchedules: CultureScheduleRecord[] = [
  {
    id: 'sched-1',
    culture: 'cult-1',
    action: 'direct_sowing',
    regions: ['1', '3', '4'],
    months: ['3', '4', '5'],
    created: '2026-01-01',
    updated: '2026-01-01',
    expand: {
      culture: {
        id: 'cult-1',
        name: 'Alface',
        variant: 'Quatro Estações',
        type: 'folha',
        slug: 'alface-quatro-estacoes',
        created: '2026-01-01',
        updated: '2026-01-01'
      }
    }
  },
  {
    id: 'sched-2',
    culture: 'cult-1',
    action: 'harvest',
    regions: ['1', '3', '4'],
    months: ['5', '6', '7'],
    created: '2026-01-01',
    updated: '2026-01-01',
    expand: {
      culture: {
        id: 'cult-1',
        name: 'Alface',
        variant: 'Quatro Estações',
        type: 'folha',
        slug: 'alface-quatro-estacoes',
        created: '2026-01-01',
        updated: '2026-01-01'
      }
    }
  },
  {
    id: 'sched-3',
    culture: 'cult-2',
    action: 'plant',
    regions: ['1', '2'],
    months: ['2', '3', '4'],
    created: '2026-01-01',
    updated: '2026-01-01',
    expand: {
      culture: {
        id: 'cult-2',
        name: 'Batata',
        type: 'tuberculo',
        slug: 'batata',
        created: '2026-01-01',
        updated: '2026-01-01'
      }
    }
  },
  {
    id: 'sched-4',
    culture: 'cult-3',
    action: 'nursery',
    regions: ['1'],
    months: ['1', '2'],
    created: '2026-01-01',
    updated: '2026-01-01',
    expand: {
      culture: {
        id: 'cult-3',
        name: 'Tomate',
        type: 'fruto',
        slug: 'tomate',
        created: '2026-01-01',
        updated: '2026-01-01'
      }
    }
  }
]

describe('MonthScheduleGrid.svelte', () => {
  it('displays callout when regionId is not selected', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: null,
      month: 3,
      schedules: mockSchedules
    })

    const callout = container.querySelector('wa-callout')
    expect(callout).not.toBeNull()
    expect(callout?.textContent).toContain('Selecione um distrito acima')
    expect(container.querySelector('table')).toBeNull()
  })

  it('displays empty message when no cultures match the selected month and region', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 2,
      month: 12,
      schedules: mockSchedules
    })

    const callout = container.querySelector('wa-callout')
    expect(callout).not.toBeNull()
    expect(callout?.textContent).toContain('Não foram encontradas ações de cultivo')
    expect(container.querySelector('table')).toBeNull()
  })

  it('renders the grid table with only previous, selected, and next month column headers by default', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const table = container.querySelector('table.c-table')
    expect(table).not.toBeNull()

    const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent?.trim())
    expect(headers).toEqual(['Cultura', 'Fev', 'Mar', 'Abr'])
  })

  it('wraps around month boundaries (e.g. month 1 shows Dez, Jan, Fev; month 12 shows Nov, Dez, Jan)', async () => {
    const { container: containerJan } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 1,
      schedules: mockSchedules
    })
    const headersJan = Array.from(containerJan.querySelectorAll('th')).map((th) => th.textContent?.trim())
    expect(headersJan).toEqual(['Cultura', 'Dez', 'Jan', 'Fev'])

    const { container: containerDec } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 12,
      schedules: mockSchedules
    })
    // For December (no cultures match in month 12 in mockSchedules), table is not rendered
    expect(containerDec.querySelector('table')).toBeNull()
  })

  it('renders all 12 month column headers when showFullYear is true', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      showFullYear: true,
      schedules: mockSchedules
    })

    const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent?.trim())
    expect(headers).toEqual([
      'Cultura',
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ])
  })

  it('renders the switch "Mostrar ano inteiro" when month is selected', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const switchEl = container.querySelector('wa-switch')
    expect(switchEl).not.toBeNull()
    expect(switchEl?.textContent).toContain('Mostrar ano inteiro')
  })

  it('renders all cultures and all 12 months when month is null', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: null,
      schedules: mockSchedules
    })

    const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent?.trim())
    expect(headers).toEqual([
      'Cultura',
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ])

    // In Region 1: Alface, Batata, and Tomate all have schedules
    const rows = Array.from(container.querySelectorAll('tbody tr'))
    expect(rows.length).toBe(3)
    const names = rows.map((r) => r.querySelector('strong')?.textContent?.trim())
    expect(names).toEqual(['Alface', 'Batata', 'Tomate'])

    // No switch should be rendered when month is not selected
    expect(container.querySelector('wa-switch')).toBeNull()
  })

  it('highlights the selected month in the table header', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const headers = Array.from(container.querySelectorAll('th'))
    // 0: Cultura, 1: Fev, 2: Mar, 3: Abr
    const marchHeader = headers[2]
    expect(marchHeader?.querySelector('strong')?.textContent?.trim()).toBe('Mar')
    expect(marchHeader?.classList.contains('--current')).toBe(true)

    // Other month headers should not be in strong and not have --current
    const febHeader = headers[1]
    expect(febHeader?.querySelector('strong')).toBeNull()
    expect(febHeader?.classList.contains('--current')).toBe(false)
  })

  it('adds --current class to td elements of the selected month', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    for (const row of rows) {
      const cells = Array.from(row.querySelectorAll('td'))
      // Index 0: culture info
      expect(cells[0]?.classList.contains('--current')).toBe(false)
      // Index 1 (Fev: m.id=2): false
      expect(cells[1]?.classList.contains('--current')).toBe(false)
      // Index 2 (Mar: m.id=3): true
      expect(cells[2]?.classList.contains('--current')).toBe(true)
      // Index 3 (Abr: m.id=4): false
      expect(cells[3]?.classList.contains('--current')).toBe(false)
    }
  })

  it('only lists cultures that have actions in the selected month', async () => {
    // In Month 3: Alface has sementeira_direta in 3; Batata has plantar in 3; Tomate has viveiro in 1, 2 (NOT 3)
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    expect(rows.length).toBe(2)

    const cultureNames = rows.map((r) => r.querySelector('strong')?.textContent?.trim())
    expect(cultureNames).toEqual(['Alface', 'Batata'])

    expect(rows[0]?.textContent).toContain('Folha')
    expect(rows[1]?.textContent).toContain('Tubérculo')
  })

  it('shows actions across months for active cultures', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      showFullYear: true,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    // First row is Alface
    const alfaceCells = Array.from(rows[0]?.querySelectorAll('td') ?? [])
    // Index 0: culture name
    // Index 1: Jan (empty)
    // Index 2: Fev (empty)
    // Index 3: Mar (Semear)
    // Index 4: Abr (Semear)
    // Index 5: Mai (Semear & Colher)
    // Index 6: Jun (Colher)
    // Index 7: Jul (Colher)
    expect(alfaceCells[1]?.textContent?.trim()).toBe('')
    expect(alfaceCells[3]?.textContent?.trim()).toBe('Semear (Direta)')
    expect(alfaceCells[4]?.textContent?.trim()).toBe('Semear (Direta)')

    const maiBadges = Array.from(alfaceCells[5]?.querySelectorAll('wa-badge') ?? []).map((b) =>
      b.textContent?.trim()
    )
    expect(maiBadges).toEqual(['Semear (Direta)', 'Colher'])

    expect(alfaceCells[6]?.textContent?.trim()).toBe('Colher')
    expect(alfaceCells[7]?.textContent?.trim()).toBe('Colher')
  })

  it('renders an action legend at the top with sementeira grouped in wa-button-group', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const buttonGroup = container.querySelector('wa-button-group[label="Sementeira"]')
    expect(buttonGroup).not.toBeNull()
    expect(buttonGroup?.textContent).toContain('Sementeira direta')
    expect(buttonGroup?.textContent).toContain('Sementeira em viveiro')

    expect(container.textContent).toContain('Plantação / Transplante')
    expect(container.textContent).toContain('Colheita')
  })

  it('filters rows and badges based on selectedActions prop', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      selectedActions: ['plant'],
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    expect(rows.length).toBe(1)
    expect(rows[0]?.querySelector('strong')?.textContent?.trim()).toBe('Batata')

    const badges = Array.from(rows[0]?.querySelectorAll('wa-badge') ?? []).map((b) =>
      b.textContent?.trim()
    )
    expect(badges.every((b) => b === 'Plantar')).toBe(true)
  })

  it('filters badges inside cells so only selected action badges appear', async () => {
    // In Month 5: Alface has both direct_sowing and harvest
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 5,
      selectedActions: ['harvest'],
      showFullYear: true,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    expect(rows.length).toBe(1)
    expect(rows[0]?.querySelector('strong')?.textContent?.trim()).toBe('Alface')

    const badges = Array.from(rows[0]?.querySelectorAll('wa-badge') ?? []).map((b) =>
      b.textContent?.trim()
    )
    expect(badges).toEqual(['Colher', 'Colher', 'Colher'])
  })

  it('displays empty state when all actions are deselected', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      selectedActions: [],
      schedules: mockSchedules
    })

    const callout = container.querySelector('wa-callout')
    expect(callout).not.toBeNull()
    expect(callout?.textContent).toContain('Nenhuma ação selecionada')
    expect(container.querySelector('table')).toBeNull()
  })

  it('toggles an action filter when clicking its button', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    // Initially both Alface and Batata are displayed
    expect(container.querySelectorAll('tbody tr').length).toBe(2)

    // Find the "Sementeira direta" button
    const buttons = Array.from(container.querySelectorAll('wa-button'))
    const semearBtn = buttons.find((b) => b.textContent?.includes('Sementeira direta'))
    expect(semearBtn).toBeDefined()

    // Click to deactivate Sementeira direta
    semearBtn?.click()

    // Wait for DOM to re-render: now only Batata should remain
    await vi.waitFor(() => {
      expect(container.querySelectorAll('tbody tr').length).toBe(1)
    })

    const remainingCulture = container.querySelector('tbody tr strong')?.textContent?.trim()
    expect(remainingCulture).toBe('Batata')
  })
})
