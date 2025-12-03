import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const { PORT = 3000} = process.env;

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/portfolio/' : '/',
  server:{
 proxy:{
 '/api':{
 target:`http://localhost:${PORT}`,
 changeOrigin: true,
 },
 '/auth': {
 target:`http://localhost:${PORT}`,
 changeOrigin: true,
 },
 },
 },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: "./index.html",
    },
  },
}))
