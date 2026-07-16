interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  /** 项目名称 */
  readonly VITE_APP_TITLE: string
  /** CDN 路径 */
  readonly VITE_CDN_PATH: string
}
