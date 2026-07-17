interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_CDN_PATH: string
  readonly VITE_ENABLE_CDN: string
  readonly VITE_ENABLE_MOCK: string
  readonly VITE_MOCK_URL: string
  readonly VITE_ROUTER_MODE: 'hash' | 'history'
}
