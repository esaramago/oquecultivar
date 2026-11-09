<script lang="ts">
  import { onMount } from 'svelte'
  import CultureAutocomplete from '@/components/CultureAutocomplete.svelte'
  import CultureCard from '@/components/CultureCard.svelte'
  import Grid from '@/components/Grid.svelte'
  import HeadMeta from '@/components/HeadMeta.svelte'
  import MonthScheduleGrid from '@/components/MonthScheduleGrid.svelte'
  import MonthSelect from '@/components/MonthSelect.svelte'
  import RegionSelect from '@/components/RegionSelect.svelte'
  import { ACTIONS } from '@/lib/config'
  import type { ActionId, CultureRecord, MonthNumber, RegionId } from '@/types/cultivo'

  let selectedDistrictId = $state('')
  let selectedRegionId = $state<RegionId | null>(null)
  let selectedMonth = $state<MonthNumber | null>((new Date().getMonth() + 1) as MonthNumber)
  let selectedCultureId = $state('')
  let selectedCulture = $state<CultureRecord | null>(null)
  let showFullYear = $state(false)
  let selectedActions = $state<ActionId[]>(ACTIONS.map((a) => a.id))

  let isInitialized = false

  onMount(() => {
    if (typeof window !== 'undefined') {
      const savedFullYear = localStorage.getItem('oquecultivar_show_full_year')
      if (savedFullYear !== null) {
        showFullYear = savedFullYear === 'true'
      }

      const savedActions = localStorage.getItem('oquecultivar_actions')
      if (savedActions !== null) {
        try {
          const parsed = JSON.parse(savedActions)
          if (Array.isArray(parsed)) {
            const validActionIds = new Set(ACTIONS.map((a) => a.id))
            selectedActions = parsed.filter((id): id is ActionId => validActionIds.has(id))
          }
        } catch {
          // Ignore invalid JSON in localStorage
        }
      }
    }
    isInitialized = true
  })

  $effect(() => {
    if (!isInitialized || typeof window === 'undefined') return
    localStorage.setItem('oquecultivar_show_full_year', String(showFullYear))
  })

  $effect(() => {
    if (!isInitialized || typeof window === 'undefined') return
    localStorage.setItem('oquecultivar_actions', JSON.stringify(selectedActions))
  })

  function handleMonthChange() {
    selectedCulture = null
    selectedCultureId = ''
  }
</script>

<HeadMeta
  description="A simple PWA for small Portuguese farmers to know when to plant what."
/>

<div class="l-container">
  <Grid direction="column" gap="xl">
    <RegionSelect
      bind:selectedDistrictId
      bind:selectedRegionId
    />

    <Grid break="mobile" fullWidth>
      <MonthSelect
        bind:selectedMonth
        onchange={handleMonthChange}
      />
      <CultureAutocomplete
        bind:selectedCultureId
        bind:selectedCulture
        showCard={false}
      />
    </Grid>

    {#if selectedCulture}
      <CultureCard
        culture={selectedCulture}
        regionId={selectedRegionId}
      />
    {:else}
      <MonthScheduleGrid
        regionId={selectedRegionId}
        month={selectedMonth}
        bind:showFullYear
        bind:selectedActions
      />
    {/if}
  </Grid>
</div>
