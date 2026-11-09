<script lang="ts">
  import { MONTHS, getMonthById } from '@/lib/config'
  import type { MonthInfo, MonthNumber } from '@/types/cultivo'
  import type WaSelect from '@awesome.me/webawesome/dist/components/select/select.js'

  function getCurrentMonth(): MonthNumber {
    return (new Date().getMonth() + 1) as MonthNumber
  }

  let {
    selectedMonth = $bindable<MonthNumber | null>(getCurrentMonth()),
    onchange
  }: {
    selectedMonth?: MonthNumber | null
    onchange?: (detail: { month: MonthInfo | undefined }) => void
  } = $props()

  let selectEl = $state<WaSelect | null>(null)

  $effect(() => {
    const val = selectedMonth ? String(selectedMonth) : ''
    if (selectEl && selectEl.value !== val) {
      selectEl.value = val
    }
  })

  function handleSelectChange(event: Event) {
    const target = event.target as HTMLElement & { value: string }
    const monthNumber = Number(target.value) as MonthNumber
    if (monthNumber >= 1 && monthNumber <= 12) {
      selectedMonth = monthNumber
      onchange?.({ month: getMonthById(monthNumber) })
    } else {
      selectedMonth = null
      onchange?.({ month: undefined })
    }
  }

  function handleClear() {
    selectedMonth = null
    if (selectEl) {
      selectEl.value = ''
    }
    onchange?.({ month: undefined })
  }
</script>

<wa-select
  bind:this={selectEl}
  label="Mês"
  value={selectedMonth ? String(selectedMonth) : ''}
  placeholder="Todos os meses"
  with-clear
  clearable
  onchange={handleSelectChange}
  onwa-change={handleSelectChange}
  onwa-clear={handleClear}
>
  <wa-icon slot="start" name="calendar"></wa-icon>

  {#each MONTHS as month}
    <wa-option value={String(month.id)}>
      {month.name}
    </wa-option>
  {/each}
</wa-select>
