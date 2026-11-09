<script lang="ts">
  import '@/css/main.css'
  import '@awesome.me/webawesome/dist/styles/webawesome.css'
  import '@awesome.me/webawesome/dist/components/badge/badge.js'
  import '@awesome.me/webawesome/dist/components/button/button.js'
  import '@awesome.me/webawesome/dist/components/button-group/button-group.js'
  import '@awesome.me/webawesome/dist/components/card/card.js'
  import '@awesome.me/webawesome/dist/components/icon/icon.js'
  import '@awesome.me/webawesome/dist/components/select/select.js'
  import '@awesome.me/webawesome/dist/components/option/option.js'
  import '@awesome.me/webawesome/dist/components/divider/divider.js'
  import '@awesome.me/webawesome/dist/components/spinner/spinner.js'
  import '@awesome.me/webawesome/dist/components/callout/callout.js'
  import '@awesome.me/webawesome/dist/components/tab/tab.js'
  import '@awesome.me/webawesome/dist/components/tab-group/tab-group.js'
  import '@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js'
  import '@awesome.me/webawesome/dist/components/input/input.js'
  import '@awesome.me/webawesome/dist/components/popup/popup.js'
  import '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js'
  import '@awesome.me/webawesome/dist/components/scroller/scroller.js'
  import '@awesome.me/webawesome/dist/components/switch/switch.js'
  import Header from '@/components/Header.svelte'
  import Footer from '@/components/Footer.svelte'
  import Grid from '@/components/Grid.svelte'
  import { dev } from '$app/environment'
  import { UMAMI_URL, UMAMI_WEBSITE_ID } from '@/lib/config'

  let { children } = $props()
</script>

<svelte:head>
  {#if !dev && UMAMI_URL && UMAMI_WEBSITE_ID}
    <script
      defer
      src="{UMAMI_URL}/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
    ></script>
  {/if}
</svelte:head>

<Grid direction="column" gap="2xl">
  <Header />
  {@render children?.()}
  <Footer />
</Grid>
