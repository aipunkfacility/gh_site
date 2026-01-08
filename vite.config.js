import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gh_site/', 
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // Основной алиас на src
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Дополнительные алиасы для совместимости с твоим кодом
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  }
})
