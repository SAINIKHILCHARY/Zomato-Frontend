import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['axios'],
      output: {
        globals: {
          axios: 'axios'
        }
      }
    }
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['axios', 'react', 'react-dom', 'react-router-dom']
  },
  resolve: {
    alias: {
      'axios': 'axios/dist/axios.js'
    }
  }
});

