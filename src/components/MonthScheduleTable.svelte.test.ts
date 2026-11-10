import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import MonthScheduleTable from './MonthScheduleTable.svelte'
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
    expect(container.querySelector('wa-card')).toBeNull()
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
    expect(container.querySelector('wa-card')).toBeNull()
  })

  it('renders wa-cards when matches exist', async () => {
    const { container } = await render(MonthScheduleTable, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const cards = container.querySelectorAll('wa-card')
    expect(cards.length).toBe(2)
  })

  it('displays matching cultures and actions with badges and month lists', async () => {
    const { container } = await render(MonthScheduleTable, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const cards = Array.from(container.querySelectorAll('wa-card'))
    // sched-1 (Alface / sementeira) and sched-2 (Alface / colher) in one card, sched-3 (Batata / plantar) in second card
    expect(cards.length).toBe(2)

    // First card: Alface, Sementeira direta, Colheita, Mar, Abr, Mai, Jun
    expect(cards[0]?.textContent).toContain('Alface')
    expect(cards[0]?.textContent).toContain('(Quatro Estações)')
    expect(cards[0]?.textContent).toContain('Sementeira direta')
    expect(cards[0]?.textContent).toContain('Colheita')
    expect(cards[0]?.textContent).toContain('Mar')
    expect(cards[0]?.textContent).toContain('Abr')
    expect(cards[0]?.textContent).toContain('Mai')
    expect(cards[0]?.textContent).toContain('Jun')

    // Second card: Batata, Plantação / Transplante, Fev, Mar, Abr
    expect(cards[1]?.textContent).toContain('Batata')
    expect(cards[1]?.textContent).toContain('Plantação / Transplante')
    expect(cards[1]?.textContent).toContain('Fev')
    expect(cards[1]?.textContent).toContain('Mar')
    expect(cards[1]?.textContent).toContain('Abr')
  })

  it('sorts alphabetically by culture name and by action sequence', async () => {
    const { container } = await render(MonthScheduleTable, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const cards = Array.from(container.querySelectorAll('wa-card'))
    const cultureNames = cards.map((c) => c.querySelector('strong')?.textContent?.trim())
    expect(cultureNames).toEqual(['Alface', 'Batata'])

    const alfaceBadges = Array.from(cards[0]?.querySelectorAll('wa-badge') ?? []).map((b) => b.textContent?.trim())
    expect(alfaceBadges).toEqual(['Sementeira direta', 'Colheita'])

    const batataBadges = Array.from(cards[1]?.querySelectorAll('wa-badge') ?? []).map((b) => b.textContent?.trim())
    expect(batataBadges).toEqual(['Plantação / Transplante'])
  })

  it('highlights the selected month with strong tag', async () => {
    const { container } = await render(MonthScheduleTable, {
      regionId: 1,
      month: 3,
      schedules: mockSchedules
    })

    const cards = Array.from(container.querySelectorAll('wa-card'))
    const strongTags = cards[0]?.querySelectorAll('strong')
    // First strong is culture name, second strong is the highlighted month
    expect(strongTags?.[0]?.textContent?.trim()).toBe('Alface')
    expect(strongTags?.[1]?.textContent?.trim()).toBe('Mar')
  })
})
