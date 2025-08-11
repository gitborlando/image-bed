import { Delete } from '@gitborlando/utils'
import sizeOf from 'image-size'
import { produce } from 'immer'
import { getColor, getTimePrefix } from 'src/utils/common'

class AdaptorService {
  info: InfoJson = {
    images: {},
  }

  images: ImageItem[] = []

  services = new Map<string, Service>()
  service!: Service

  constructor() {
    makeAutoObservable(this, {
      info: observable.ref,
      images: observable.ref,
    })
  }

  install(service: Service) {
    this.services.set(service.name, service)
  }

  use(service: Service) {
    this.service = service
    this.service.setup()
  }

  createBaseItem(name: string) {
    name = `${getTimePrefix()}/${name}`
    return this.service.createBaseItem(name)
  }

  getItemUrl(id: string) {
    return this.service.getItemUrl(id)
  }

  async createImageItem(name: string, buffer: ArrayBuffer) {
    const base = this.createBaseItem(name)
    const { width, height } = sizeOf(new Uint8Array(buffer))
    const ratio = width / height
    const originSize = `${(buffer.byteLength / 1024 / 1024).toFixed(2)}MB`
    const color = await getColor(buffer)
    const item: ImageItem = Object.assign(base, {
      type: 'image' as const,
      ratio,
      originSize,
      color,
    })
    return item
  }

  async loadInfo() {
    const [res, err] = await to(this.service.loadInfo())
    if (err) return console.error(err)
    this.info = res!
    await this.loadImages()
    this.mockUpload()
  }

  async updateInfo() {
    const [res, err] = await to(this.service.updateInfo(this.info))
    if (err) return console.error(err)
  }

  async loadImages() {
    const times = Object.keys(this.info.images).sort()
    const images = times.map((time) => this.info.images[time])
    this.images = images.flat()
  }

  async addItem(item: Item, file: File) {
    const [res, err] = await to(this.service.uploadFile(item.name, item.id, file))
    if (err) return console.error(err)

    this.info = produce(this.info, (draft) => {
      let arr = draft.images[item.timePrefix]
      if (!arr) {
        draft.images[item.timePrefix] = arr = [] as ImageItem[]
      }
      arr.push(item)
    })

    this.images = produce(this.images, (draft) => {
      draft.unshift(item)
    })
    return res!
  }

  async removeItem(item: Item) {
    const [res, err] = await to(this.service.removeFile(item.id))
    if (err) return console.error(err)

    this.images = produce(this.images, (draft) => {
      Delete(draft, (i) => i.id === item.id)
    })

    const time = item.id.split('-')[0]
    this.info = produce(this.info, (draft) => {
      Delete(draft.images[time], (i) => i.id === item.id)
    })
    return res!
  }

  async mockUpload() {
    const input = document.getElementById('input') as HTMLInputElement
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const buffer = await file.arrayBuffer()
      const item = await this.createImageItem(file.name, buffer)
      await this.addItem(item, file)
      await this.updateInfo()
    }
  }
}

export const Adaptor = new AdaptorService()
