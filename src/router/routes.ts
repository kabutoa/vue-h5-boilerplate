import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
    },
    name: 'home',
    path: '/',
  },
  {
    component: () => import('@/views/about/index.vue'),
    meta: {
      title: '关于',
    },
    name: 'about',
    path: '/about',
  },
  {
    component: () => import('@/views/list/index.vue'),
    meta: {
      title: '列表',
    },
    name: 'list',
    path: '/list',
  },
  {
    component: () => import('@/views/detail/index.vue'),
    meta: {
      title: '详情',
    },
    name: 'detail',
    path: '/detail/:id',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]
