import type { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  router.onError(() => {
    console.error('Router error')
  })
}
