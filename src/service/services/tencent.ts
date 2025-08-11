import { jsonParse } from '@gitborlando/utils'
import COS from 'cos-js-sdk-v5'
import { Axios$ } from 'src/service/axios'
import { getTimePrefix } from 'src/utils/common'

class TencentService implements Service {
  readonly name = 'tencent'

  constructor() {
    makeAutoObservable(this)
  }

  get baseUrl() {
    return 'https://api.github.com'
  }

  cos = new COS({})

  setup() {}

  createBaseItem(name: string) {
    const timePrefix = getTimePrefix()
    return { name, id: name, timePrefix }
  }

  getItemUrl(id: string) {
    return `https://test.gitborlando.com/${id}`
  }

  async loadInfo() {
    const [res, err] = await to(
      this.cos.getObject({
        Bucket: 'test-1303161364',
        Region: 'ap-guangzhou',
        Key: 'data.json',
      }),
    )
    if (err) {
      return { images: {} } as InfoJson
    } else {
      let json = jsonParse(res?.Body)
      if (json) return json
      return { images: {} } as InfoJson
    }
  }

  async updateInfo(info: InfoJson) {
    const [res, err] = await to(
      this.cos.putObject({
        Bucket: 'test-1303161364',
        Region: 'ap-guangzhou',
        Key: 'data.json',
        Body: JSON.stringify(info),
      }),
    )
    if (err) console.log(err)
  }

  async uploadFile(name: string, id: string, file: File) {
    const [res, err] = await to(
      this.cos.putObject({
        Bucket: 'test-1303161364',
        Region: 'ap-guangzhou',
        Key: id,
        Body: file,
        onProgress: (progressData) => {},
      }),
    )
    if (err) throw err
  }

  async removeFile(id: string) {
    const [res, err] = await to(Axios$.post('/delete', { id }))
  }
}

export const Tencent = new TencentService()
