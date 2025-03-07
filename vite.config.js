import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    commonjsOptions: {
      include: [/axios/, /react/, /react-dom/, /react-router-dom/],
      transformMixedEsModules: true
    }
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['axios', 'react', 'react-dom', 'react-router-dom']
  },
  resolve: {
    dedupe: ['axios']
  }
});

