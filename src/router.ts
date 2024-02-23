import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './store/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('./pages/HomePage/HomePage.vue'),
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('./pages/LoginPage/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: () => import('./pages/RegisterPage/RegisterPage.vue'),
    },
    {
      path: '/order',
      name: 'OrderPage',
      component: () => import('./pages/OrderPage/OrderPage.vue'),
    },
    {
      path: '/product/:id',
      name: 'ProductPage',
      component: () => import('./pages/ProductPage/ProductPage.vue'),
    },
    {
      path: '/profile',
      name: 'ProfilePage',
      component: () => import('./pages/ProfilePage/ProfilePage.vue'),
    },
    {
      path: '/admin',
      children: [
        {
          path: 'user',
          component: () => import('./pages/Admin/UserPage/UserPage.vue')
        },
        {
          path: 'product',
          component: () => import('./pages/Admin/ProductPage/ProductPage.vue')
        }
      ]
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ['LoginPage', 'RegisterPage', 'HomePage', 'ProductPage']
  if (to.name && !publicPages.includes(to.name as string) && !authStore.getIsAuthenticated) next({ name: 'LoginPage' })
  else next()
})

export default router;
