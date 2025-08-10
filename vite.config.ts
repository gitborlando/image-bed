import react from '@vitejs/plugin-react-swc'
import path from 'path'
import unocss from 'unocss/vite'
import autoImportPlugin from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const autoImport = autoImportPlugin({
  include: [/\.[tj]sx?$/],
  imports: [
    'react',
    'mobx',
    'mobx-react-lite',
    {
      'src/assets/assets': ['Assets'],
      '@gitborlando/widget': ['Flex', 'Icon'],
      'src/utils/await-to': ['to'],
      'src/service/adaptor': ['Adaptor'],
    },
  ],
})

export default defineConfig({
  plugins: [react(), unocss(), autoImport],

  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "src/view/style/mixin.less";`,
        javascriptEnabled: true,
      },
    },
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})
