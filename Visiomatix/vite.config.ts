import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // SWC React plugin
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  // React SWC plugin
    svgr(),   // SVGR plugin for SVG as React components
  ],
  define: {
    global: "globalThis", // required for some libraries
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080", // forward API requests to backend
    },
  },
  resolve: {
    alias: {
      "@": "/src", // optional, for easier imports
    },
  },
});