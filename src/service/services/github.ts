import { nanoid } from '@gitborlando/utils'
import { Axios$ } from 'src/service/axios'
import { getTimePrefix } from 'src/utils/common'

class GithubService implements Service {
  readonly name = 'github'

  token = ''
  owner = ''
  repo = ''
  branch = ''

  constructor() {
    makeAutoObservable(this)
  }

  get baseUrl() {
    return 'http://localhost:3000' //`https://api.github.com`
  }

  setup() {
    Axios$.setupAxios(this.baseUrl, {
      request: (config) => {
        if (config.baseURL?.includes('https://api.github.com') && this.token) {
          config.headers.Authorization = `Bearer ${this.token}`
        }
        return config
      },
    })
  }

  async getUser() {
    const [res, err] = await to(Axios$.get('/user'))
    return res
  }

  async getContent(path: string) {
    const [res, err] = await to(Axios$.get(this.repoApi(path)))
    return res
  }

  async deleteContent(path: string) {
    const [res, err] = await to(Axios$.post(this.repoApi(path), {}))
    return res
  }

  private repoApi(path: string) {
    return `/repos/${this.owner}/${this.repo}${path}`
  }

  async loadInfo() {
    const [res, err] = await to(fetch('data.json'))
    if (err) return
    return await res!.json()
  }

  async updateInfo(info: InfoJson) {
    const [res, err] = await to(Axios$.post(this.repoApi('/info'), info))
  }

  createBaseItem(name: string) {
    const timePrefix = getTimePrefix()
    const id = nanoid(10)
    return { name, id, timePrefix }
  }

  getItemUrl(id: string) {
    return `https://github.com/${this.owner}/${this.repo}/blob/${this.branch}/${id}`
  }

  async uploadFile(name: string, id: string, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('id', id)
    formData.append('name', name)

    const [res, err] = await to(Axios$.post('/upload', formData))
  }

  async removeFile(id: string) {
    const [res, err] = await to(Axios$.post(this.repoApi('/delete'), { id }))
  }
}

export const Github = new GithubService()
