<script lang="ts">
  import { onMount } from 'svelte'
  import Grid from '@/components/Grid.svelte'
  import { getCultureTypeById } from '@/lib/config'
  import { pb } from '@/lib/pocketbase'
  import type { CultureRecord } from '@/types/cultivo'
  import type WaInput from '@awesome.me/webawesome/dist/components/input/input.js'
  import type WaPopup from '@awesome.me/webawesome/dist/components/popup/popup.js'

  let {
    selectedCultureId = $bindable(''),
    selectedCulture = $bindable<CultureRecord | null>(null),
    cultures = $bindable<CultureRecord[]>([]),
    label = 'Cultura',
    placeholder = 'Pesquisar cultura...',
    onchange,
    onselect
  }: {
    selectedCultureId?: string
    selectedCulture?: CultureRecord | null
    cultures?: CultureRecord[]
    label?: string
    placeholder?: string
    onchange?: (detail: { culture: CultureRecord | null }) => void
    onselect?: (detail: { culture: CultureRecord }) => void
  } = $props()

  let inputEl = $state<WaInput | null>(null)
  let popupEl = $state<WaPopup | null>(null)
  let containerEl = $state<HTMLElement | null>(null)
  let searchQuery = $state('')
  let isOpen = $state(false)
  let isLoading = $state(false)
  let highlightedIndex = $state(-1)

  function normalize(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
  }

  const filteredCultures = $derived.by(() => {
    const q = normalize(searchQuery)
    if (!q) {
      return cultures
    }
    return cultures.filter((c) => {
      const nameMatch = normalize(c.name).includes(q)
      const variantMatch = c.variant ? normalize(c.variant).includes(q) : false
      const typeInfo = getCultureTypeById(c.type)
      const typeMatch = typeInfo ? normalize(typeInfo.name).includes(q) : false
      return nameMatch || variantMatch || typeMatch
    })
  })

  function formatCultureLabel(culture: CultureRecord): string {
    return culture.variant ? `${culture.name} (${culture.variant})` : culture.name
  }

  function syncInputValue(val: string) {
    if (inputEl && inputEl.value !== val) {
      inputEl.value = val
    }
  }

  $effect(() => {
    if (selectedCultureId) {
      if (!selectedCulture || selectedCulture.id !== selectedCultureId) {
        const found = cultures.find((c) => c.id === selectedCultureId)
        if (found) {
          selectedCulture = found
          searchQuery = formatCultureLabel(found)
          syncInputValue(searchQuery)
        }
      }
    } else if (!selectedCultureId && selectedCulture) {
      selectedCulture = null
      searchQuery = ''
      syncInputValue('')
    }
  })

  $effect(() => {
    if (popupEl) {
      popupEl.active = isOpen
    }
  })

  function handleInput(event: Event) {
    const target = event.target as HTMLElement & { value: string }
    searchQuery = target.value
    isOpen = true
    highlightedIndex = -1

    if (selectedCulture && formatCultureLabel(selectedCulture) !== searchQuery) {
      selectedCulture = null
      selectedCultureId = ''
      onchange?.({ culture: null })
    }
  }

  function handleFocus() {
    isOpen = true
  }

  function handleClear() {
    searchQuery = ''
    syncInputValue('')
    selectedCulture = null
    selectedCultureId = ''
    isOpen = false
    highlightedIndex = -1
    onchange?.({ culture: null })
  }

  function selectCulture(culture: CultureRecord) {
    selectedCulture = culture
    selectedCultureId = culture.id
    searchQuery = formatCultureLabel(culture)
    syncInputValue(searchQuery)
    isOpen = false
    highlightedIndex = -1
    onchange?.({ culture })
    onselect?.({ culture })
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!isOpen) {
        isOpen = true
      } else if (filteredCultures.length > 0) {
        highlightedIndex = (highlightedIndex + 1) % filteredCultures.length
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (isOpen && filteredCultures.length > 0) {
        highlightedIndex =
          (highlightedIndex - 1 + filteredCultures.length) % filteredCultures.length
      }
    } else if (event.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredCultures.length) {
        event.preventDefault()
        selectCulture(filteredCultures[highlightedIndex])
      }
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (containerEl && !containerEl.contains(event.target as Node)) {
      isOpen = false
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleClickOutside)
    }

    if (cultures.length === 0) {
      isLoading = true
      pb.collection('cultures')
        .getFullList<CultureRecord>({ sort: 'name' })
        .then((records) => {
          cultures = records
          if (selectedCultureId && !selectedCulture) {
            const found = records.find((c) => c.id === selectedCultureId)
            if (found) {
              selectedCulture = found
              searchQuery = formatCultureLabel(found)
              syncInputValue(searchQuery)
            }
          }
        })
        .catch((error) => {
          console.error('Erro ao carregar culturas:', error)
        })
        .finally(() => {
          isLoading = false
        })
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', handleClickOutside)
      }
    }
  })
</script>

<Grid direction="column" gap="l">
  <div bind:this={containerEl}>
    <wa-popup
      bind:this={popupEl}
      placement="bottom-start"
      sync="width"
      flip
      shift
      auto-size="vertical"
      distance="4"
    >
      <wa-input
        slot="anchor"
        bind:this={inputEl}
        role="combobox"
        tabindex="0"
        aria-expanded={isOpen}
        aria-controls="culture-listbox"
        aria-autocomplete="list"
        {label}
        {placeholder}
        value={searchQuery}
        with-clear
        oninput={handleInput}
        onwa-input={handleInput}
        onfocus={handleFocus}
        onwa-focus={handleFocus}
        onkeydown={handleKeydown}
        onwa-clear={handleClear}
      >
        <wa-icon slot="start" name="magnifying-glass"></wa-icon>
        {#if isLoading}
          <wa-spinner slot="end"></wa-spinner>
        {/if}
      </wa-input>

      {#if isOpen}
        <wa-card id="culture-listbox" role="listbox">
          {#if isLoading}
            <Grid align="center" gap="s">
              <wa-spinner></wa-spinner>
              <p>A carregar culturas...</p>
            </Grid>
          {:else if filteredCultures.length === 0}
            <p>Nenhuma cultura encontrada.</p>
          {:else}
            <wa-scroller>
              <Grid direction="column" gap="xs">
                {#each filteredCultures as culture, index}
                  <wa-dropdown-item
                    role="option"
                    tabindex="-1"
                    aria-selected={highlightedIndex === index}
                    value={culture.id}
                    active={highlightedIndex === index}
                    onmouseenter={() => (highlightedIndex = index)}
                    onclick={() => selectCulture(culture)}
                    onkeydown={(event: KeyboardEvent) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        selectCulture(culture)
                      }
                    }}
                  >
                    <wa-icon slot="icon" name="seedling"></wa-icon>
                    {culture.name}
                    {#if culture.variant}
                      <span slot="details">({culture.variant})</span>
                    {/if}
                  </wa-dropdown-item>
                {/each}
              </Grid>
            </wa-scroller>
          {/if}
        </wa-card>
      {/if}
    </wa-popup>
  </div>

  {#if selectedCulture}
    <wa-card>
      <Grid justify="space-between" align="center" wrap={true}>
        <Grid align="center" gap="s">
          <wa-icon name="seedling"></wa-icon>
          <strong>{selectedCulture.name}</strong>
          {#if selectedCulture.variant}
            <span>({selectedCulture.variant})</span>
          {/if}
        </Grid>
        <wa-badge variant="brand">
          {getCultureTypeById(selectedCulture.type)?.name ?? selectedCulture.type}
        </wa-badge>
      </Grid>
    </wa-card>
  {/if}
</Grid>
