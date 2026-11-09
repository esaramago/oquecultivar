import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import MonthScheduleTable from './MonthScheduleTable.svelte'
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
    months: ['3', '4', '5', '6'],
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
    regions: ['5'],
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

describe('MonthScheduleTable.svelte', () => {
  it('displays callout when regionId is not selected', async () => {
    const { container } = await render(MonthScheduleTable, {
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
    const { container } = await render(MonthScheduleTable, {
      regionId: 2,
      month: 12,
      schedules: mockSchedules
    })

    const callout = container.querySelector('wa-callout')
    expect(callout).not.toBeNull()
    expect(callout?.textContent).toContain('Não foram encontradas ações de cultivo')
    expect(container.querySelector('table')).toBeNull()
  })

  it('renders the table with Culture, Action and Month headers when matches exist', async () => {
    const { container } = await render(MonthScheduleTable, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const table = container.querySelector('table.c-table')
    expect(table).not.toBeNull()

    const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent?.trim())
    expect(headers).toEqual(['Cultura', 'Ação', 'Meses'])
  })

  it('displays matching cultures and actions with badges and month lists', async () => {
    const { container } = await render(MonthScheduleTable, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    // sched-1 (Alface / sementeira), sched-2 (Alface / colher), sched-3 (Batata / plantar)
    expect(rows.length).toBe(3)

    // First row: Alface, Sementeira direta, Mar, Abr, Mai
    expect(rows[0]?.textContent).toContain('Alface')
    expect(rows[0]?.textContent).toContain('(Quatro Estações)')
    expect(rows[0]?.textContent).toContain('Sementeira direta')
    expect(rows[0]?.textContent).toContain('Mar')
    expect(rows[0]?.textContent).toContain('Abr')
    expect(rows[0]?.textContent).toContain('Mai')

    // Second row: Alface, Colheita, Mar, Abr, Mai, Jun
    expect(rows[1]?.textContent).toContain('Alface')
    expect(rows[1]?.textContent).toContain('Colheita')

    // Third row: Batata, Plantação / Transplante, Fev, Mar, Abr
    expect(rows[2]?.textContent).toContain('Batata')
    expect(rows[2]?.textContent).toContain('Plantação / Transplante')
    expect(rows[2]?.textContent).toContain('Fev')
    expect(rows[2]?.textContent).toContain('Mar')
    expect(rows[2]?.textContent).toContain('Abr')
  })

  it('sorts alphabetically by culture name and by action sequence', async () => {
    const { container } = await render(MonthScheduleTable, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    const cultureNames = rows.map((r) => r.querySelector('strong')?.textContent?.trim())
    expect(cultureNames).toEqual(['Alface', 'Alface', 'Batata'])

    const badges = rows.map((r) => r.querySelector('wa-badge')?.textContent?.trim())
    expect(badges).toEqual(['Sementeira direta', 'Colheita', 'Plantação / Transplante'])
  })

  it('highlights the selected month with strong tag', async () => {
    const { container } = await render(MonthScheduleTable, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    const monthCells = rows.map((r) => r.querySelectorAll('td')[2])
    const strongMonth = monthCells[0]?.querySelector('strong')?.textContent?.trim()
    expect(strongMonth).toBe('Mar')
  })
})
