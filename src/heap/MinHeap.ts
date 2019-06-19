import { BinaryTreeNode } from '../tree'
import { ComparatorFn } from '../tree/binary-search-tree/BSTNode'

export default class MinHeap<T> {
  data: T[]
  compare: ComparatorFn<T>

  constructor(comparator: ComparatorFn<T>, ...initialValues: T[]) {
    this.data = []
    this.compare = comparator
    initialValues.forEach(value => this.push(value))
  }

  static heapSort<T>(comparator: ComparatorFn<T>, ...values: T[]) {
    const res: T[] = []
    const tmp = new MinHeap(comparator, ...values)

    values.forEach(() => {
      res.push(tmp.pop())
    })
    return res
  }

  get size() {
    return this.data.filter(Boolean).length
  }

  peek() {
    if (this.data.length) {
      return this.data[0]
    }
    return null
  }

  pop() {
    if (!this.data.length) return null
    const item = this.data[0]
    this.data[0] = this.data.pop()
    this.heapifyDown(0)
    return item
  }

  print() {
    const makeNode = (index: number) => {
      const value = this.data[index]
      if (value) {
        const node = new BinaryTreeNode(value)
        node.setLeft(makeNode(this.getLeftChildIndex(index)))
        node.setRight(makeNode(this.getRightChildIndex(index)))
        return node
      }
      return null
    }
    const root = makeNode(0)
    return root ? root.print() : null
  }

  push(value: T) {
    this.data.push(value)
    this.heapifyUp(this.data.length - 1)
    return this
  }

  private heapifyDown(index: number) {
    const value = this.data[index]
    const leftChild = this.leftChild(index)
    const rightChild = this.rightChild(index)

    if (leftChild) {
      const rightChildIsCorrect = this.isInCorrectOrder(leftChild, rightChild)

      // next index = the smaller of left child or right child
      const nextIndex =
        rightChild && rightChildIsCorrect
          ? this.getRightChildIndex(index)
          : this.getLeftChildIndex(index)

      if (!this.isInCorrectOrder(this.data[nextIndex], value)) {
        this.swap(nextIndex, index)
        this.heapifyDown(nextIndex)
      }
    }
  }

  private heapifyUp(index: number) {
    const value = this.data[index]
    const parent = this.parent(index)
    if (index && !this.isInCorrectOrder(value, parent)) {
      const parentIndex = this.getParentIndex(index)
      this.swap(index, parentIndex)
      this.heapifyUp(parentIndex)
    }
  }

  // in min heap, parent should always be smaller or equal to index
  isInCorrectOrder(value: T, parent: T) {
    if (parent) {
      const comparison = this.compare(value, parent)
      return comparison <= 0
    }
    return true
  }

  private getParentIndex(index: number) {
    return Math.floor((index - 1) / 2)
  }

  private getLeftChildIndex(index: number) {
    return 2 * index + 1
  }

  private getRightChildIndex(index: number) {
    return 2 * index + 2
  }

  private parent(index: number) {
    return this.data[this.getParentIndex(index)]
  }

  private leftChild(index: number) {
    return this.data[this.getLeftChildIndex(index)]
  }

  private rightChild(index: number) {
    return this.data[this.getRightChildIndex(index)]
  }

  private swap(indexOne: number, indexTwo: number) {
    const tmp = this.data[indexOne]
    this.data[indexOne] = this.data[indexTwo]
    this.data[indexTwo] = tmp
  }
}
