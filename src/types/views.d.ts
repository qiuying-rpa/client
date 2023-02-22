interface ListItem {
    title: string
    value: string | number
    icon?: string
}

type TreeItem = Exclude<ListItem, 'offset'> & {
    children: TreeItem[]
}
