import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('@/views/SplashScreen.vue'),
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/draw',
      name: 'draw',
      component: () => import('@/views/SimpleDrawView.vue'),
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('@/views/ResourcesView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
});

export default router;
