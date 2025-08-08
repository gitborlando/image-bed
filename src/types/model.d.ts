declare interface Item {
  name: string
  id: string
}

declare interface Dir {
  path: string
  items: Item[]
}
