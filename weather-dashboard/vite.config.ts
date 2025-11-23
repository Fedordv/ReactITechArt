import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config';

export default defineConfig({
   base: '/ReactITechArt/',
   test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.ts',
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})