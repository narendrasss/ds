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
    const height = this.height + 1
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

    const trim = (result: string[][]) => {
      const leftMost = Math.min(
        ...result.map(arr => arr.findIndex(str => str !== ' '))
      )
      const rightMost = Math.max(
        ...result.map(arr => {
          const length = arr.length
          const idx = arr
            .slice()
            .reverse()
            .findIndex(str => str !== ' ')
          return length - 1 - idx
        })
      )
      return result.map(arr => arr.slice(leftMost, rightMost + 1))
    }

    return trim(result)
      .map(line => line.join(''))
      .join('\n')
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
