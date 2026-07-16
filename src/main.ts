import '@/styles/main.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

function bootstrap() {
  const app = createApp(App)

  if (import.meta.env.MODE === 'development') {
    import('vconsole').then(({ default: VConsole }) => {
      new VConsole()
    })
  }

  app.use(createPinia()).use(router).mount('#app')
}

bootstrap()
