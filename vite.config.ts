import react from '@vitejs/plugin-react-swc'
import path from 'path'
import unocss from 'unocss/vite'
import autoImportPlugin from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const autoImport = autoImportPlugin({
  include: [/\.[tj]sx?$/],
  imports: [
    'react',
    {
      'src/assets/assets': ['Assets'],
      '@gitborlando/widget': ['Flex', 'Icon'],
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
        additionalData: `@import "src/style/mixin.less";`,
        javascriptEnabled: true,
      },
    },
  },
})
