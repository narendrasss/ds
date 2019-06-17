import BinarySearchTree, { BSTNode } from '../binary-search-tree'

export default class AVLTree<T> extends BinarySearchTree<T> {
  add(...values: T[]) {
    values.forEach(value => this.addOne(value))
    return this
  }

  addOne(value: T) {
    super.add(value)
    let node = this.root.find(value)
    while (node) {
      this.balance(node)
      node = node.parent
    }

    return this
  }

  balance(node: BSTNode<T>) {}

  rotateLeft(node: BSTNode<T>) {}
  rotateRight(node: BSTNode<T>) {}
  rotateLeftRight(node: BSTNode<T>) {}
  rotateRightLeft(node: BSTNode<T>) {}
}
