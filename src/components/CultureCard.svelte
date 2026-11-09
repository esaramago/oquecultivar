<script lang="ts">
  import Grid from '@/components/Grid.svelte'
  import {
    getActionById,
    getCultureTypeById,
    getMonthById,
    getRegionById
  } from '@/lib/config'
  import { pb } from '@/lib/pocketbase'
  import type {
    ActionId,
    CultureRecord,
    CultureScheduleRecord,
    MonthInfo,
    RegionId
  } from '@/types/cultivo'

  let {
    culture = null,
    regionId = null,
    schedules = undefined
  }: {
    culture?: CultureRecord | null
    regionId?: RegionId | null
    schedules?: CultureScheduleRecord[]
  } = $props()

  let isLoading = $state(false)
  let loadError = $state<string | null>(null)
  let internalSchedules = $state<CultureScheduleRecord[]>([])

  const currentMonth = new Date().getMonth() + 1

  const selectedRegion = $derived(
    regionId ? getRegionById(regionId) : undefined
  )

  const cultureType = $derived(
    culture ? getCultureTypeById(culture.type) : undefined
  )

  const ACTION_ORDER: Record<string, number> = {
    sementeira_direta: 1,
    viveiro: 2,
    plantar: 3,
    colher: 4
  }

  const effectiveSchedules = $derived(
    schedules !== undefined ? schedules : internalSchedules
  )

  const matchingSchedules = $derived.by(() => {
    if (!culture || !regionId) {
      return []
    }
    const regStr = String(regionId)
    return effectiveSchedules.filter((s) => {
      const isCultureMatch =
        s.culture === culture.id || s.expand?.culture?.id === culture.id
      return isCultureMatch && s.regions?.includes(regStr)
    })
  })

  const actionEntries = $derived.by(() => {
    const actionMap = new Map<ActionId, Set<number>>()

    for (const schedule of matchingSchedules) {
      if (!actionMap.has(schedule.action)) {
        actionMap.set(schedule.action, new Set())
      }
      for (const m of schedule.months ?? []) {
        const num = Number(m)
        if (!isNaN(num) && num >= 1 && num <= 12) {
          actionMap.get(schedule.action)!.add(num)
        }
      }
    }

    return Array.from(actionMap.entries())
      .sort((a, b) => (ACTION_ORDER[a[0]] ?? 99) - (ACTION_ORDER[b[0]] ?? 99))
      .map(([actionId, monthSet]) => {
        const sortedMonths = Array.from(monthSet)
          .sort((a, b) => a - b)
          .map((m) => getMonthById(m))
          .filter((m): m is MonthInfo => Boolean(m))

        return {
          action: actionId,
          actionInfo: getActionById(actionId),
          months: sortedMonths
        }
      })
  })

  $effect(() => {
    const cultureId = culture?.id
    if (schedules === undefined && cultureId) {
      isLoading = true
      loadError = null
      pb.collection('culture_schedules')
        .getFullList<CultureScheduleRecord>({
          filter: `culture = "${cultureId}"`
        })
        .then((records) => {
          if (culture?.id === cultureId) {
            internalSchedules = records
          }
        })
        .catch((error) => {
          console.error('Erro ao carregar calendário da cultura:', error)
          loadError = 'Ocorreu um erro ao carregar o calendário desta cultura.'
        })
        .finally(() => {
          isLoading = false
        })
    }
  })
</script>

{#if culture}
  <wa-card>
    <Grid direction="column" gap="l">
      <!-- Culture Header -->
      <Grid justify="space-between" align="center" wrap={true}>
        <Grid align="center" gap="s">
          <wa-icon name="seedling"></wa-icon>
          <strong>{culture.name}</strong>
          {#if culture.variant}
            <span>({culture.variant})</span>
          {/if}
        </Grid>
        <wa-badge variant="brand">
          {cultureType?.name ?? culture.type}
        </wa-badge>
      </Grid>

      <wa-divider></wa-divider>

      <!-- Cultivation Schedule -->
      {#if !regionId}
        <wa-callout variant="neutral">
          <wa-icon slot="icon" name="circle-info"></wa-icon>
          Selecione um distrito acima para ver o calendário de cultivo nesta região.
        </wa-callout>
      {:else if isLoading}
        <Grid align="center" gap="s">
          <wa-spinner></wa-spinner>
          <p>A carregar calendário...</p>
        </Grid>
      {:else if loadError}
        <wa-callout variant="warning">
          <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
          {loadError}
        </wa-callout>
      {:else}
        {#if selectedRegion}
          <Grid align="center" gap="xs">
            <wa-icon name="location-dot"></wa-icon>
            <span>Região {selectedRegion.id}: {selectedRegion.name}</span>
          </Grid>
        {/if}

        {#if actionEntries.length === 0}
          <wa-callout variant="neutral">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Não foram encontradas informações de cultivo para esta cultura na região selecionada.
          </wa-callout>
        {:else}
          <wa-scroller>
            <table class="c-table">
              <thead>
                <tr>
                  <th>Ação</th>
                  <th>Meses</th>
                </tr>
              </thead>
              <tbody>
                {#each actionEntries as item (item.action)}
                  <tr>
                    <td>
                      <wa-badge
                        variant={item.actionInfo?.badgeVariant ?? 'neutral'}
                        title={item.actionInfo?.description}
                      >
                        {item.actionInfo?.name ?? item.action}
                      </wa-badge>
                    </td>
                    <td>
                      {#each item.months as m, i}
                        {#if m.id === currentMonth}
                          <strong title="{m.name} (mês atual)">{m.shortName}</strong>{i < item.months.length - 1 ? ', ' : ''}
                        {:else}
                          <span title={m.name}>{m.shortName}</span>{i < item.months.length - 1 ? ', ' : ''}
                        {/if}
                      {/each}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </wa-scroller>
        {/if}
      {/if}
    </Grid>
  </wa-card>
{/if}
