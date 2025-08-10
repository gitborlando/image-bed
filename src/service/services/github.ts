import { Axios$ } from 'src/service/axios'

export interface GithubItem extends Item {
  type: 'blob'
}

export interface GithubDir extends Item {
  type: 'tree'
}

class GithubService implements Service {
  token = ''
  owner = ''
  repo = ''
  branch = ''

  constructor() {
    makeAutoObservable(this)
  }

  get baseUrl() {
    return `https://api.github.com`
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

  async addItem(item: Item) {
    return item
  }

  async removeItem(item: Item) {
    return item
  }
}

export const Github = new GithubService()
