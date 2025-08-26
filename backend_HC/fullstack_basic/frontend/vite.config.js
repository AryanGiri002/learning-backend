import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // The key is the context path to match
      '/api': {
        // The target is your backend server
        target: 'http://localhost:3000',
        // This is necessary for virtual hosted sites
        changeOrigin: true,
        // This rewrites the path, removing '/api'
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
