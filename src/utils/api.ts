import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN_KEY, BASE_URL, REFRESH_TOKEN_KEY, REQUEST_TIMEOUT } from '@/config'
import { getAccessToken, getRefreshToken, removeToken } from './auth'
import { useNotifierStore } from '@/store/app'
import { useRouter } from 'vue-router'

const responseInterceptor = (response: AxiosResponse) => {
  return Promise.resolve(response.data)
}

const responseErrorInterceptor = (error: AxiosError) => {
  const { pushNotification } = useNotifierStore()

  // access token is out of date
  if (error.response?.status === 426) {
    const config = error.config
    if (config?.headers) {
      config.headers[REFRESH_TOKEN_KEY] = getRefreshToken()
      return axios(config)
    }
  }

  const router = useRouter()

  // invalid or refresh token is out of date
  if (error.response?.status === 400) {
    removeToken()
    pushNotification(
      '认证已失效，请重新登录',
      'error'
    )
    router.push('/')
  } else if (error.response?.status === 401) {
    pushNotification(
      '请先登录~',
      'error'
    )
    router.push('/')
  } else {
    pushNotification(
      '未知异常：' + error.message,
      'error'
    )
  }

  return Promise.reject(error)
}

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token && config.headers) {
    config.headers[ACCESS_TOKEN_KEY] = token
  }
  return config
}

export const jsonAxios = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
})

jsonAxios.interceptors.request.use(requestInterceptor)

jsonAxios.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
)

export const formDataAxios = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: false,
  headers: { 'Content-Type': 'multipart/form-data' },
})

formDataAxios.interceptors.request.use(requestInterceptor)
formDataAxios.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
)

export default jsonAxios