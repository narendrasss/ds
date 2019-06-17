import BinarySearchTree from '../BinarySearchTree'

describe('bst', () => {
  const comparator = jest.fn((a: number, b: number) => b - a)

  test('integration', () => {
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13]
    const tree = new BinarySearchTree(comparator, ...values)

    console.log(tree.print())

    const node = tree.find(10)
    expect(node.value).toEqual(10)
  })

  describe('equals', () => {
    it('returns true for equal trees', () => {
      const first = new BinarySearchTree(comparator, ...[8, 4, 10])
      const second = new BinarySearchTree(comparator, ...[8, 4, 10])
      expect(BinarySearchTree.equals(first, second)).toBe(true)
    })
  })

  describe('remove', () => {
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13]
    let tree: BinarySearchTree<number>

    beforeEach(() => {
      tree = new BinarySearchTree(comparator, ...values)
    })

    it('removes node with one child', () => {
      tree.remove(14)
      expect(tree.find(14)).toBe(null)
      expect(tree.find(10).right.value).toBe(13)
    })

    it('removes node with two children', () => {
      tree.remove(6)
      expect(tree.find(6)).toBe(null)
      expect(tree.find(3).right.value).toBe(4)
    })

    it('removes root node', () => {
      tree.remove(8)

      expect(tree.find(8)).toBe(null)
      expect(tree.root.value).toBe(7)
    })
  })
})
