import AVLTree from './AVLTree'
import BST from '../binary-search-tree'
import { logPerformance } from '../../utils'

const comparator = (a: number, b: number) => b - a

const values = Array.from({ length: 20000 }, (_, idx) => idx + 1)
const bst = new BST(comparator, ...values)
const avl = new AVLTree(comparator, ...values)

const value = values[values.length - 1]

console.log('insertion')
logPerformance('bst', () => bst.find(value))
logPerformance('avl', () => avl.find(value))
