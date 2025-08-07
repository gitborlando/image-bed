import unoPresetGitborlando from '@gitborlando/uno-preset'
import presetRemToPx from '@unocss/preset-rem-to-px'
import {
  defineConfig,
  presetUno,
  transformerCompileClass,
  transformerVariantGroup,
  UserShortcuts,
} from 'unocss'
import { presetCSSVar } from 'unocss-preset-css-var'

const theme = (() => {
  return {
    colors: {
      blue: 'rgb(0,100,250)', //'hsl(var(--hue) 100% 60%)',
      bgGray: 'hsl(217 0% 93%)',
    },
  }
})()

const shortcuts: UserShortcuts = []

export default defineConfig({
  theme,
  shortcuts,
  presets: [
    // @ts-ignore
    presetCSSVar(),
    presetUno(),
    presetRemToPx({ baseFontSize: 4 }),
    unoPresetGitborlando(),
  ],
  transformers: [transformerCompileClass(), transformerVariantGroup()],
})
