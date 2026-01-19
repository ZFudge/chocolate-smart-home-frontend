import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://csm-nginx:80',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://csm-nginx:80',
        changeOrigin: true,
        ws: true,
      },
    }
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
