<script lang="ts">
  import { onMount } from 'svelte'
  import Grid from '@/components/Grid.svelte'
  import {
    SORTED_DISTRICTS,
    getDistrictById,
    getRegionById
  } from '@/lib/config'
  import { findNearestDistrict } from '@/lib/geo'
  import type { RegionId, District, Region } from '@/types/cultivo'
  import type WaSelect from '@awesome.me/webawesome/dist/components/select/select.js'
  import type WaDialog from '@awesome.me/webawesome/dist/components/dialog/dialog.js'

  let {
    selectedDistrictId = $bindable(''),
    selectedRegionId = $bindable<RegionId | null>(null),
    onchange
  }: {
    selectedDistrictId?: string
    selectedRegionId?: RegionId | null
    onchange?: (detail: {
      district: District | undefined
      region: Region | undefined
    }) => void
  } = $props()

  let isDialogOpen = $state(false)
  let isLocating = $state(false)
  let locationError = $state<string | null>(null)
  let selectEl = $state<WaSelect | null>(null)
  let dialogEl = $state<WaDialog | null>(null)

  const selectedDistrict = $derived(
    selectedDistrictId ? getDistrictById(selectedDistrictId) : undefined
  )
  const selectedRegion = $derived(
    selectedDistrict ? getRegionById(selectedDistrict.regionId) : undefined
  )

  function updateSelection(districtId: string) {
    selectedDistrictId = districtId
    const district = getDistrictById(districtId)
    const region = district ? getRegionById(district.regionId) : undefined
    selectedRegionId = region ? region.id : null

    if (typeof window !== 'undefined') {
      if (districtId) {
        localStorage.setItem('oquecultivar_district', districtId)
      } else {
        localStorage.removeItem('oquecultivar_district')
      }
    }

    if (selectEl && selectEl.value !== districtId) {
      selectEl.value = districtId
    }

    onchange?.({ district, region })
  }

  function handleSelectChange(event: Event) {
    const target = event.target as HTMLElement & { value: string }
    locationError = null
    updateSelection(target.value)
  }

  function handleClear() {
    locationError = null
    updateSelection('')
  }

  function handleGeolocate() {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      locationError = 'A geolocalização não é suportada neste navegador.'
      return
    }

    isLocating = true
    locationError = null

    navigator.geolocation.getCurrentPosition(
      (position) => {
        isLocating = false
        const { latitude, longitude } = position.coords
        const nearestDistrict = findNearestDistrict(latitude, longitude)

        if (nearestDistrict) {
          updateSelection(nearestDistrict.id)
        } else {
          locationError =
            'Não foi possível associar a sua localização a uma região de Portugal.'
        }
      },
      (error) => {
        isLocating = false
        switch (error.code) {
          case error.PERMISSION_DENIED:
            locationError = 'Permissão de localização recusada.'
            break
          case error.POSITION_UNAVAILABLE:
            locationError = 'Informação de localização indisponível.'
            break
          case error.TIMEOUT:
            locationError = 'Tempo limite excedido ao obter localização.'
            break
          default:
            locationError = 'Ocorreu um erro ao obter a localização.'
            break
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }
    )
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleGeolocate()
    }
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      isDialogOpen = true
    }
  }

  function handleFooterKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      isDialogOpen = false
    }
  }

  onMount(() => {
    if (!selectedDistrictId && typeof window !== 'undefined') {
      const savedDistrictId = localStorage.getItem('oquecultivar_district')
      if (savedDistrictId && getDistrictById(savedDistrictId)) {
        updateSelection(savedDistrictId)
      }
    }
  })
</script>

<Grid align="center">
  <wa-button
    role="button"
    tabindex="0"
    variant="neutral"
    appearance="outlined"
    onclick={() => (isDialogOpen = true)}
    onkeydown={handleTriggerKeydown}
    full
  >
    <wa-icon slot="start" name="location-dot"></wa-icon>
    {#if selectedDistrict && selectedRegion}
      {selectedDistrict.name} · Região {selectedRegion.id}
    {:else}
      Selecionar distrito
    {/if}
  </wa-button>

  <wa-dialog
    bind:this={dialogEl}
    label="Região da horta"
    open={isDialogOpen || undefined}
    light-dismiss
    onwa-hide={() => (isDialogOpen = false)}
  >
    <Grid direction="column" gap="l">
      <Grid align="end" break="mobile">
        <div data-grow="1">
          <wa-select
            bind:this={selectEl}
            label="Distrito da horta"
            placeholder="Selecione o seu distrito..."
            value={selectedDistrictId}
            clearable
            onchange={handleSelectChange}
            onwa-clear={handleClear}
          >
            <wa-icon slot="start" name="location-dot"></wa-icon>

            {#each SORTED_DISTRICTS as district}
              <wa-option value={district.id}>
                {district.name}
              </wa-option>
            {/each}
          </wa-select>
        </div>

        <div>
          <wa-button
            role="button"
            tabindex="0"
            variant="neutral"
            onclick={handleGeolocate}
            onkeydown={handleKeydown}
            disabled={isLocating}
          >
            {#if isLocating}
              <wa-spinner slot="start"></wa-spinner>
              A detetar...
            {:else}
              <wa-icon slot="start" name="crosshairs" variant="solid"></wa-icon>
              Usar localização atual
            {/if}
          </wa-button>
        </div>
      </Grid>

      {#if locationError}
        <wa-callout variant="warning">
          <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
          {locationError}
        </wa-callout>
      {/if}

      {#if selectedRegion && selectedDistrict}
        <wa-card>
          <Grid justify="space-between" align="center" wrap={true}>
            <Grid align="center" gap="s">
              <wa-badge variant="brand">Região {selectedRegion.id}</wa-badge>
              <strong>{selectedRegion.name}</strong>
            </Grid>
            <wa-badge variant="neutral">{selectedDistrict.name}</wa-badge>
          </Grid>
          <p>{selectedRegion.description}</p>
        </wa-card>
      {/if}
    </Grid>

    <wa-button
      role="button"
      tabindex="0"
      slot="footer"
      variant="brand"
      onclick={() => (isDialogOpen = false)}
      onkeydown={handleFooterKeydown}
    >
      Concluir
    </wa-button>
  </wa-dialog>
</Grid>


<style>
  wa-dialog {
    --width: 60rem;
  }
</style>