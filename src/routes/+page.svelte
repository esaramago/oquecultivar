<script lang="ts">
  import CultureAutocomplete from '@/components/CultureAutocomplete.svelte'
  import CultureCard from '@/components/CultureCard.svelte'
  import Grid from '@/components/Grid.svelte'
  import HeadMeta from '@/components/HeadMeta.svelte'
  import MonthScheduleGrid from '@/components/MonthScheduleGrid.svelte'
  import MonthSelect from '@/components/MonthSelect.svelte'
  import RegionSelect from '@/components/RegionSelect.svelte'
  import type { CultureRecord, MonthNumber, RegionId } from '@/types/cultivo'

  let selectedDistrictId = $state('')
  let selectedRegionId = $state<RegionId | null>(null)
  let selectedMonth = $state<MonthNumber>((new Date().getMonth() + 1) as MonthNumber)
  let selectedCultureId = $state('')
  let selectedCulture = $state<CultureRecord | null>(null)

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
      />
    {/if}
  </Grid>
</div>
