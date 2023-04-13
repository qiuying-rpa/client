const { VITE_ACCESS_TOKEN_KEY, VITE_REFRESH_TOKEN_KEY } = import.meta.env

export const getAccessToken = () => sessionStorage.getItem(VITE_ACCESS_TOKEN_KEY) || localStorage.getItem(VITE_ACCESS_TOKEN_KEY)

const setAccessToken = (token: string, rememberMe = false) => (rememberMe ? localStorage : sessionStorage).setItem(VITE_ACCESS_TOKEN_KEY, token)

export const getRefreshToken = () => sessionStorage.getItem(VITE_REFRESH_TOKEN_KEY) || localStorage.getItem(VITE_REFRESH_TOKEN_KEY)

const setRefreshToken = (token: string, rememberMe = false) => (rememberMe ? localStorage : sessionStorage).setItem(VITE_REFRESH_TOKEN_KEY, token)

export const removeToken = () => {
  sessionStorage.removeItem(VITE_ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(VITE_REFRESH_TOKEN_KEY)
  localStorage.removeItem(VITE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(VITE_REFRESH_TOKEN_KEY)
}

export const setToken = (accessToken: string, refreshToken: string, rememberMe = false) => {
  setAccessToken(accessToken, rememberMe)
  setRefreshToken(refreshToken, rememberMe)
}