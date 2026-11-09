<script lang="ts">
  import Grid from '@/components/Grid.svelte'
  import CodeBlock from '@/components/CodeBlock.svelte'
  import HeadMeta from '@/components/HeadMeta.svelte'
  import '@awesome.me/webawesome/dist/components/callout/callout.js'

  // Code snippets displayed on the page
  const corepackSnippet = 'corepack enable && corepack prepare pnpm@latest --activate'
  const pnpmInstallSnippet = 'pnpm install'
  const cpEnvSnippet = 'cp .env.example .env'
  const pnpmDevSnippet = 'pnpm dev'

  const gridPropsSnippet = `<Grid
  tag="div"              <!-- HTML element tag (default: 'div', e.g. 'section', 'nav', 'ul') -->
  direction="column"     <!-- 'row' | 'column' | 'row-reverse' | 'column-reverse' -->
  align="center"         <!-- 'start' | 'center' | 'end' -->
  justify="space-between"<!-- 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' -->
  gap="l"                <!-- 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' (default: 'm') -->
  wrap={true}            <!-- boolean: enables flex-wrap -->
  break="small"          <!-- 'mobile' (max 767px) | 'small' (max 1023px) stacks into column -->
  fullWidth={true}       <!-- boolean: forces all direct children to width: 100% and flex: 1 -->
>
  <div data-grow="1">Main content</div>
  <div>Sidebar</div>
</Grid>`

  const webAwesomeImportSnippet = `import '@awesome.me/webawesome/dist/components/dialog/dialog.js'`

  const pocketBaseClientSnippet = `<${'script'} lang="ts">
  import { pb, currentUser } from '@/lib/pocketbase'
<${'/script'}>

{#if $currentUser}
  <p>Logged in as: {$currentUser.email}</p>
{/if}`

  const dockerTestingSnippet = `# Build and start both Web app and PocketBase
docker compose up -d --build

# View logs
docker compose logs -f

# Stop containers
docker compose down`

  const dockerStopSnippet = 'docker compose stop pocketbase'
  const dockerResetSnippet = 'docker compose down -v'
  const pnpmCheckSnippet = 'pnpm check'
</script>

<HeadMeta
  title="Development"
  description="Development guide and documentation for O Que Cultivar."
/>

