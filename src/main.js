import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import pinia from './store'

createApp(App).use(router).user(pinia).mount('#app')