interface TreeItem {
  id: string | number
  parent?: string | number
  type?: string | null
  [key: string]: any
}

export class TreeStore {
  items: { [id: string]: TreeItem }
  root: TreeItem | null

  constructor(items: TreeItem[]) {
    this.items = {}
    this.root = null

    for (const item of items) {
      this.items[item.id.toString()] = item
      if (!item.parent)
        this.root = item
    }
  }

  getAll(): TreeItem[] {
    return Object.values(this.items)
  }

  getItem(id: string | number): TreeItem | undefined {
    return this.items[id.toString()]
  }

  getChildren(id: string | number): TreeItem[] {
    const children: TreeItem[] = []
    for (const item of Object.values(this.items)) {
      if (item.parent === id)
        children.push(item)
    }
    return children
  }

  getAllChildren(id: string | number): TreeItem[] {
    let children = this.getChildren(id)
    for (const child of children)
      children = children.concat(this.getAllChildren(child.id))

    return children
  }

  getAllParents(id: string | number): TreeItem[] {
    const parents: TreeItem[] = []
    let item = this.items[id.toString()]
    while (item && item.parent) {
      item = this.items[item.parent.toString()]
      if (item)
        parents.push(item)
    }
    return parents.reverse()
  }
}
