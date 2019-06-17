import BSTNode, { ComparatorFn } from './BSTNode'

export default class BinarySearchTree<T> {
  comparator: ComparatorFn<T>
  root: BSTNode<T>
  size: number

  constructor(comparatorFn: ComparatorFn<T>, ...initialValues: T[]) {
    this.comparator = comparatorFn
    this.root = null
    this.size = 0

    initialValues.forEach(value => this.add(value))
  }

  get height() {
    const _getNodeHeight = (node: BSTNode<T>): number => {
      if (!node) return 0
      return Math.max(_getNodeHeight(node.left), _getNodeHeight(node.right)) + 1
    }
    return _getNodeHeight(this.root)
  }

  add(el: T) {
    this.size++
    if (!this.root) {
      this.root = new BSTNode(el, this.comparator)
      return this
    }
    return this.root.insert(el)
  }

  contains(el: T) {
    if (this.root) {
      return this.root.contains(el)
    }
    return false
  }

  find(el: T) {
    if (this.root) {
      return this.root.find(el)
    }
    return null
  }

  print() {
    const height = this.height
    const width = 2 ** height - 1
    const result = Array(height)
      .fill(null)
      .map(val => Array(width).fill(val))

    const update = (
      node: BSTNode<T>,
      level: number,
      left: number,
      right: number
    ) => {
      if (node) {
        const mid = (left + right) / 2
        result[level][mid] = node.value
        update(node.left, level + 1, left, mid - 1)
        update(node.right, level + 1, mid + 1, right)
      }
    }

    update(this.root, 0, 0, width - 1)
    return this._makeLines(result)
  }

  remove(el: T) {
    const node = this.find(el)
    if (node) {
      const { parent, left, right } = node
      parent.setLeft(left)
      parent.setRight(right)
      this.size--
    }
    return this
  }

  private _makeLines(arr: BSTNode<T>[][]) {
    const result = []
    for (let i = 0; i < arr.length - 1; i++) {
      const parent = arr[i]
      const child = arr[i + 1]
      const line = Array(parent.length).fill('')

      const getIndexReducer = (
        acc: number[],
        node: BSTNode<T>,
        idx: number
      ) => {
        if (node) {
          acc.push(idx)
        }
        return acc
      }

      const parentIndexes = parent.reduce(getIndexReducer, [])
      parentIndexes.forEach(idx => (line[idx] = '┴'))

      const childIndexes = child.reduce(getIndexReducer, [])
      childIndexes.forEach(idx => (line[idx] = '|'))

      result.push(parent, line)
    }
    return result
  }
}
