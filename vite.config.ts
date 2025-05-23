import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'msw/node': 'msw/node/index.js',
    },
  },
  build: {
    outDir: 'dist',
  }
})