<Grid direction="column" gap="xl">
  <!-- Top Navigation -->
  <Grid justify="space-between" align="center">
    <wa-button variant="neutral" href="/">
      <wa-icon slot="start" name="arrow-left" variant="solid"></wa-icon>
      Home
    </wa-button>
    <wa-button variant="brand" href="https://github.com/esaramago/oquecultivar" target="_blank">
      <wa-icon slot="start" name="star" variant="solid"></wa-icon>
      GitHub
    </wa-button>
  </Grid>

  <!-- Page Header -->
  <Grid direction="column">
    <Grid align="center" gap="s">
      <wa-badge variant="brand">Documentation</wa-badge>
      <wa-badge variant="neutral">Guide</wa-badge>
    </Grid>

    <h1>Development Guide</h1>
    <p>
      This guide details the local setup, workflows, architecture conventions, and deployment procedures for developing applications with <strong>O Que Cultivar</strong>.
    </p>
  </Grid>

  <!-- Getting Started -->
  <Grid direction="column" gap="l">
    <Grid align="center" gap="s">
      <wa-icon name="screwdriver-wrench" variant="solid"></wa-icon>
      <h2>Getting Started</h2>
    </Grid>

    <Grid direction="column">
      <h3>Prerequisites</h3>
      <p>Ensure you have the following installed on your machine:</p>
      <ul>
        <li><strong>Node.js</strong> (v20+ or v22+ LTS recommended)</li>
        <li>
          <Grid direction="column" gap="xs">
            <span><strong>PNPM</strong> (v9+):</span>
            <CodeBlock code={corepackSnippet} language="bash" />
          </Grid>
        </li>
        <li><strong>Docker & Docker Compose</strong> (required to run the local PocketBase container)</li>
      </ul>
    </Grid>

    <Grid direction="column">
      <h3>1. Install Dependencies</h3>
      <CodeBlock code={pnpmInstallSnippet} language="bash" />
    </Grid>

    <Grid direction="column">
      <h3>2. Configure Environment Variables</h3>
      <p>Copy the sample environment file to create your local <code>.env</code>:</p>
      <CodeBlock code={cpEnvSnippet} language="bash" />

      <table class="c-table">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default (Local)</th>
            <th>Production (Coolify)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>POCKETBASE_PORT</code></td>
            <td><code>8090</code></td>
            <td><code>8090</code></td>
            <td>Host port mapped to the PocketBase container</td>
          </tr>
          <tr>
            <td><code>VITE_POCKETBASE_URL</code></td>
            <td><code>http://localhost:8090</code></td>
            <td><code>https://pb.yourdomain.com</code></td>
            <td>Public URL used by the client-side browser to contact PocketBase</td>
          </tr>
        </tbody>
      </table>
    </Grid>

    <Grid direction="column">
      <h3>3. Start the Development Environment</h3>
      <p>Run the development command:</p>
      <CodeBlock code={pnpmDevSnippet} language="bash" />

      <wa-callout variant="neutral">
        <wa-icon slot="icon" name="circle-info"></wa-icon>
        <strong>Note:</strong> The <code>pnpm dev</code> script automatically starts the PocketBase Docker container in the background (<code>docker compose up -d pocketbase</code>) before starting Vite.
      </wa-callout>

      <p>Once started, the following services are available:</p>
      <ul>
        <li><strong>Frontend App:</strong> <a class="c-link" href="http://localhost:5173" target="_blank" rel="noreferrer">http://localhost:5173</a></li>
        <li><strong>PocketBase Admin UI:</strong> <a class="c-link" href="http://localhost:8090/_/" target="_blank" rel="noreferrer">http://localhost:8090/_/</a></li>
        <li><strong>PocketBase API Endpoint:</strong> <a class="c-link" href="http://localhost:8090/api/" target="_blank" rel="noreferrer">http://localhost:8090/api/</a></li>
      </ul>

      <p>When accessing the PocketBase Admin UI for the first time, you will be prompted to create your initial superuser administrator account.</p>
    </Grid>
  </Grid>

  <!-- Available Scripts -->
  <Grid direction="column" gap="l">
    <Grid align="center" gap="s">
      <wa-icon name="scroll" variant="solid"></wa-icon>
      <h2>Available Scripts</h2>
    </Grid>

    <table class="c-table">
      <thead>
        <tr>
          <th>Command</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>pnpm dev</code></td>
          <td>Starts PocketBase via Docker and launches the Vite dev server with HMR</td>
        </tr>
        <tr>
          <td><code>pnpm build</code></td>
          <td>Compiles the production SvelteKit application using <code>@sveltejs/adapter-node</code></td>
        </tr>
        <tr>
          <td><code>pnpm preview</code></td>
          <td>Locally previews the production build output</td>
        </tr>
        <tr>
          <td><code>pnpm check</code></td>
          <td>Synchronizes SvelteKit types and runs static type checks via <code>svelte-check</code></td>
        </tr>
        <tr>
          <td><code>pnpm check:watch</code></td>
          <td>Runs <code>svelte-check</code> in watch mode during active refactoring</td>
        </tr>
      </tbody>
    </table>
  </Grid>

  <!-- Architecture & Development Conventions -->
  <Grid direction="column" gap="l">
    <Grid align="center" gap="s">
      <wa-icon name="compass-drafting" variant="solid"></wa-icon>
      <h2>Architecture & Development Conventions</h2>
    </Grid>
    <p>To maintain code quality and consistency across projects, adhere to the following rules:</p>

    <Grid direction="column">
      <h3>1. Layout & Styling Rules</h3>
      <ul>
        <li><strong>No Tailwind or Utility CSS Frameworks:</strong> Do not install Tailwind or similar utility-class libraries.</li>
        <li><strong>No Inline Styles:</strong> Use component props and existing CSS custom properties.</li>
        <li><strong>Use <code>Grid.svelte</code> for Layouts:</strong> Always use the <code>&lt;Grid&gt;</code> component for structural alignment, flex direction, and spacing instead of writing custom wrapper CSS.</li>
        <li><strong>Avoid Redundant Attributes:</strong> The default <code>gap</code> for <code>&lt;Grid&gt;</code> is <code>m</code>. Avoid writing <code>&lt;Grid gap="m"&gt;</code>.</li>
        <li><strong>Children Flex Grow:</strong> Add <code>data-grow="1"</code> to any direct child of <code>&lt;Grid&gt;</code> to have it expand and fill remaining space.</li>
      </ul>

      <Grid direction="column" gap="xs">
        <h4><code>Grid.svelte</code> Props Reference:</h4>
        <CodeBlock code={gridPropsSnippet} language="svelte" />
      </Grid>
    </Grid>

    <Grid direction="column">
      <h3>2. UI Components (WebAwesome)</h3>
      <ul>
        <li>
          Use <a class="c-link" href="https://webawesome.com/" target="_blank" rel="noreferrer">WebAwesome</a> web components (<code>&lt;wa-button&gt;</code>, <code>&lt;wa-card&gt;</code>, <code>&lt;wa-icon&gt;</code>, <code>&lt;wa-badge&gt;</code>, <code>&lt;wa-input&gt;</code>, etc.) whenever possible.
        </li>
        <li>
          When introducing a new WebAwesome component, register it by importing its JavaScript bundle in <code>src/routes/+layout.svelte</code> (or in the page component where it is used):
        </li>
      </ul>
      <CodeBlock code={webAwesomeImportSnippet} language="ts" />
    </Grid>

    <Grid direction="column">
      <h3>3. Backend & Authentication Flow (PocketBase)</h3>
      <ul>
        <li>
          <strong>Client-Side:</strong> Use the <code>pb</code> instance and the reactive <code>currentUser</code> store from <code>src/lib/pocketbase.ts</code>:
        </li>
      </ul>
      <CodeBlock code={pocketBaseClientSnippet} language="svelte" />

      <ul>
        <li>
          <strong>Server-Side (SSR):</strong> Handled automatically in <code>src/hooks.server.ts</code>. It loads auth cookies from incoming requests, checks token validity, refreshes sessions when possible, and passes <code>event.locals.pb</code> and <code>event.locals.user</code> to SvelteKit endpoints and load functions.
        </li>
      </ul>
    </Grid>
  </Grid>

  <!-- Docker & Coolify Deployment -->
  <Grid direction="column" gap="l">
    <Grid align="center" gap="s">
      <wa-icon name="docker" family="brands"></wa-icon>
      <h2>Docker & Coolify Deployment</h2>
    </Grid>
    <p>This repository is optimized for deployment via <a class="c-link" href="https://coolify.io/" target="_blank" rel="noreferrer">Coolify</a> or Docker Compose.</p>

    <Grid direction="column">
      <h3>Local Testing of Production Build</h3>
      <p>To test the entire containerized stack locally:</p>
      <CodeBlock code={dockerTestingSnippet} language="bash" />

      <p>The production services will be available at:</p>
      <ul>
        <li><strong>Web App:</strong> <a class="c-link" href="http://localhost:3000" target="_blank" rel="noreferrer">http://localhost:3000</a></li>
        <li><strong>PocketBase:</strong> <a class="c-link" href="http://localhost:8090" target="_blank" rel="noreferrer">http://localhost:8090</a></li>
      </ul>
    </Grid>

    <Grid direction="column">
      <h3>Coolify Setup</h3>
      <p>When deploying to Coolify:</p>
      <ol>
        <li><strong>Application Type:</strong> Select <strong>Docker Compose</strong> (pointing to <code>docker-compose.yml</code>) or deploy the SvelteKit app via <strong>Dockerfile</strong> alongside a standalone PocketBase service.</li>
        <li><strong>Persistent Storage:</strong> Ensure the volume <code>pb_data</code> is mounted to <code>/pb_data</code> in the PocketBase container so database records and uploaded files persist across redeployments.</li>
        <li><strong>Environment Variables:</strong> Set production values in Coolify:
          <ul>
            <li><code>VITE_POCKETBASE_URL</code>: Public domain URL (e.g., <code>https://pb.yourdomain.com</code>)</li>
            <li><code>PORT</code>: (Optional, defaults to <code>3000</code>)</li>
          </ul>
        </li>
      </ol>
    </Grid>
  </Grid>

  <!-- Troubleshooting & Tips -->
  <Grid direction="column" gap="l">
    <Grid align="center" gap="s">
      <wa-icon name="wrench" variant="solid"></wa-icon>
      <h2>Troubleshooting & Tips</h2>
    </Grid>

    <ul>
      <li>
        <Grid direction="column" gap="xs">
          <span><strong>PocketBase Port Conflict:</strong> If port <code>8090</code> is already in use on your machine, change <code>POCKETBASE_PORT</code> and <code>VITE_POCKETBASE_URL</code> in <code>.env</code> (e.g. <code>POCKETBASE_PORT=8091</code> and <code>VITE_POCKETBASE_URL=http://localhost:8091</code>).</span>
        </Grid>
      </li>
      <li>
        <Grid direction="column" gap="xs">
          <span><strong>Stopping Background PocketBase:</strong> If you want to stop the local PocketBase service after development:</span>
          <CodeBlock code={dockerStopSnippet} language="bash" />
        </Grid>
      </li>
      <li>
        <Grid direction="column" gap="xs">
          <span><strong>Resetting PocketBase Data:</strong> To start with a fresh database locally, remove the Docker volume:</span>
          <CodeBlock code={dockerResetSnippet} language="bash" />
        </Grid>
      </li>
      <li>
        <Grid direction="column" gap="xs">
          <span><strong>Type Checking:</strong> Run <code>pnpm check</code> before creating pull requests or deploying to catch TypeScript and Svelte syntax errors.</span>
          <CodeBlock code={pnpmCheckSnippet} language="bash" />
        </Grid>
      </li>
    </ul>
  </Grid>
</Grid>
