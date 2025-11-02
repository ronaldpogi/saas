import { createRouter, createWebHistory, RouterView } from 'vue-router'
import authRoutes from '@/modules/auth/router/index'
import dashboardRoutes from '@/modules/dashboard/router/index'

const routes = [
  {
    path: '/',
    component: RouterView, // 👈 provides a <router-view/> for children
    children: authRoutes
  },
  {
    path: '/',
    component: RouterView, // 👈 provides a <router-view/> for children
    children: dashboardRoutes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
