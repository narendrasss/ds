import BinarySearchTree from '../BinarySearchTree'

describe('bst', () => {
  const comparator = jest.fn((a: number, b: number) => b - a)

  test('integration', () => {
    const values = [8, 2, 19, 7, 18, 6, 10, 3, 13, 11, 17, 16]
    const tree = new BinarySearchTree(comparator, ...values)

    console.log(tree.print())
    expect(tree.size).toBe(values.length)

    tree.remove(19).remove(13)
    console.log(tree.print())
    expect(tree.size).toBe(values.length - 2)
  })
})
