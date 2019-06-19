export default class BinaryTreeNode<T> {
  value: T
  left: BinaryTreeNode<T>
  right: BinaryTreeNode<T>
  parent: BinaryTreeNode<T>

  constructor(value: T) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
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
      node: BinaryTreeNode<T>,
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

  setLeft(node: BinaryTreeNode<T>) {
    if (this.left) {
      this.left.parent = null
    }

    this.left = node

    if (this.left) {
      this.left.parent = this
    }
    return this
  }

  setRight(node: BinaryTreeNode<T>) {
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
