import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/chemicals': 'http://127.0.0.1:8000',
      '/stories': 'http://127.0.0.1:8000'
    }
  }
})
