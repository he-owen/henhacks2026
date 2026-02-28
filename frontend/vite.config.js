import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  envDir: '..', // load .env from repo root (for VITE_AUTH0_*, etc.)
  server: {
    host: true,
    port: 5173,
  },
});
