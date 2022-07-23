import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import elementPlus from 'element-plus'
 // <---

createApp(App).use(router).use(elementPlus).mount('#app');
