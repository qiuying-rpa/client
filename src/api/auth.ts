import { BASE_URL } from "@/config"
import jsonAxios from "@/utils/api"


interface GetTokenData {
  access_token: string
  refresh_token: string
}

export const getPublicKey = () => jsonAxios.get<any, BaseResponse<string>>(`${BASE_URL}/auth/pub-key`)

export const getPermissions = () => jsonAxios.get<any, BaseResponse<Permissions>>(`${BASE_URL}/auth/permissions`)

export const getToken = (username: string, password: string) => jsonAxios.post<any, BaseResponse<GetTokenData>>(`${BASE_URL}/token`, { username, password })