import BinarySearchTree from '../../binary-search-tree'
import AVLTree from '../AVLTree'

describe('avl tree', () => {
  const comparator = (a: number, b: number) => b - a

  describe('add', () => {
    it('adds and balances', () => {
      const tree = new AVLTree(comparator, 1, 2, 3).print()
      const expected = new BinarySearchTree(comparator, 2, 1, 3).print()

      expect(tree).toEqual(expected)
    })
  })
})
