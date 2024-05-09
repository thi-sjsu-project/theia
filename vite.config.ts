import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    checker({
      typescript: true,
      // eslint: { lintCommand: 'eslint src' },
      overlay: false,
    }),
  ],
  //server: {
  //  open: true,
  //},
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
