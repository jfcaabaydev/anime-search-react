import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 // base: '/anime-search-react/' // must match the GitHub repo name exactly
})
