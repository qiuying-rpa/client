// --- sys

interface RoleVO {
  id: string
  name: string
  desc: string
}

type RoleWithPermissions = RoleVO & {
  permissions: Permissions
}

interface UserVO {
  id: string
  name: string
  email: string
  roles: RoleVO[]
}