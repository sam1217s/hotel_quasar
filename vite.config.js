import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { quasar,transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {transformAssetUrls}
  }), quasar({
    sassVariables: fileURLToPath(
      new URL('./src/quasar-variables.sass', import.meta.url)
    )
})
]
})

