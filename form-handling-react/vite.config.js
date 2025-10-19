// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // ✅ parse JSX in all JS files
    include: /src\/.*\.js$/, // ✅ include all .js files in src
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // ✅ also handle JSX in dependencies
      },
    },
  },
})
