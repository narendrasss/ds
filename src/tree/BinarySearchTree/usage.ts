import BinarySearchTree from '.'

const comparator = (a: number, b: number) => b - a

const values = [8, 3, 10, 1, 6, 14, 4, 7, 13]
const tree = new BinarySearchTree(comparator, ...values)

console.log('Initial tree:')
console.log(tree.print(), '\n')

tree.add(2)
console.log('Add 2:')
console.log(tree.print(), '\n')

tree.remove(6)
console.log('Remove 6:')
console.log(tree.print(), '\n')

const imbalancedTree = new BinarySearchTree(comparator, ...[1, 2, 3, 4, 5, 6])
console.log('Imbalanced tree:')
console.log(imbalancedTree.print(), '\n')

imbalancedTree.remove(1)
console.log('Remove root:')
console.log(imbalancedTree.print(), '\n')
