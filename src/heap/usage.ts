import { MinHeap, MaxHeap } from '.'

const comparator = (a: number, b: number) => b - a
const values = [1, 2, 3, 4, 5, 6, 7, 8]

const minHeap = new MinHeap(comparator, ...values)
const maxHeap = new MaxHeap(comparator, ...values)

console.log('Min heap:')
console.log(minHeap.print())

console.log('Max heap:')
console.log(maxHeap.print())
