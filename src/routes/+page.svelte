<script lang="ts">
  import Grid from '@/components/Grid.svelte'
  import HeadMeta from '@/components/HeadMeta.svelte'
  import RegionSelect from '@/components/RegionSelect.svelte'
  import type { RegionId } from '@/types/cultivo'

  let selectedDistrictId = $state('')
  let selectedRegionId = $state<RegionId | null>(null)
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
  </Grid>
</div>
