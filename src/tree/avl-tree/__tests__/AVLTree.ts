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

  describe('rotations', () => {
    const expected = new BinarySearchTree(comparator, 2, 1, 3).print()

    it('does a left rotation', () => {
      const tree = new AVLTree(comparator, 1, 2, 3)
      expect(tree.print()).toEqual(expected)
    })

    it('does a right rotation', () => {
      const tree = new AVLTree(comparator, 3, 2, 1)
      expect(tree.print()).toEqual(expected)
    })

    it('does a left-right rotation', () => {
      const tree = new AVLTree(comparator, 3, 1, 2)
      expect(tree.print()).toEqual(expected)
    })

    it('does a right-left rotation', () => {
      const tree = new AVLTree(comparator, 8, 10, 9)
      expect(tree.print()).toEqual(
        new BinarySearchTree(comparator, 9, 8, 10).print()
      )
    })
  })
})
