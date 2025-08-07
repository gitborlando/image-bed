import { generateAssets } from '@gitborlando/utils'

generateAssets({
  sourceDir: 'src/assets',
  outputFile: 'src/assets/assets.ts',
  watch: true,
})
