import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

import 'bootstrap' // 從nodeModule中載入Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css' // Import css file
// import './style.css'

const app = createApp(App)
app.use(router).use(pinia)
app.mount('#app')
