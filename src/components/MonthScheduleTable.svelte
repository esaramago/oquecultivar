<script lang="ts">
  import { onMount } from 'svelte'
  import Grid from '@/components/Grid.svelte'
  import { getActionById, getMonthById } from '@/lib/config'
  import { pb } from '@/lib/pocketbase'
  import type {
    CultureRecord,
    CultureScheduleRecord,
    MonthInfo,
    MonthNumber,
    RegionId
  } from '@/types/cultivo'

  let {
    regionId = null,
    month = (new Date().getMonth() + 1) as MonthNumber,
    schedules = $bindable<CultureScheduleRecord[]>([]),
    cultures = []
  }: {
    regionId?: RegionId | null
    month?: MonthNumber
    schedules?: CultureScheduleRecord[]
    cultures?: CultureRecord[]
  } = $props()

  let isLoading = $state(false)
  let loadError = $state<string | null>(null)

  function getCulture(schedule: CultureScheduleRecord): CultureRecord | undefined {
    if (schedule.expand?.culture) {
      return schedule.expand.culture
    }
    if (cultures.length > 0) {
      return cultures.find((c) => c.id === schedule.culture)
    }
    return undefined
  }

  function getFormattedMonths(monthStrings: string[]): MonthInfo[] {
    return monthStrings
      .map((m) => Number(m))
      .filter((m) => !isNaN(m) && m >= 1 && m <= 12)
      .sort((a, b) => a - b)
      .map((m) => getMonthById(m))
      .filter((m): m is MonthInfo => Boolean(m))
  }

  const matchingSchedules = $derived.by(() => {
    if (!regionId || !month) {
      return []
    }
    const regStr = String(regionId)
    const monthStr = String(month)

    return schedules.filter((s) => {
      return s.regions?.includes(regStr) && s.months?.includes(monthStr)
    })
  })

  const ACTION_ORDER: Record<string, number> = {
    sementeira_direta: 1,
    viveiro: 2,
    plantar: 3,
    colher: 4
  }

  const sortedSchedules = $derived.by(() => {
    return [...matchingSchedules].sort((a, b) => {
      const cultA = getCulture(a)?.name ?? ''
      const cultB = getCulture(b)?.name ?? ''
      const nameDiff = cultA.localeCompare(cultB, 'pt-PT')
      if (nameDiff !== 0) return nameDiff

      const orderA = ACTION_ORDER[a.action] ?? 99
      const orderB = ACTION_ORDER[b.action] ?? 99
      return orderA - orderB
    })
  })

  onMount(() => {
    if (schedules.length === 0) {
      isLoading = true
      loadError = null
      pb.collection('culture_schedules')
        .getFullList<CultureScheduleRecord>({
          expand: 'culture',
          sort: 'culture.name'
        })
        .then((records) => {
          schedules = records
        })
        .catch((error) => {
          console.error('Erro ao carregar calendário:', error)
          loadError = 'Ocorreu um erro ao carregar os dados de cultivo.'
        })
        .finally(() => {
          isLoading = false
        })
    }
  })
</script>

{#if !regionId}
  <wa-callout variant="neutral">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Selecione um distrito acima para consultar as culturas deste mês.
  </wa-callout>
{:else if isLoading}
  <Grid align="center" gap="s">
    <wa-spinner></wa-spinner>
    <p>A carregar culturas...</p>
  </Grid>
{:else if loadError}
  <wa-callout variant="warning">
    <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
    {loadError}
  </wa-callout>
{:else if sortedSchedules.length === 0}
  <wa-callout variant="neutral">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Não foram encontradas ações de cultivo para este mês na região selecionada.
  </wa-callout>
{:else}
  <wa-scroller>
    <table class="c-table">
      <thead>
        <tr>
          <th>Cultura</th>
          <th>Ação</th>
          <th>Meses</th>
        </tr>
      </thead>
      <tbody>
        {#each sortedSchedules as schedule (schedule.id)}
          {@const culture = getCulture(schedule)}
          {@const action = getActionById(schedule.action)}
          {@const formattedMonths = getFormattedMonths(schedule.months)}
          <tr>
            <td>
              <Grid align="center" gap="xs">
                <strong>{culture?.name ?? '—'}</strong>
                {#if culture?.variant}
                  <span>({culture.variant})</span>
                {/if}
              </Grid>
            </td>
            <td>
              <wa-badge variant={action?.badgeVariant ?? 'neutral'}>
                {action?.name ?? schedule.action}
              </wa-badge>
            </td>
            <td>
              {#each formattedMonths as m, i}
                {#if m.id === month}
                  <strong>{m.shortName}</strong>{i < formattedMonths.length - 1 ? ', ' : ''}
                {:else}
                  <span>{m.shortName}</span>{i < formattedMonths.length - 1 ? ', ' : ''}
                {/if}
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </wa-scroller>
{/if}
