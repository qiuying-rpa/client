import jsonAxios from "@/utils/api"

interface GetTokenData {
  access_token: string
  refresh_token: string
}

export const getPublicKey = () => jsonAxios.get<any, string>('/static/rsa_pub_key.pem')

export const getPermissions = () => jsonAxios.get<any, BaseResponse<Permissions>>('/auth/permissions')

export const getToken = (email: string, password: string) => jsonAxios.post<any, BaseResponse<GetTokenData>>('/auth/token', { email, password })