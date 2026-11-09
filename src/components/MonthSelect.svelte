<script lang="ts">
  import { MONTHS, getMonthById } from '@/lib/config'
  import type { MonthInfo, MonthNumber } from '@/types/cultivo'
  import type WaSelect from '@awesome.me/webawesome/dist/components/select/select.js'

  function getCurrentMonth(): MonthNumber {
    return (new Date().getMonth() + 1) as MonthNumber
  }

  let {
    selectedMonth = $bindable<MonthNumber>(getCurrentMonth()),
    onchange
  }: {
    selectedMonth?: MonthNumber
    onchange?: (detail: { month: MonthInfo | undefined }) => void
  } = $props()

  let selectEl = $state<WaSelect | null>(null)

  $effect(() => {
    if (selectEl && selectEl.value !== String(selectedMonth)) {
      selectEl.value = String(selectedMonth)
    }
  })

  function handleSelectChange(event: Event) {
    const target = event.target as HTMLElement & { value: string }
    const monthNumber = Number(target.value) as MonthNumber
    if (monthNumber >= 1 && monthNumber <= 12) {
      selectedMonth = monthNumber
      onchange?.({ month: getMonthById(monthNumber) })
    }
  }
</script>

<wa-select
  bind:this={selectEl}
  label="Mês"
  value={String(selectedMonth)}
  onchange={handleSelectChange}
  onwa-change={handleSelectChange}
>
  <wa-icon slot="start" name="calendar"></wa-icon>

  {#each MONTHS as month}
    <wa-option value={String(month.id)}>
      {month.name}
    </wa-option>
  {/each}
</wa-select>
