interface ListItem {
  title: string
  value: string | number
  icon?: string
  offset?: [number, number]
}

type TreeItem = Exclude<ListItem, 'offset'> & {
  children: TreeItem[]
}

type TabItem = Exclude<ListItem, 'offset'>
