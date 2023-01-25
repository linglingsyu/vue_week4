import { createRouter, createWebHistory } from 'vue-router'
import loginStore from '@/store/loginStore.js'
import Home from '@/views/productView.vue'
import Login from '@/views/LoginView.vue'
const history = createWebHistory('/vue_week4')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/product/1',
    meta: { requiresAuth: true },
  },
  {
    path: '/product',
    name: 'product',
    component: Home,
    meta: { requiresAuth: true },
    redirect: '/product/1',
  },
  {
    path: '/product/:page',
    name: 'productPage',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({ history, routes })

router.beforeEach(async (to, from) => {
  const requiresAuth = to.meta.requiresAuth
  if (requiresAuth) {
    const auth = loginStore()
    const check = await auth.checkLogin()
    // console.log(check)
    if (!check) {
      return '/login'
    }
  }
})

export default router
