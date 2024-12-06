import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir:'./src/custom-sw',
      filename: 'sw.ts'
    })
  ],
  resolve: {
    alias: {
      '@profitlens': path.resolve(__dirname, './src'),
    },
  },
})
