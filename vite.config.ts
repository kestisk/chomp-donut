/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4000,
    strictPort: true,
  },
  test: {
    setupFiles: './vitest.setup.ts',
    environment: 'jsdom',
    globals: true,
  },
});
