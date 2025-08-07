import react from '@vitejs/plugin-react-swc'
import path from 'path'
import unocss from 'unocss/vite'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unocss(),
    autoImport({
      include: [/\.[tj]sx?$/],
      dts: './src/auto-imports.d.ts',
      imports: [
        {
          'src/assets/assets': ['Assets'],
        },
      ],
    }),
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
})
