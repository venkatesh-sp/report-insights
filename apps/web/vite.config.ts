import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const plugins = [react(), tailwindcss()];

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins,
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
