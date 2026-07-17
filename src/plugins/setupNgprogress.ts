import type { App } from 'vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { router } from '@/router'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
})

export function install(_app: App) {
  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    NProgress.done()
  })

  router.onError(() => {
    NProgress.done()
  })
}
