import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importez les styles CSS

createApp(App).use(router).mount('#app');