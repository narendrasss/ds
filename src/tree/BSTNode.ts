export type ComparatorFn<T> = (a: T, b: T) => number

export default class BSTNode<T> {
  value: T
  left: BSTNode<T>
  right: BSTNode<T>
  parent: BSTNode<T>
  comparator: ComparatorFn<T>

  constructor(value: T, comparator: ComparatorFn<T>) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
    this.comparator = comparator
  }

  insert(value: T): BSTNode<T> {
    const comparison = this.comparator(this.value, value)

    if (!comparison) {
      this.value = value
      return this
    }

    // value goes to right subtree
    if (comparison > 0) {
      if (this.right) {
        return this.right.insert(value)
      }

      const node = new BSTNode(value, this.comparator)
      this.setRight(node)
      return node
    }

    // value goes to left subtree
    if (comparison < 0) {
      if (this.left) {
        return this.left.insert(value)
      }

      const node = new BSTNode(value, this.comparator)
      this.setLeft(node)
      return node
    }

    return this
  }

  contains(value: T): boolean {
    const comparison = this.comparator(this.value, value)
    if (!comparison) return true
    if (comparison > 0) {
      if (this.right) {
        return this.right.contains(value)
      }
      return false
    }
    if (comparison < 0) {
      if (this.left) {
        return this.left.contains(value)
      }
      return false
    }
    return false
  }

  find(value: T): BSTNode<T> {
    const comparison = this.comparator(this.value, value)
    if (!comparison) return this
    if (comparison > 0) {
      if (this.right) {
        return this.right.find(value)
      }
      return null
    }
    if (comparison < 0) {
      if (this.left) {
        return this.left.find(value)
      }
      return null
    }
    return null
  }

  hasChildren() {
    return Boolean(this.left || this.right)
  }

  setLeft(node: BSTNode<T>) {
    if (this.left) {
      this.left.parent = null
    }

    this.left = node

    if (this.left) {
      this.left.parent = this
    }
    return this
  }

  setRight(node: BSTNode<T>) {
    if (this.right) {
      this.right.parent = null
    }

    this.right = node

    if (this.right) {
      this.right.parent = this
    }
    return this
  }
}
