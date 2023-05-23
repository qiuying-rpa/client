// --- sys

interface RoleVO {
  id: string
  name: string
  desc: string
  is_default: boolean
}

type RoleWithPermissionsVO = RoleVO & {
  permissions: Permissions
}

interface UserVO {
  id: string
  name: string
  email: string
  roles: RoleVO[]
}