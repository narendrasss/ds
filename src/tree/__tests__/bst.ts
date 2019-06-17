import BinarySearchTree from '../BinarySearchTree'

describe('bst', () => {
  const comparator = jest.fn((a: number, b: number) => b - a)
  test('adds values', () => {
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13]
    const tree = new BinarySearchTree(comparator, ...values)
    console.log(tree.print())
    expect(tree.size).toBe(values.length)
  })
})
