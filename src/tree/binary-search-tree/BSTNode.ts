import BinaryTreeNode from '../BinaryTreeNode'

export type ComparatorFn<T> = (a: T, b: T) => number

export default class BSTNode<T> extends BinaryTreeNode<T> {
  value: T
  left: BSTNode<T>
  right: BSTNode<T>
  parent: BSTNode<T>
  comparator: ComparatorFn<T>

  constructor(value: T, comparator: ComparatorFn<T>) {
    super(value)
    this.comparator = comparator
  }

  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight
  }

  get max(): BSTNode<T> {
    if (!this.right) {
      return this
    }
    return this.right.max
  }

  get min(): BSTNode<T> {
    if (!this.left) {
      return this
    }
    return this.left.min
  }

  get predecessor(): BSTNode<T> {
    if (this.left) {
      return this.left.max
    }
    return null
  }

  get successor(): BSTNode<T> {
    if (this.right) {
      return this.right.min
    }
    return null
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
}
