<script lang="ts">
  import { onMount } from 'svelte'
  import Grid from '@/components/Grid.svelte'
  import { ACTIONS, MONTHS, getActionById, getCultureTypeById } from '@/lib/config'
  import { pb } from '@/lib/pocketbase'
  import type {
    ActionId,
    CultivationAction,
    CultureRecord,
    CultureScheduleRecord,
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

  const ACTION_ORDER: Record<string, number> = {
    sementeira_direta: 1,
    viveiro: 2,
    plantar: 3,
    colher: 4
  }

  function getCulture(schedule: CultureScheduleRecord): CultureRecord | undefined {
    if (schedule.expand?.culture) {
      return schedule.expand.culture
    }
    if (cultures.length > 0) {
      return cultures.find((c) => c.id === schedule.culture)
    }
    return undefined
  }

  interface CultureGridRow {
    id: string
    culture?: CultureRecord
    actionsByMonth: Map<number, CultivationAction[]>
  }

  const cultureRows = $derived.by((): CultureGridRow[] => {
    if (!regionId || !month) {
      return []
    }

    const regStr = String(regionId)
    const selectedMonthStr = String(month)

    // Filter schedules for the selected region
    const regionSchedules = schedules.filter((s) => s.regions?.includes(regStr))

    // Find culture IDs that have at least one action in the selected month
    const activeCultureKeys = new Set<string>()
    for (const s of regionSchedules) {
      if (s.months?.includes(selectedMonthStr)) {
        const culture = getCulture(s)
        const key = culture?.id ?? s.culture ?? s.id
        activeCultureKeys.add(key)
      }
    }

    // Build the grid rows for the active cultures
    const rowsMap = new Map<
      string,
      {
        id: string
        culture?: CultureRecord
        monthActionSets: Map<number, Set<ActionId>>
      }
    >()

    for (const s of regionSchedules) {
      const culture = getCulture(s)
      const key = culture?.id ?? s.culture ?? s.id

      if (!activeCultureKeys.has(key)) {
        continue
      }

      let rowData = rowsMap.get(key)
      if (!rowData) {
        rowData = {
          id: key,
          culture,
          monthActionSets: new Map()
        }
        rowsMap.set(key, rowData)
      }

      for (const mStr of s.months ?? []) {
        const mNum = Number(mStr)
        if (!isNaN(mNum) && mNum >= 1 && mNum <= 12) {
          if (!rowData.monthActionSets.has(mNum)) {
            rowData.monthActionSets.set(mNum, new Set())
          }
          rowData.monthActionSets.get(mNum)!.add(s.action)
        }
      }
    }

    const result: CultureGridRow[] = []

    for (const rowData of rowsMap.values()) {
      const actionsByMonth = new Map<number, CultivationAction[]>()

      for (const [mNum, actionSet] of rowData.monthActionSets.entries()) {
        const sortedActions = Array.from(actionSet)
          .sort((a, b) => (ACTION_ORDER[a] ?? 99) - (ACTION_ORDER[b] ?? 99))
          .map((actionId) => getActionById(actionId))
          .filter((a): a is CultivationAction => Boolean(a))

        actionsByMonth.set(mNum, sortedActions)
      }

      result.push({
        id: rowData.id,
        culture: rowData.culture,
        actionsByMonth
      })
    }

    // Sort culture rows alphabetically by name and variant
    return result.sort((a, b) => {
      const nameA = a.culture?.name ?? ''
      const nameB = b.culture?.name ?? ''
      const nameDiff = nameA.localeCompare(nameB, 'pt-PT')
      if (nameDiff !== 0) return nameDiff

      const varA = a.culture?.variant ?? ''
      const varB = b.culture?.variant ?? ''
      return varA.localeCompare(varB, 'pt-PT')
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
{:else if cultureRows.length === 0}
  <wa-callout variant="neutral">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Não foram encontradas ações de cultivo para este mês na região selecionada.
  </wa-callout>
{:else}
  <Grid direction="column" gap="l">
    <!-- Action Legend -->
    <Grid align="center" gap="s" wrap={true}>
      {#each ACTIONS as action (action.id)}
        <Grid align="center" gap="xs">
          <wa-badge variant={action.badgeVariant}>
            {action.shortName}
          </wa-badge>
          <span>{action.name}</span>
        </Grid>
      {/each}
    </Grid>

    <!-- Calendar Grid Table -->
    <wa-scroller>
      <table class="c-table">
        <thead>
          <tr>
            <th>Cultura</th>
            {#each MONTHS as m (m.id)}
              <th>
                {#if m.id === month}
                  <strong>{m.shortName}</strong>
                {:else}
                  <span>{m.shortName}</span>
                {/if}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each cultureRows as row (row.id)}
            <tr>
              <td>
                <div>
                  <Grid align="center" gap="xs">
                    <wa-icon name="seedling"></wa-icon>
                    <strong>{row.culture?.name ?? '—'}</strong>
                    {#if row.culture?.variant}
                    <span>({row.culture.variant})</span>
                    {/if}
                  </Grid>
                </div>
                <div>{row.culture?.type ? (getCultureTypeById(row.culture.type)?.name ?? row.culture.type) : ''}</div>
              </td>
              {#each MONTHS as m (m.id)}
                {@const actions = row.actionsByMonth.get(m.id) ?? []}
                <td>
                  {#if actions.length > 0}
                    <Grid direction="column" gap="xs">
                      {#each actions as action (action.id)}
                        <wa-badge
                          variant={action.badgeVariant}
                          title={action.name}
                        >
                          {action.shortName}
                        </wa-badge>
                      {/each}
                    </Grid>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </wa-scroller>
  </Grid>
{/if}
