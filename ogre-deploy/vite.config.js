import { defineConfig } from 'vite'
export default defineConfig({
  root: 'dist',
  build: { outDir: 'dist', rollupOptions: { input: 'dist/index.html' } },
  server: { port: 4173 }
})
