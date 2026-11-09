import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import MonthScheduleGrid from './MonthScheduleGrid.svelte'
import type { CultureScheduleRecord } from '@/types/cultivo'

const mockSchedules: CultureScheduleRecord[] = [
  {
    id: 'sched-1',
    culture: 'cult-1',
    action: 'sementeira_direta',
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
    action: 'colher',
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
    action: 'plantar',
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
    action: 'viveiro',
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

  it('renders the grid table with 12 month column headers when matches exist', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const table = container.querySelector('table.c-table')
    expect(table).not.toBeNull()

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

  it('highlights the selected month in the table header', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const headers = Array.from(container.querySelectorAll('th'))
    // Index 3 is 'Mar' (0: Cultura, 1: Jan, 2: Fev, 3: Mar)
    const marchHeader = headers[3]
    expect(marchHeader?.querySelector('strong')?.textContent?.trim()).toBe('Mar')

    // Other month headers should not be in strong
    const febHeader = headers[2]
    expect(febHeader?.querySelector('strong')).toBeNull()
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
    expect(alfaceCells[3]?.textContent?.trim()).toBe('Semear')
    expect(alfaceCells[4]?.textContent?.trim()).toBe('Semear')

    const maiBadges = Array.from(alfaceCells[5]?.querySelectorAll('wa-badge') ?? []).map((b) =>
      b.textContent?.trim()
    )
    expect(maiBadges).toEqual(['Semear', 'Colher'])

    expect(alfaceCells[6]?.textContent?.trim()).toBe('Colher')
    expect(alfaceCells[7]?.textContent?.trim()).toBe('Colher')
  })

  it('renders an action legend at the top', async () => {
    const { container } = await render(MonthScheduleGrid, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    expect(container.textContent).toContain('Sementeira direta')
    expect(container.textContent).toContain('Sementeira em viveiro')
    expect(container.textContent).toContain('Plantação / Transplante')
    expect(container.textContent).toContain('Colheita')
  })
})
