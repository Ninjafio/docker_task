import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Адрес докер-контейнера Express наружу
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Срезает /api перед отправкой на бэкенд
      },
    },
  },
})
