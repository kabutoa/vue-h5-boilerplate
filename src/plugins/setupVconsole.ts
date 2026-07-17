import type { App } from 'vue'

export function install(_app: App) {
  if (import.meta.env.MODE === 'development') {
    import('vconsole').then(({ default: VConsole }) => {
      new VConsole()
    })
  }
}
