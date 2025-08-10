import { jsonFy, jsonParse, matchCase } from '@gitborlando/utils'
import { Github } from 'src/service/services/github'

export interface Setting {
  service: 'github'
  isLogin: boolean
  compress: 'webp' | 'jpeg' | ''
  itemZoom: number
}

class SettingService {
  setting = {
    service: 'github',
    isLogin: false,
    compress: 'webp',
    itemZoom: 1,
  }

  get itemZoom() {
    return this.setting.itemZoom
  }

  constructor() {
    makeAutoObservable(this)

    const setting = localStorage.getItem('setting')
    if (setting) {
      const res = jsonParse(setting)
      if (res) this.setting = res
    }

    this.autoConfigService()
  }

  private autoConfigService() {
    this.autoConfig('service', (value) => {
      this.setting.isLogin = false

      matchCase(value, {
        github: () => {
          Github.setup()
        },
      })
    })
  }

  private autoConfig<K extends keyof Setting>(
    key: K,
    callback?: (value: Setting[K]) => void,
  ) {
    reaction(
      () => this.setting[key] as Setting[K],
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          this.setting[key] = newValue
          callback?.(newValue)
        }
        localStorage.setItem('setting', jsonFy(this.setting)!)
      },
    )
  }
}

export const Setting = new SettingService()
