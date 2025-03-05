import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080", // L'URL de ton app Vue.js
    supportFile: false,
  },
});