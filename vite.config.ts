import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import { name } from './package.json'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') as unknown as ImportMetaEnv

  const { VITE_BASE_URL, VITE_CDN_PATH, VITE_ENABLE_CDN } = env

  const isProd = mode === 'production'

  const baseConfig: UserConfig = {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/mixin.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        dts: 'src/typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
        imports: [
          'vue',
          {
            'vue-router': ['useRouter', 'useRoute'],
          },
          'pinia',
        ],
      }),
      Components({
        dts: 'src/typings/components.d.ts',
        resolvers: [
          IconsResolver({
            customCollections: ['svg-icons'],
            // prefix: 'icon',
            prefix: false,
          }),
        ],
      }),
      Icons({
        autoInstall: false,
        compiler: 'vue3',
        customCollections: {
          'svg-icons': FileSystemIconLoader('src/assets/svg-icons', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
        defaultStyle: 'display:inline-block; width: 1.2em; height: 1.2em;',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }

  if (!isProd) {
    return mergeConfig(baseConfig, {
      preview: {
        host: true,
        open: true,
        port: 4000,
      },
      server: {
        host: true,
        open: true,
        port: 8080,
      },
    })
  }

  return mergeConfig(baseConfig, {
    base: VITE_ENABLE_CDN === 'true' ? `${VITE_CDN_PATH}${name}` : VITE_BASE_URL,
    build: {
      rolldownOptions: {
        output: {
          assetFileNames: ({ name }: { name?: string }) => {
            if (name && /\.(css)$/.test(name)) {
              return 'css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
          chunkFileNames: 'js/[name]-[hash].js',
          codeSplitting: {
            groups: [
              {
                name: 'vue-router',
                test: /\/vue-router/,
              },
              {
                name: 'pinia',
                test: /\/pinia/,
              },
              {
                name: 'vue',
                test: /\/vue/,
              },
            ],
          },
          entryFileNames: 'js/[name]-[hash].js',
          minify: {
            compress: {
              dropConsole: true,
              dropDebugger: true,
            },
          },
        },
      },
      sourcemap: true,
    },
  })
})
