# O Que Cultivar

A simple PWA for small Portuguese farmers to know when to plant what.

---

## 🎯 Overview

**O Que Cultivar** helps small farmers across Portugal easily identify which crops can be sown, transplanted, or harvested depending on their geographical region and the time of year.

Built with **SvelteKit** and **PocketBase**, styled using **WebAwesome** web components and a zero-framework modular CSS layout system.

---

## 📚 Project Documentation

- **Database:** See [database.md](./docs/database.md) for table structure and schema guidelines.
- **Interface:** See [interface.md](./docs/interface.md) for UI layout, regional divisions, and views.

---

## ✨ Key Features

- **⚡ Modern Frontend:** Built with [SvelteKit 2](https://kit.svelte.dev/) and [Svelte 5](https://svelte.dev/) with runes and reactive primitives.
- **🗄️ Integrated Backend:** [PocketBase](https://pocketbase.io/) embedded SQLite database, realtime events, and Admin UI.
- **🎨 Design System & Web Components:** Standardized accessible UI elements powered by [WebAwesome](https://webawesome.com/).
- **📐 Layout System:** Purpose-built, lightweight `Grid.svelte` component for structured, responsive layouts.
- **🐳 Production Ready:** Multi-stage `Dockerfile` and `docker-compose.yml` pre-configured for Coolify and Docker environments.
- **🛠️ Type Safety & Tooling:** Strict checking with TypeScript and `svelte-check`.

---

## 🚀 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [SvelteKit 2](https://kit.svelte.dev/) / [Svelte 5](https://svelte.dev/) | Application framework with SSR |
| **Backend / DB** | [PocketBase](https://pocketbase.io/) | SQLite backend & Admin dashboard |
| **UI Components** | [WebAwesome](https://webawesome.com/) | Standardized, accessible Web Components |
| **Styling** | Modular Vanilla CSS | CSS tokens, reset, elements, and layout utilities |
| **Package Manager** | [PNPM](https://pnpm.io/) | Package manager |
| **Containerization** | [Docker](https://www.docker.com/) & Docker Compose | Service orchestration |
| **Deployment** | [Coolify](https://coolify.io/) | Self-hosted PaaS deployment target |

---

## 📖 Development & Getting Started

Looking to run this project locally or understand the coding conventions?

👉 Check out the [Development Guide (DEVELOPMENT.md)](DEVELOPMENT.md) for:
- Environment setup and prerequisites
- Running PocketBase and the local dev server
- Layout system (`Grid.svelte`) usage and UI guidelines
- Docker deployment instructions

---

## 📄 License

Distributed under the [GPL-3.0](LICENSE) License.
