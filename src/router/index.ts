import type { App } from 'vue'

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { setupRouterGuard } from './guard'
import { routes } from './routes'

export const router = createRouter({
  history:
    import.meta.env.VITE_HISTORY_MODE === 'hash' ? createWebHashHistory() : createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app: App) {
  setupRouterGuard(router)
  app.use(router)
  await router.isReady()
}
