<script lang="ts">
  import Grid from '@/components/Grid.svelte'
  import '@awesome.me/webawesome/dist/components/copy-button/copy-button.js'

  // Component properties
  interface Props {
    code: string
    language?: string
  }

  let { code, language }: Props = $props()
</script>

<wa-card>
  <Grid direction="column" gap="s">
    <Grid justify="space-between" align="center">
      {#if language}
        <small>{language}</small>
      {:else}
        <span></span>
      {/if}
      <wa-copy-button value={code}></wa-copy-button>
    </Grid>
    <pre><code>{code}</code></pre>
  </Grid>
</wa-card>
