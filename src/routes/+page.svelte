<script lang="ts">
  import CultureAutocomplete from '@/components/CultureAutocomplete.svelte'
  import Grid from '@/components/Grid.svelte'
  import HeadMeta from '@/components/HeadMeta.svelte'
  import MonthSelect from '@/components/MonthSelect.svelte'
  import RegionSelect from '@/components/RegionSelect.svelte'
  import type { CultureRecord, MonthNumber, RegionId } from '@/types/cultivo'

  let selectedDistrictId = $state('')
  let selectedRegionId = $state<RegionId | null>(null)
  let selectedMonth = $state<MonthNumber>((new Date().getMonth() + 1) as MonthNumber)
  let selectedCultureId = $state('')
  let selectedCulture = $state<CultureRecord | null>(null)
  let activeTab = $state<'mes' | 'cultura'>('mes')

  function handleTabShow(event: Event) {
    const customEvent = event as CustomEvent<{ name: string }>
    if (customEvent.detail?.name === 'mes' || customEvent.detail?.name === 'cultura') {
      activeTab = customEvent.detail.name
    }
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

    <wa-tab-group
      active={activeTab}
      onwa-tab-show={handleTabShow}
    >
      <wa-tab slot="nav" panel="mes" active={activeTab === 'mes' ? true : undefined}>
        Mês
      </wa-tab>
      <wa-tab slot="nav" panel="cultura" active={activeTab === 'cultura' ? true : undefined}>
        Cultura
      </wa-tab>

      <wa-tab-panel name="mes" active={activeTab === 'mes' ? true : undefined}>
        <MonthSelect
          bind:selectedMonth
        />
      </wa-tab-panel>

      <wa-tab-panel name="cultura" active={activeTab === 'cultura' ? true : undefined}>
        <CultureAutocomplete
          bind:selectedCultureId
          bind:selectedCulture
        />
      </wa-tab-panel>
    </wa-tab-group>
  </Grid>
</div>
