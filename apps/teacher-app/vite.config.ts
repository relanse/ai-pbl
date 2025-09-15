import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'
//vue
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), ElementPlus({})],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.161.31.12:8888', // 目标url
        changeOrigin: true, // 支持跨域
        rewrite: path => path.replace(/^\/api/, '')
        // 重写路径,替换/api
      }
    },
    host: true // 允许内网访问
  }
})
