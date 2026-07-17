import type { App } from 'vue'

import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export * from './config'

export const setupStore = (app: App) => {
  const pinia = createPinia()
  pinia.use(createPersistedState())
  app.use(pinia)
  return pinia
}
