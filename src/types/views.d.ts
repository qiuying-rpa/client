interface ListItem {
    title: string
    value: string
    icon?: string
}

type TreeItem = Exclude<ListItem, 'offset'> & {
    children: TreeItem[]
}
