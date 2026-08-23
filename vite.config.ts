import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    // Keeps the browser same-origin with the Spring API, so the backend needs no
    // CORS configuration for local development.
    proxy: {
      '/api': {
        target: process.env.JUDGIFY_API_URL ?? 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
