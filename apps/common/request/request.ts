import axios, {type AxiosRequestConfig, type AxiosResponse} from 'axios'
export type Result<T> = {
  code: number
  message: string
  data: T
}
export const createRequestInstance = ({
  onErrorMessage,
  onUnAuth,
  getToken
}: {
  onErrorMessage: (message: string) => void
  onUnAuth: () => void
  getToken: () => string | undefined
}) => {
  const service = axios.create({
    baseURL: '/api', // url = base url + request url
    withCredentials: true,
    timeout: 500000
  })
  //响应拦截器
  service.interceptors.response.use(
    (response: AxiosResponse<Result<any>>) => {
      if (response.data.code !== 200 && response.data.code !== 0) {
        onErrorMessage(response.data.msg || '操作失败')
        return Promise.reject(new Error(response.data.msg || 'Error'))
      }
      return response
    },
    error => {
      console.error('err' + error)
      let {message} = error
      // 优先判断状态码
      if (error.response?.status === 401) {
        // 登录校验失败
        onUnAuth()
        message = '登录状态已过期，请重新登录'
      } else if (message == 'Network Error') {
        message = '后端接口连接异常'
      } else if (message.includes('timeout')) {
        message = '系统接口请求超时'
      } else if (message.includes('413')) {
        message = '上传文件大小超出限制'
      } else if (message.includes('Request failed with status code')) {
        message = '系统接口' + message.substr(message.length - 3) + '异常'
      }

      onErrorMessage(message) // 统一弹出错误信息
      return Promise.reject(error)
    }
  )
  //请求拦截器
  service.interceptors.request.use(
    config => {
      config.headers.token = getToken()
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  const request = async <T>(config: AxiosRequestConfig) =>
    (await service<Result<T>>(config)).data.data
  return {
    request
  }
}
