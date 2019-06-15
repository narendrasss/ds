import Node from './Node'

class LinkedList<T> {
  head: Node<T> | null
  length: number

  constructor(data?: T) {
    this.head = data ? new Node(data) : null
    this.length = data ? 1 : 0
  }

  addFirst(el: T) {
    const node = new Node(el)
    if (!this.head) {
      this.head = node
    } else {
      const prevHead = this.head
      this.head = node
      node.next = prevHead
    }
    this.length++
    return node
  }

  addLast(el: T) {}

  add(el: T, pos?: number) {}
}

export default LinkedList
