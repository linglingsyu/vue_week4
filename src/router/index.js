import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'

let history = createWebHistory()
let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

export default createRouter({ history, routes })