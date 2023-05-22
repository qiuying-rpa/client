import axios from "@/services"

const URL_PREFIX = '/sys'

export const getUsers = () => axios.get<any, BaseResponse<UserVO[]>>(URL_PREFIX + '/users')
export const createUser = (name: string, email: string, password: string, roles: string[]) => axios.post<any, BaseResponse<UserVO[]>>(URL_PREFIX + '/user', { name, email, password, roles })
export const updateUser = (id: string, name: string, email: string, roles: string[]) => axios.put<any, BaseResponse<UserVO[]>>(URL_PREFIX + `/user/${id}`, { name, email, roles })
export const addUsersRoles = (ids: string[], roles: string[]) => axios.patch<any, BaseResponse<UserVO[]>>(URL_PREFIX + '/users', { ids, roles, action: 'ADD' })
export const removeUsersRoles = (ids: string[], roles: string[]) => axios.patch<any, BaseResponse<UserVO[]>>(URL_PREFIX + '/users', { ids, roles, action: 'REMOVE' })
export const deleteUsers = (ids: string[]) => axios.delete<any, BaseResponse<null>>(URL_PREFIX + '/users', { data: { ids } })

export const getRoles = () => axios.get<any, BaseResponse<RoleVO[]>>(URL_PREFIX + '/roles')