import { MinHeap } from '.'

export default class MaxHeap<T> extends MinHeap<T> {
  isInCorrectOrder(value: T, parent: T) {
    if (parent) {
      const comparison = this.compare(value, parent)
      return comparison >= 0
    }
    return true
  }
}
