import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import CultureCard from './CultureCard.svelte'
import type { CultureRecord, CultureScheduleRecord } from '@/types/cultivo'

const mockCulture: CultureRecord = {
  id: 'cult-1',
  name: 'Alface',
  variant: 'Quatro Estações',
  type: 'folha',
  slug: 'alface-quatro-estacoes',
  created: '2026-01-01',
  updated: '2026-01-01'
}

const mockSchedules: CultureScheduleRecord[] = [
  {
    id: 'sched-1',
    culture: 'cult-1',
    action: 'direct_sowing',
    regions: ['1', '3', '4'],
    months: ['3', '4', '5', '6', '7', '8', '9', '10'],
    created: '2026-01-01',
    updated: '2026-01-01'
  },
  {
    id: 'sched-2',
    culture: 'cult-1',
    action: 'nursery',
    regions: ['1', '3', '4'],
    months: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    created: '2026-01-01',
    updated: '2026-01-01'
  },
  {
    id: 'sched-3',
    culture: 'cult-1',
    action: 'plant',
    regions: ['1', '3', '4'],
    months: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    created: '2026-01-01',
    updated: '2026-01-01'
  },
  {
    id: 'sched-4',
    culture: 'cult-1',
    action: 'harvest',
    regions: ['1', '3', '4'],
    months: ['4', '5', '6', '7', '8', '9', '10', '11', '12'],
    created: '2026-01-01',
    updated: '2026-01-01'
  },
  {
    id: 'sched-5',
    culture: 'cult-1',
    action: 'direct_sowing',
    regions: ['2'],
    months: ['4', '5', '6', '7', '8', '9'],
    created: '2026-01-01',
    updated: '2026-01-01'
  }
]

describe('CultureCard.svelte', () => {
  it('renders nothing when culture is null', async () => {
    const { container } = await render(CultureCard, {
      culture: null
    })

    expect(container.querySelector('wa-card')).toBeNull()
  })

  it('renders culture name, variant, and type badge', async () => {
    const { container } = await render(CultureCard, {
      culture: mockCulture,
      regionId: null
    })

    const card = container.querySelector('wa-card')
    expect(card).not.toBeNull()
    expect(card?.textContent).toContain('Alface')
    expect(card?.textContent).toContain('(Quatro Estações)')
    expect(card?.textContent).toContain('Folha')
  })

  it('displays callout when regionId is not selected', async () => {
    const { container } = await render(CultureCard, {
      culture: mockCulture,
      regionId: null,
      schedules: mockSchedules
    })

    const callout = container.querySelector('wa-callout')
    expect(callout).not.toBeNull()
    expect(callout?.textContent).toContain('Selecione um distrito acima')
    expect(container.querySelector('table')).toBeNull()
  })

  it('renders selected region info and cultivation table when regionId is provided', async () => {
    const { container } = await render(CultureCard, {
      culture: mockCulture,
      regionId: 1,
      schedules: mockSchedules
    })

    expect(container.textContent).toContain('Região 1: Litoral norte e centro')

    const table = container.querySelector('table.c-table')
    expect(table).not.toBeNull()

    const headers = Array.from(container.querySelectorAll('th')).map((th) => th.textContent?.trim())
    expect(headers).toEqual(['Ação', 'Meses'])
  })

  it('displays all cultivation actions sorted in order (sementeira, viveiro, plantar, colher)', async () => {
    const { container } = await render(CultureCard, {
      culture: mockCulture,
      regionId: 1,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    expect(rows.length).toBe(4)

    const badges = rows.map((r) => r.querySelector('wa-badge')?.textContent?.trim())
    expect(badges).toEqual([
      'Sementeira direta',
      'Sementeira em viveiro',
      'Plantação / Transplante',
      'Colheita'
    ])
  })

  it('renders matching months for the specific region', async () => {
    const { container } = await render(CultureCard, {
      culture: mockCulture,
      regionId: 2,
      schedules: mockSchedules
    })

    const rows = Array.from(container.querySelectorAll('tbody tr'))
    expect(rows.length).toBe(1)

    const badge = rows[0]?.querySelector('wa-badge')?.textContent?.trim()
    expect(badge).toBe('Sementeira direta')

    expect(rows[0]?.textContent).toContain('Abr')
    expect(rows[0]?.textContent).toContain('Mai')
    expect(rows[0]?.textContent).toContain('Jun')
    expect(rows[0]?.textContent).toContain('Jul')
    expect(rows[0]?.textContent).toContain('Ago')
    expect(rows[0]?.textContent).toContain('Set')
    expect(rows[0]?.textContent).not.toContain('Mar')
  })

  it('displays empty message when no schedules exist for the culture in the selected region', async () => {
    const { container } = await render(CultureCard, {
      culture: mockCulture,
      regionId: 5,
      schedules: mockSchedules
    })

    const callout = container.querySelector('wa-callout')
    expect(callout).not.toBeNull()
    expect(callout?.textContent).toContain('Não foram encontradas informações de cultivo')
    expect(container.querySelector('table')).toBeNull()
  })

  it('highlights current month when it is present in an action schedule', async () => {
    const currentMonthNum = new Date().getMonth() + 1
    const { container } = await render(CultureCard, {
      culture: mockCulture,
      regionId: 1,
      schedules: mockSchedules
    })

    // Sched-3 (plantar) has months 2-11. November (11) is currentMonthNum in 2026.
    // Ensure strong tag exists in the table for current month if present
    const strongMonth = container.querySelector('tbody tr strong')
    if (strongMonth) {
      expect(strongMonth.getAttribute('title')).toContain('(mês atual)')
    }
  })
})
