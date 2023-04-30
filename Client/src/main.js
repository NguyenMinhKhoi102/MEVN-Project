import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const pinia = createPinia();
pinia.use(createPersistedState({}));

createApp(App).use(router).use(pinia).mount('#app');
