import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    component: () => import('@/views/home/index.vue'),
    name: 'home',
    path: '/',
  },
  {
    component: () => import('@/views/about/index.vue'),
    name: 'about',
    path: '/about',
  },
  {
    component: () => import('@/views/list/index.vue'),
    name: 'list',
    path: '/list',
  },
  {
    component: () => import('@/views/detail/index.vue'),
    name: 'detail',
    path: '/detail/:id',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export default routes
