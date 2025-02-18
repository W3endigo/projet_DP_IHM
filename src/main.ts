import { createApp } from 'vue';
import App from './app.vue';
import router from './router/index.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importez les styles CSS



const app = createApp(App);
app.use(router);
app.mount('#app');
