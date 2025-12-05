import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis', // required for some libraries
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080', // forward API requests to backend
    },
  },
  resolve: {
    alias: {
      '@': '/src', // optional, for easier imports
    },
  },
})
