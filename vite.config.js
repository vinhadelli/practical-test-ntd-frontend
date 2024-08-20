import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
// import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    setupFiles: './vitest.setup.js',
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.test.{js,ts}'],
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
  }
})
