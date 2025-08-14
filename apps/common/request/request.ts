import axios, {type AxiosRequestConfig, type AxiosResponse} from 'axios';
export type Result<T> = {
  code: number;
  msg: string;
  data: T;
};
export const createRequestInstance = ({
  onErrorMessage,
  onUnAuth,
  getToken
}: {
  onErrorMessage: (msg: string) => void;
  onUnAuth: () => void;
  getToken: () => string;
}) => {
  const service = axios.create({
    baseURL: '/api', // url = base url + request url
    withCredentials: true,
    timeout: 500000
  });
  //响应拦截器
  service.interceptors.response.use(
    (response: AxiosResponse<Result<any>>) => {
      if (response.status !== 200) {
        onErrorMessage(response.statusText);
      } else if (response.data.code === 0) {
        onErrorMessage(response.data.msg);
        throw new Error(response.data.msg);
      }
      return response;
    },
    error => {
      console.error('err' + error);
      let {message} = error;
      if (message == 'Network Error') {
        message = '后端接口连接异常';
      } else if (message.includes('timeout')) {
        message = '系统接口请求超时';
      } else if (message.includes('413')) {
        onErrorMessage('上传文件大小超出限制');
      } else if (message.includes('401')) {
        // 登录校验失败
        onUnAuth();
      } else if (message.includes('Request failed with status code')) {
        message = '系统接口' + message.substr(message.length - 3) + '异常';
      } else {
        onErrorMessage(message);
      }
      return Promise.reject(error).catch(error);
    }
  );
  //请求拦截器
  service.interceptors.request.use(
    config => {
      config.headers.token = getToken();
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  const request = async <T>(config: AxiosRequestConfig) =>
    (await service<Result<T>>(config)).data.data;
  return {
    request
  };
};
