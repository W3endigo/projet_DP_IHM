import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Assure-toi que "src" est bien pointé
    },
  },
  server: {
    host: '0.0.0.0',  // Permet d’accéder depuis une autre machine sur le réseau
    port: 8080,       // modifie le port du serveur
  },
  test: {
    coverage: {
      reporter: ["text", "html"], // Génère un rapport en texte et HTML
      include: ["src/**/*.vue"],  // Inclut les fichiers à tester
      exclude: ["node_modules/", "tests/"], // Exclut les fichiers de test
    },
  },
});