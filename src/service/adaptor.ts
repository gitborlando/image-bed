import { Delete } from '@gitborlando/utils'
import { produce } from 'immer'

class AdaptorService {
  info: InfoJson = {
    images: {},
  }

  images: ImageObject[] = []

  services = new Map<string, Service>()
  service!: Service

  constructor() {
    makeAutoObservable(this, {
      info: observable.ref,
      images: observable.ref,
    })
  }

  use(name: string, service: Service) {
    this.services.set(name, service)
  }

  setService(name: string) {
    this.service = this.services.get(name)!
    this.service.setup()
  }

  async loadInfo() {
    const [res, err] = await to(this.service.loadInfo())
    if (err) return console.error(err)
    this.info = res!
    this.loadImages()
  }

  async loadImages() {
    const times = Object.keys(this.info.images).sort()
    const images = times.map((time) => this.info.images[time])
    this.images = images.flat()
  }

  async addItem(item: Item) {
    const [res, err] = await to(this.service.addItem(item))
    if (err) return console.error(err)
    this.info.images[item.timestamp] = [
      ...(this.info.images[item.timestamp] || []),
      item,
    ]
    return res!
  }

  async removeItem(item: Item) {
    const [res, err] = await to(this.service.removeItem(item))
    if (err) return console.error(err)

    this.images = produce(this.images, (draft) => {
      Delete(draft, (i) => i.id === item.id)
    })

    const time = item.id.split('-')[0]
    produce(this.info, (draft) => {
      Delete(draft.images[time], (i) => i.id === item.id)
    })
    return res!
  }
}

export const Adaptor = new AdaptorService()
