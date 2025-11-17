import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  envPrefix: 'VITE_',
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      port: 5173,
    },
  },
})
