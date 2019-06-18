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

  balance(node: BSTNode<T>) {
    const { balanceFactor, left, right } = node
    if (balanceFactor > 1) {
      if (left.balanceFactor > 0) {
        this.rotateRight(node)
      } else if (left.balanceFactor < 0) {
        this.rotateLeftRight(node)
      }
    } else if (balanceFactor < -1) {
      if (right.balanceFactor > 0) {
        this.rotateRightLeft(node)
      } else if (right.balanceFactor < 0) {
        this.rotateLeft(node)
      }
    }
  }

  rotateLeft(node: BSTNode<T>) {
    if (node) {
      const rightNode = node.right
      node.setRight(null)

      if (node.parent) {
        node.parent.setRight(rightNode)
      } else {
        this.root = rightNode
      }

      node.setRight(rightNode.left)
      rightNode.setLeft(node)
    }
  }

  rotateLeftRight(node: BSTNode<T>) {
    if (node) {
      // detach left node
      const leftNode = node.left
      node.setLeft(null)

      // detach left node's right child
      const leftRightNode = leftNode.right

      // put right node's left child to left node
      leftNode.setRight(leftRightNode.left)

      // set right node's left child as left node
      leftRightNode.setLeft(leftNode)

      // set original node's left child as left right node
      node.setLeft(leftRightNode)

      // rotate original node right
      this.rotateRight(node)
    }
  }

  rotateRight(node: BSTNode<T>) {
    if (node) {
      const leftNode = node.left
      node.setLeft(null)

      if (node.parent) {
        node.parent.setLeft(leftNode)
      } else {
        this.root = leftNode
      }

      node.setLeft(leftNode.right)
      leftNode.setRight(node)
    }
  }

  rotateRightLeft(node: BSTNode<T>) {
    if (node) {
      const rightNode = node.right
      node.setRight(null)

      const rightLeftNode = rightNode.left

      rightNode.setLeft(rightLeftNode.right)
      rightLeftNode.setRight(rightNode)

      node.setRight(rightLeftNode)

      this.rotateLeft(node)
    }
  }
}
