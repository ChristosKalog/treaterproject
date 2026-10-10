import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5182,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 200,
    },
    proxy: {
      '/sanity-api': {
        target: 'https://5jp5em7h.api.sanity.io',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/sanity-api/, ''),
      },
    },
  },
})
