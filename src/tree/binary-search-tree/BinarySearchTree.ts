import BSTNode, { ComparatorFn } from './BSTNode'

export default class BinarySearchTree<T> {
  comparator: ComparatorFn<T>
  root: BSTNode<T>

  constructor(comparatorFn: ComparatorFn<T>, ...initialValues: T[]) {
    this.comparator = comparatorFn
    this.root = null

    this.add(...initialValues)
  }

  get height() {
    return this.root.height
  }

  // deep comparison of two binary trees
  static equals<T>(original: BinarySearchTree<T>, other: BinarySearchTree<T>) {
    const deepCompareNodes = (
      first: BSTNode<T>,
      second: BSTNode<T>
    ): boolean => {
      if (!first && !second) return true
      if (!first || !second) return false
      return (
        first.value === second.value &&
        deepCompareNodes(first.left, second.left) &&
        deepCompareNodes(first.right, second.right)
      )
    }
    return deepCompareNodes(original.root, other.root)
  }

  add(...els: T[]) {
    els.forEach(el => {
      if (!this.root) {
        this.root = new BSTNode(el, this.comparator)
      } else {
        this.root.insert(el)
      }
    })
    return this
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
    if (this.root) return this.root.print()
    return null
  }

  remove(el: T) {
    const node = this.find(el)
    if (node) {
      const { parent, left, right } = node

      if (!left) {
        if (parent) {
          parent.left === node ? parent.setLeft(right) : parent.setRight(right)
        } else {
          // this is a root node
          this.root = right
        }
      } else if (!right) {
        if (parent) {
          parent.left === node ? parent.setLeft(left) : parent.setRight(left)
        } else {
          // this is a root node
          this.root = left
        }
      }

      if (left && right) {
        const { predecessor } = node
        const tmp = predecessor.value
        this.remove(predecessor.value)
        node.value = tmp
      }
    }
    return this
  }
}
