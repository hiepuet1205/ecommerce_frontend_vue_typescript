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
      path: '/forgot-password',
      name: 'ForgotPasswordPage',
      component: () => import('./pages/ForgotPasswordPage/ForgotPasswordPage.vue'),
    },
    {
      path: '/reset-password/:token',
      name: 'ResetPasswordPage',
      component: () => import('./pages/ResetPasswordPage/ResetPasswordPage.vue'),
    },
    {
      path: '/update-password/',
      name: 'UpdatePasswordPage',
      component: () => import('./pages/UpdatePasswordPage/UpdatePasswordPage.vue'),
    },
    {
      path: '/order/delivery',
      name: 'OrderDeliveryPage',
      component: () => import('./pages/DeliveryPage/DeliveryPage.vue'),
    },
    {
      path: '/order/success',
      name: 'OrderSuccessPage',
      component: () => import('./pages/OrderSuccessPage/OrderSuccessPage.vue'),
    },
    {
      path: '/order/',
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
          name: 'AdminUserPage',
          component: () => import('./pages/Admin/UserPage/UserPage.vue')
        },
        {
          path: 'product',
          name: 'AdminProductPage',
          component: () => import('./pages/Admin/ProductPage/ProductPage.vue')
        },
        {
          path: 'type',
          name: 'AdminTypePage',
          component: () => import('./pages/Admin/TypePage/TypePage.vue')
        }
      ]
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ['LoginPage', 'RegisterPage', 'ForgotPasswordPage', 'HomePage', 'ProductPage', 'ResetPasswordPage']
  const adminPages = ['AdminUserPage', 'AdminProductPage']

  console.log(to.name);
  if (to.name && !publicPages.includes(to.name as string) && !authStore.getIsAuthenticated) {
    next({ name: 'LoginPage' });
  } else if (adminPages.includes(to.name as string) && !authStore.getIsAdmin) {
    next({ name: 'HomePage' });
  } else {
    next();
  }
})

export default router;
