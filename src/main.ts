import '@/styles/main.scss'

import type { App } from 'vue'

import AppContainer from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './stores'

async function bootstrap() {
  const app = createApp(AppContainer)

  /* 注册模块 指令和静态资源 */
  Object.values(
    import.meta.glob<{ install: (app: App) => void }>('./plugins/*.ts', {
      eager: true,
    }),
  ).map((i) => app.use(i))

  setupStore(app)
  await setupRouter(app)

  app.mount('#app')
}

void bootstrap()
