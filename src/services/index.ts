import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, getRefreshToken, removeToken } from '../utils/auth'
import { useNotifierStore } from '@/store/app'
import { useRouter } from 'vue-router'
import { refreshToken } from '@/services/auth'
import { setToken } from '../utils/auth'

const responseInterceptor = (response: AxiosResponse) => {
  return Promise.resolve(response.data)
}

const responseErrorInterceptor = async (error: AxiosError) => {
  const { pushNotification } = useNotifierStore()
  const router = useRouter()

  function notifyAndReset(notification = '未知异常: ' + error.message) {
    removeToken()
    pushNotification(
      notification,
      'error'
    )
    router.push('/')
  }

  // access token is out of date
  if (error.response?.status === 426) {
    const config = error.config!
    const refreshTokenCached = getRefreshToken()
    if (refreshTokenCached) {
      const { code, data, message } = await refreshToken(refreshTokenCached)
      if (code === 0) {
        setToken(data.access_token, data.refresh_token, !!localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_KEY))
        config.headers[import.meta.env.VITE_ACCESS_TOKEN_KEY] = data.access_token
        return (await axios(config)).data
      } else {
        notifyAndReset('续期失败: ' + message)
      }
    } else {
      notifyAndReset('续期失败: Refresh token not found.')
    }
  }

  // invalid or refresh token is out of date
  if (error.response?.status === 400) {
    notifyAndReset('认证已失效, 请重新登录')
  } else if (error.response?.status === 401) {
    notifyAndReset('请先登录')
  } else {
    notifyAndReset()
  }

  return Promise.reject(error)
}

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token && config.headers) {
    config.headers[import.meta.env.VITE_ACCESS_TOKEN_KEY] = token
  }
  return config
}

export const jsonAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: +import.meta.env.VITE_REQUEST_TIMEOUT,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
})

jsonAxios.interceptors.request.use(requestInterceptor)

jsonAxios.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
)

export const formDataAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: +import.meta.env.VITE_REQUEST_TIMEOUT,
  withCredentials: false,
  headers: { 'Content-Type': 'multipart/form-data' },
})

formDataAxios.interceptors.request.use(requestInterceptor)
formDataAxios.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
)

export default jsonAxios