import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env.REACT_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.REACT_GOOGLE_MAPS_API_KEY),
  },
  build: {
    rollupOptions: {
      input: '/src/main.jsx'
    }
  }
});