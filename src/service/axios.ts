import AXIOS, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

type CustomAxiosRequestConfig = AxiosRequestConfig & {
  cache?: any
  noCache?: boolean
}

type AxiosInterceptors = {
  request: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  response: (response: AxiosResponse) => AxiosResponse
}

class AxiosService {
  instance = AXIOS.create({ timeout: 30000 })

  private baseURL = ''

  private requestInterceptors: AxiosInterceptors['request'] = (config) => config
  private responseInterceptors: AxiosInterceptors['response'] = (response) =>
    response

  constructor() {
    makeAutoObservable(this, {
      instance: false,
    })

    this.autoConfig()
  }

  setupAxios(baseURL: string, axiosInterceptors: Partial<AxiosInterceptors>) {
    this.baseURL = baseURL
    if (axiosInterceptors.request) {
      this.requestInterceptors = axiosInterceptors.request
    }
    if (axiosInterceptors.response) {
      this.responseInterceptors = axiosInterceptors.response
    }
  }

  post<T = any>(url: string, data: any) {
    return this.request<T>({
      url,
      method: 'POST',
      data,
    })
  }

  get<T = any>(url: string) {
    return this.request<T>({
      url,
      method: 'GET',
    })
  }

  put<T = any>(url: string, data: any) {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
    })
  }

  private async request<T = any>(config: CustomAxiosRequestConfig) {
    const { noCache = true } = config

    if (noCache) {
      config.cache = { maxAge: 0 }
      config.params = config.params ? config.params : {}
      config.params.timestamp = Date.now()
      delete config.noCache
    }

    const [res, err] = await to(this.instance.request<T>(config))
    if (err) {
      console.log(err)
    }

    return res
  }

  private autoConfig() {
    autorun(() => {
      this.instance.defaults.baseURL = this.baseURL
      if (this.requestInterceptors) {
        this.instance.interceptors.request.use((config) => {
          this.requestInterceptors(config)
          return config
        })
      }
      if (this.responseInterceptors) {
        this.instance.interceptors.response.use((response) => {
          this.responseInterceptors?.(response)
          return response?.data
        })
      }
    })
  }
}

export const Axios$ = new AxiosService()
