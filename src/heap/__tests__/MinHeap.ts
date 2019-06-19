import MinHeap from '../'

describe('min heap', () => {
  const comparator = (a: number, b: number) => b - a

  describe('insertion', () => {
    it('inserts multiple values', () => {
      const values = [6, 5, 4]
      const heap = new MinHeap(comparator, ...values)
      expect(heap.size).toEqual(values.length)
    })
  })

  describe('removal', () => {
    it('removes min', () => {
      const values = [3, 2, 4, 1]
      const heap = new MinHeap(comparator, ...values)
      const top = heap.pop()
      expect(top).toEqual(1)
    })
  })

  describe('heap sort', () => {
    it('sorts the array', () => {
      const values = [3, 5, 8, 10, 1, 2, 6, 4]
      const expected = [1, 2, 3, 4, 5, 6, 8, 10]

      const result = MinHeap.heapSort(comparator, ...values)
      expect(result).toEqual(expected)
    })
  })
})
