import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'
//vue
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), ElementPlus({})],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
