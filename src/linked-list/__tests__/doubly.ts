import DoublyLinkedList from '../DoublyLinkedList'

describe('doubly linked list', () => {
  describe('add', () => {
    const list = new DoublyLinkedList<number>()

    afterEach(() => list.clear())

    test('adds element', () => {
      list.add(1)
      expect(list).toHaveLength(1)
      expect(list.includes(1)).toBeTruthy()
    })

    test('adds multiple elements', () => {
      list.add(1).add(2)
      expect(list).toHaveLength(2)
      expect(list.includes(1)).toBeTruthy()
      expect(list.includes(2)).toBeTruthy()
    })

    test('adds element at given index', () => {
      list
        .add(1)
        .add(2)
        .add(3)
        .add(4, 1)
      expect(list).toHaveLength(4)
      expect(list.indexOf(4)).toBe(1)
    })
  })

  describe('get', () => {
    const values = [1, 3, 4, 5]
    const list = new DoublyLinkedList(...values)

    test('gets correct element at given pos', () => {
      const element = list.get(1)
      expect(element).toEqual(values[1])
    })

    test('throws error if pos is out of bounds', () => {
      expect(() => list.get(4)).toThrow()
    })
  })

  describe('pop', () => {
    const values = [1, 3, 4, 5]
    const list = new DoublyLinkedList(...values)

    test('removes and returns the last element', () => {
      const element = list.pop()
      expect(element).toEqual(values[values.length - 1])
      expect(list).toHaveLength(3)
      expect(list.indexOf(values[values.length - 1])).toBe(-1)
    })
  })

  describe('remove', () => {
    const values = [1, 3, 4, 5]
    const list = new DoublyLinkedList(...values)

    test('removes element at given pos', () => {
      const el = list.remove(1)
      expect(el).toBe(values[1])
      expect(list).toHaveLength(3)
      expect(list.indexOf(3)).toBe(-1)
    })
  })
})
