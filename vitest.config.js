import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      reporter: ['text', 'html'], // Generate text and HTML reports
      include: ['src/**/*.vue'], // Include files to test
      exclude: ['node_modules/', 'tests/'], // Exclude certain directories
    },
  },
});
