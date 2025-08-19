import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/views/Dashboard/DashboardLayout.vue'
import { useConfigStore } from '@/store/config'

const routes = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('@/views/Dashboard/DashboardHome.vue'),
      },
      {
        path: 'settings',
        name: 'DashboardSettings',
        component: () => import('@/views/Dashboard/DashboardSettings.vue'),
      },
      {
        path: 'notifications',
        name: 'DashboardNotifications',
        component: () => import('@/views/Dashboard/DashboardNotifications.vue'),
      },
      {
        path: 'products',
        name: 'DashboardProducts',
        component: () => import('@/views/Dashboard/DashboardProducts.vue'),
      },
      {
        path: 'docs',
        name: 'DashboardDocs',
        component: () => import('@/views/Dashboard/DashboardDocs.vue'),
      },
      {
        path: 'blog',
        name: 'DashboardBlog',
        component: () => import('@/views/Dashboard/DashboardBlog.vue'),
      },
      {
        path: 'support',
        name: 'DashboardSupport',
        component: () => import('@/views/Dashboard/DashboardSupport.vue'),
      },
      {
        path: 'profile',
        name: 'DashboardProfile',
        component: () => import('@/views/Dashboard/DashboardProfile.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const configStore = useConfigStore()

  if (to.meta.requiresAuth && !configStore.token) {
    return next({ name: 'Login' })
  }

  next()
})

export default router
