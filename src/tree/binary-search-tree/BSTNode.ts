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

  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight
  }

  get leftHeight(): number {
    if (!this.left) return 0
    return this.left.height + 1
  }

  get rightHeight(): number {
    if (!this.right) return 0
    return this.right.height + 1
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight)
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

  hasChildren() {
    return Boolean(this.left || this.right)
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

    update(this, 0, 0, width - 1)

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
