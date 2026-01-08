import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // Замени 'gh_site' на имя твоего репозитория, если оно другое
  base: '/gh_site/', 
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // Алиас @ указывает на папку src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
