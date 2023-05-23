import axios from "@/services"

const URL_PREFIX = '/sys'

export const getUsers = () => axios.get<any, BaseResponse<UserVO[]>>(URL_PREFIX + '/users')
export const createUser = (name: string, email: string, password: string, roles: string[]) => axios.post<any, BaseResponse<string>>(URL_PREFIX + '/user', { name, email, password, roles })
export const updateUser = (id: string, name: string, email: string, roles: string[]) => axios.put<any, BaseResponse<string>>(URL_PREFIX + `/user/${id}`, { name, email, roles })
export const addUsersRoles = (ids: string[], roles: string[]) => axios.patch<any, BaseResponse<string>>(URL_PREFIX + '/users', { ids, roles, action: 'ADD' })
export const removeUsersRoles = (ids: string[], roles: string[]) => axios.patch<any, BaseResponse<string>>(URL_PREFIX + '/users', { ids, roles, action: 'REMOVE' })
export const deleteUsers = (ids: string[]) => axios.delete<any, BaseResponse<null>>(URL_PREFIX + '/users', { data: { ids } })

export const getRole = (id: string) => axios.get<any, BaseResponse<RoleWithPermissionsVO>>(URL_PREFIX + `/role/${id}`)
export const getRoles = () => axios.get<any, BaseResponse<RoleVO[]>>(URL_PREFIX + '/roles')
export const createRole = (name: string, desc: string) => axios.post<any, BaseResponse<string>>(URL_PREFIX + '/role', { name, desc })
export const updateRole = (id: string, name: string, desc: string) => axios.put<any, BaseResponse<string>>(URL_PREFIX + `/role/${id}`, { name, desc })
export const updateRolePermissions = (id: string, permissions: Qiuying.Permissions) => axios.patch<any, BaseResponse<string>>(URL_PREFIX + `/role/${id}`, { permissions })
export const deleteRoles = (ids: string[]) => axios.delete<any, BaseResponse<null>>(URL_PREFIX + '/roles', { data: { ids } })
