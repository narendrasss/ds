import LinkedList from '.'

describe('linked list', () => {
  describe('add', () => {
    const list = new LinkedList<number>()

    afterEach(list.clear)

    test('adds element', () => {
      list.add(1)
      expect(list).toHaveLength(1)
      expect(list.includes(1)).toBeTruthy()
    })

    test('adds element at given index', () => {
      list.add(1)
      console.log(list.toString())
      expect(list).toHaveLength(4)
    })
  })
})
