import { Axios$ } from 'src/service/axios'

export interface GithubItem extends Item {
  path: string
}

class GithubService {
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

  repoApi(path: string) {
    return `/repos/${this.owner}/${this.repo}${path}`
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
}

export const Github = new GithubService()
