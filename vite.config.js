import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://upgraded-space-pancake-jj754pjj56q924j4-8000.app.github.dev',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})