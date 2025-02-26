import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

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
});