import SinglyLinkedList from './SinglyLinkedList'
import DoublyLinkedList from './DoublyLinkedList'
import { logPerformance } from '../utils'

const values = Array.from({ length: 50000 }, () =>
  Math.round(Math.random() * 100)
)

const singly = new SinglyLinkedList(...values)
const doubly = new DoublyLinkedList(...values)

/* Array vs. list access time */

const index = 36500

console.log('Get element:')
logPerformance('Array', () => values[index])
logPerformance('Linked list', () => singly.get(index))

/* Array vs. list push */

console.log('Push element to end of list:')
logPerformance('Array', () => values.push(10))
logPerformance('Linked list', () => doubly.push(10))

/* Head vs. Tail push performance test */

console.log('Push element to end of list:')
logPerformance('Only head pointer', () => singly.push(10))
logPerformance('With tail pointer', () => doubly.push(10))

console.log('')
