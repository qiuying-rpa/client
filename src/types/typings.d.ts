// to handle some name repeat problems
declare namespace Qiuying {
  interface Permissions {
    actions: PermissionValue
    menus: PermissionValue
  }
}
// -- app
type ValueType = string | number | boolean

type ObjectValue = { [key: string]: unknown }

interface SimpleItem<T> {
  title: string
  value: T
}

type TreeItem = SimpleItem<Exclude<ValueType, boolean>> & {
  icon: string
  onDrag?: (event: DragEvent) => void
  children?: TreeItem[]
}

// notifier
type NotificationType = 'success' | 'error' | 'warn' | 'info' | 'loading'

type PermissionValue = '*' | string[]

interface QNotification {
  symbol: string
  content: string
  type: NotificationType
  duration: number
}

interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
  time: string
}

interface NavMenu {
  path: string
  name: string
  order: string
  icon: string
}

// -- base

interface KwargsFormModelValue {
  label: string
  argName: string
  value: string | KwargsFormModelValue[] | KwargsFormModelValue[][]
  options?: SimpleItem<ValueType>[]
}

// -- exec

interface ConditionItem {
  left: string
  middle: string
  right: string
}

type ConditionsItem = ConditionItem & {
  onAdd?: () => void
  onRemove?: (i: number) => void
}

type ProcessNodeModelValue = ObjectValue | CommonArgItem[]

interface ProcessNode {
  id: string
  is: string
  title?: string
  modelValue?: ProcessNodeModelValue
}

interface RunnableNode {
  id: string
  func: string
  kwargs: ObjectValue
}

interface CommonArgItem {
  label: string
  argName: string
  value: string | CommonArgItem[] | CommonArgItem[][]
  options?: SimpleItem<ValueType>[]
}

// --- auth

interface GetTokenData {
  access_token: string
  refresh_token: string
}