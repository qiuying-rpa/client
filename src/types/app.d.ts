type ValueType = string | number | boolean

type ObjectValue = { [key: string]: unknown }

type ListItem = SimpleItem & {
  icon?: string
  offset?: [number, number]
}

type TreeItem = Exclude<ListItem, 'offset'> & {
  onDrag?: (event: DragEvent) => void
  children?: TreeItem[]
}

type TabItem = Exclude<ListItem, 'offset'>

// notifier
type NotificationType = 'success' | 'error' | 'warn' | 'info' | 'loading'

type PermissionValue = '*' | string[]

interface QNotification {
  symbol: string
  content: string
  type: NotificationType
  duration: number
}

interface SimpleItem {
  title: string
  value: ValueType
}

interface Permissions {
  actions: PermissionValue
  menus: PermissionValue
}

interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
  time: string
}