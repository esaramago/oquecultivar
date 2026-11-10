<script lang="ts">
  import { onMount } from 'svelte'
  import Grid from '@/components/Grid.svelte'
  import { ACTIONS, MONTHS, getActionById, getCultureTypeById, getMonthById } from '@/lib/config'
  import { pb } from '@/lib/pocketbase'
  import type {
    ActionId,
    CultivationAction,
    CultureRecord,
    CultureScheduleRecord,
    MonthInfo,
    MonthNumber,
    RegionId
  } from '@/types/cultivo'

  let {
    regionId = null,
    month = (new Date().getMonth() + 1) as MonthNumber,
    showFullYear = $bindable(false),
    selectedActions = $bindable<ActionId[]>(ACTIONS.map((a) => a.id)),
    schedules = $bindable<CultureScheduleRecord[]>([]),
    cultures = []
  }: {
    regionId?: RegionId | null
    month?: MonthNumber | null
    showFullYear?: boolean
    selectedActions?: ActionId[]
    schedules?: CultureScheduleRecord[]
    cultures?: CultureRecord[]
  } = $props()

  let isLoading = $state(false)
  let loadError = $state<string | null>(null)

  const selectedActionSet = $derived(new Set(selectedActions))

  function toggleAction(actionId: ActionId) {
    if (selectedActions.includes(actionId)) {
      selectedActions = selectedActions.filter((id) => id !== actionId)
    } else {
      selectedActions = [...selectedActions, actionId]
    }
  }

  function handleActionKeydown(event: KeyboardEvent, actionId: ActionId) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleAction(actionId)
    }
  }

  const ACTION_ORDER: Record<string, number> = {
    direct_sowing: 1,
    nursery: 2,
    plant: 3,
    harvest: 4
  }

  function handleSwitchChange(event: Event) {
    const target = event.target as HTMLElement & { checked: boolean }
    showFullYear = target.checked
  }

  const displayedMonths = $derived.by((): readonly MonthInfo[] => {
    if (!month || showFullYear) {
      return MONTHS
    }

    const prevMonthId = (month === 1 ? 12 : month - 1) as MonthNumber
    const nextMonthId = (month === 12 ? 1 : month + 1) as MonthNumber

    const prevMonth = getMonthById(prevMonthId)
    const currentMonth = getMonthById(month)
    const nextMonth = getMonthById(nextMonthId)

    return [prevMonth, currentMonth, nextMonth].filter(
      (m): m is MonthInfo => Boolean(m)
    )
  })

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
    if (!regionId) {
      return []
    }

    const regStr = String(regionId)

    // Filter schedules for the selected region
    const regionSchedules = schedules.filter((s) => s.regions?.includes(regStr))

    // Find culture IDs that have at least one active action in the selected month
    const activeCultureKeys = new Set<string>()
    if (month) {
      const selectedMonthStr = String(month)
      for (const s of regionSchedules) {
        if (selectedActionSet.has(s.action) && s.months?.includes(selectedMonthStr)) {
          const culture = getCulture(s)
          const key = culture?.id ?? s.culture ?? s.id
          activeCultureKeys.add(key)
        }
      }
    } else {
      for (const s of regionSchedules) {
        if (selectedActionSet.has(s.action)) {
          const culture = getCulture(s)
          const key = culture?.id ?? s.culture ?? s.id
          activeCultureKeys.add(key)
        }
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
      if (!selectedActionSet.has(s.action)) {
        continue
      }

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
{:else}
  <Grid direction="column" gap="l">
    <!-- Action Filters and Full Year toggle -->
    <Grid justify="space-between" align="center" wrap={true}>
      <Grid align="center" gap="s" wrap={true}>
        <wa-button-group label="Sementeira">
          {#each ACTIONS.filter((a) => a.category === 'semear') as action (action.id)}
            {@const isActive = selectedActionSet.has(action.id)}
            <wa-button
              role="button"
              tabindex="0"
              size="s"
              pill
              variant={isActive ? action.badgeVariant : 'neutral'}
              appearance={isActive ? 'filled' : 'outlined'}
              onclick={() => toggleAction(action.id)}
              onkeydown={(e: KeyboardEvent) => handleActionKeydown(e, action.id)}
            >
              {#if isActive}
                <wa-icon slot="start" name="check"></wa-icon>
              {/if}
              {action.name}
            </wa-button>
          {/each}
        </wa-button-group>

        {#each ACTIONS.filter((a) => a.category !== 'semear') as action (action.id)}
          {@const isActive = selectedActionSet.has(action.id)}
          <wa-button
            role="button"
            tabindex="0"
            size="s"
            pill
            variant={isActive ? action.badgeVariant : 'neutral'}
            appearance={isActive ? 'filled' : 'outlined'}
            onclick={() => toggleAction(action.id)}
            onkeydown={(e: KeyboardEvent) => handleActionKeydown(e, action.id)}
          >
            {#if isActive}
              <wa-icon slot="start" name="check"></wa-icon>
            {/if}
            {action.name}
          </wa-button>
        {/each}
      </Grid>

      {#if month}
        <wa-switch
          checked={showFullYear}
          onchange={handleSwitchChange}
          onwa-change={handleSwitchChange}
        >
          Mostrar ano inteiro
        </wa-switch>
      {/if}
    </Grid>

    {#if cultureRows.length === 0}
      <wa-callout variant="neutral">
        <wa-icon slot="icon" name="circle-info"></wa-icon>
        {#if selectedActions.length === 0}
          Nenhuma ação selecionada. Selecione pelo menos uma ação acima para consultar as culturas.
        {:else if month}
          Não foram encontradas ações de cultivo para este mês na região selecionada.
        {:else}
          Não foram encontradas ações de cultivo para a região selecionada.
        {/if}
      </wa-callout>
    {:else}
      <!-- Calendar Grid Table -->
      <wa-scroller>
      <table class="c-table">
        <thead>
          <tr>
            <th>Cultura</th>
            {#each displayedMonths as m (m.id)}
              <th class:--current={m.id === month}>
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
              {#each displayedMonths as m (m.id)}
                {@const actions = row.actionsByMonth.get(m.id) ?? []}
                <td class:--current={m.id === month}>
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
    {/if}
  </Grid>
{/if}


<style>

table {
  wa-badge {
    opacity: .5;
  }
  .--current wa-badge {
    opacity: 1;
  }
}
</style>