type ValueType = string | number | boolean

interface SimpleItem {
  title: string
  value: ValueType
}

type ListItem = SimpleItem & {
  icon?: string
  offset?: [number, number]
}

type TreeItem = Exclude<ListItem, 'offset'> & {
  children: TreeItem[]
}

type TabItem = Exclude<ListItem, 'offset'>
