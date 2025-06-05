import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@routes': path.resolve(__dirname, './src/routes/'),
      '@stores': path.resolve(__dirname, './src/stores/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    },
  },
});
