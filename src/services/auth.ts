import axios from "@/services"

export const getPublicKey = () => axios.get<any, string>('/static/rsa_pub_key.pem')

export const getPermissions = () => axios.get<any, BaseResponse<Qiuying.Permissions>>('/auth/permissions')

export const getToken = (email: string, password: string) => axios.post<any, BaseResponse<GetTokenData>>('/auth/token', { email, password })

export const refreshToken = (refreshToken: string) => axios.put<any, BaseResponse<GetTokenData>>('/auth/token', { 'refresh_token': refreshToken })