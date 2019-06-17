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
    const result = Array(2 * height - 1)
      .fill(' ')
      .map(val => Array(width).fill(val))

    const drawLine = (arr: string[], start: number, end: number) => {
      for (let i = start; i < end; i++) {
        arr[i] = '─'
      }
    }

    const update = (
      node: BSTNode<T>,
      level: number,
      left: number,
      right: number
    ) => {
      if (node) {
        const mid = (left + right) / 2
        result[level][mid] = node.value

        if (node.hasChildren()) {
          result[level + 1][mid] = '┴'

          if (node.left) {
            const leftChildIndex = (left + (mid - 1)) / 2
            result[level + 1][leftChildIndex] = '┌'
            drawLine(result[level + 1], leftChildIndex + 1, mid)
          }

          if (node.right) {
            const rightChildIndex = (mid + 1 + right) / 2
            result[level + 1][rightChildIndex] = '┐'
            drawLine(result[level + 1], mid + 1, rightChildIndex)
          }

          if (node.left && !node.right) {
            result[level + 1][mid] = '┘'
          }

          if (node.right && !node.left) {
            result[level + 1][mid] = '└'
          }
        }

        update(node.left, level + 2, left, mid - 1)
        update(node.right, level + 2, mid + 1, right)
      }
    }

    update(this.root, 0, 0, width - 1)
    return result.map(line => line.join('')).join('\n')
  }

  remove(el: T) {
    const node = this.find(el)
    if (node) {
      const { parent, left, right } = node

      if (left && right) {
        parent.setLeft(left)
        parent.setRight(right)
      }

      if (left) {
        if (parent.left === node) {
          parent.setLeft(left)
        }
        if (parent.right === node) {
          parent.setRight(left)
        }
      }

      if (right) {
        if (parent.left === node) {
          parent.setLeft(right)
        }
        if (parent.right === node) {
          parent.setRight(right)
        }
      }

      this.size--
    }
    return this
  }
}
