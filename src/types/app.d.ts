type ValueType = string | number | boolean

type ObjectValue = { [key: string]: unknown }

interface SimpleItem {
  title: string
  value: ValueType
}

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

interface QNotification {
  content: string
  type: NotificationType
}
