import BinarySearchTree from './BinarySearchTree'

describe('bst', () => {
  const comparator = jest.fn((a: number, b: number) => b - a)

  test('integration', () => {
    const values = [8, 3, 10, 1, 6, 14, 4, 7, 13]
    const tree = new BinarySearchTree(comparator, ...values)

    console.log(tree.print())
    expect(tree.size).toBe(values.length)

    const node = tree.find(10)
    expect(node.value).toEqual(10)
  })

  test('balanced', () => {
    const values = [1, 2, 3, 4, 5, 6]
    const tree = new BinarySearchTree(comparator, ...values)

    console.log(tree.print())
  })
})
