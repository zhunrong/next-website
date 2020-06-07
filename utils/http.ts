import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const _axios: AxiosInstance = axios.create({
  timeout: 60000, // 超时时间一分钟
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },
  withCredentials: true,
  baseURL: '/api',
});

_axios.interceptors.request.use((config) => {
  return config;
});

interface Request<T> extends Promise<T> {
  /**
   * 中止请求
   */
  abort(message?: string): void;
}

/**
 * 发起HTTP请求（封装axios）
 * @param config
 */
export default function http<T = any>(config: AxiosRequestConfig) {
  const source = axios.CancelToken.source();
  const p = new Promise<[any, T | null]>((resolve) => {
    (async () => {
      let data: T | null = null;
      let error: any;
      try {
        config.cancelToken = source.token;
        const response = await _axios(config);
        data = response.data;
      } catch (e) {
        error = e.response ? e.response : e;
      }
      resolve([error, data]);
    })();
  }) as Request<[any, T | null]>;
  p.abort = (message) => source.cancel(message);
  return p;
}
