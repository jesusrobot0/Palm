# Palm 🏝 — Universal Clipboard P2P (Alpha)

**Palm** es una aplicación experimental de sincronización de portapapeles entre dispositivos **Mac** y **Windows** conectados a la misma red local.

Este proyecto busca replicar un "Universal Clipboard" local, 100% privado, sin servidores externos, usando WebSockets y arquitectura distribuida embebida.

## ⚙️ Tecnologías

- **Monorepo:** Turborepo + NPM Workspaces
- **Core:** Node.js (20.x), WebSockets (`ws`)
- **UI:** React + Tauri (Vite, Typescript)
- **Empaquetado:** Tauri build (Rust backend)
- **Arquitectura:** P2P (Client ↔ Server Local)

