import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/config"

export const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY)

const setAccessToken = (token: string, rememberMe = false) => (rememberMe ? sessionStorage : localStorage).setItem(ACCESS_TOKEN_KEY, token)

export const getRefreshToken = () => sessionStorage.getItem(REFRESH_TOKEN_KEY) || localStorage.getItem(REFRESH_TOKEN_KEY)

const setRefreshToken = (token: string, rememberMe = false) => (rememberMe ? sessionStorage : localStorage).setItem(REFRESH_TOKEN_KEY, token)

export const removeToken = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const setToken = (accessToken: string, refreshToken: string, rememberMe = false) => {
  setAccessToken(accessToken, rememberMe)
  setRefreshToken(refreshToken, rememberMe)
}