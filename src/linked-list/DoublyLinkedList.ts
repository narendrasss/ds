import { isEqual } from 'lodash'
import Node from './Node'

/**
 * A doubly linked list with head and tail pointers
 */
class DoublyLinkedList<T> {
  head: Node<T>
  tail: Node<T>
  length: number

  constructor(...initialValues: T[]) {
    this.head = null
    this.tail = null
    this.length = 0

    initialValues.forEach(value => this.push(value))
  }

  add(el: T, pos?: number) {
    if (!this.head || pos === undefined || pos > this.length) {
      return this.push(el)
    }
    if (pos === 0) {
      return this.unshift(el)
    }

    const newNode = new Node(el)
    const node = this._traverse(pos)
    const { prev, next } = node
    prev.next = newNode
    newNode.prev = prev
    next.prev = newNode
    newNode.next = next
    this.length++
    return this
  }

  clear() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  find<K>(callback: (currentValue: T, index: number) => K) {
    let curr = this.head
    let index = 0
    while (curr) {
      const result = callback(curr.value, index)
      if (result !== null) return result
      curr = curr.next
      index++
    }
    return null
  }

  get(pos: number) {
    if (pos < 0 || pos >= this.length) {
      throw new Error(`Index ${pos} is out of bounds`)
    }
    return this._traverse(pos).value
  }

  includes(el: T) {
    const result = this.find(currentValue =>
      isEqual(currentValue, el) ? true : null
    )
    return result || false
  }

  indexOf(el: T) {
    return this.find((currentValue, index) =>
      isEqual(currentValue, el) ? index : null
    )
  }

  pop() {
    if (!this.head) {
      return null
    }
    if (this.length === 1) {
      const node = this.head
      this.clear()
      return node.value
    }
    const tail = this.tail
    const { prev } = tail
    prev.next = null
    this.tail = prev
    this.length--
    return tail.value
  }

  push(el: T) {
    const newNode = new Node(el)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      const tail = this.tail
      tail.next = newNode
      newNode.prev = tail
      this.tail = newNode
    }
    this.length++
    return this
  }

  shift() {
    if (this.head) {
      const tmp = this.head
      const next = this.head.next
      next.prev = null
      this.head = next
      return tmp.value
    }
    return null
  }

  unshift(el: T) {
    const newNode = new Node(el)
    newNode.next = this.head
    if (this.head) this.head.prev = newNode
    this.head = newNode
    this.length++
    if (this.length === 1) {
      this.tail = newNode
    }
    return this
  }

  remove(pos: number) {
    if (pos < 0 || pos >= this.length) {
      throw new Error(`Index ${pos} is out of bounds`)
    }

    if (pos === 0) return this.shift()
    if (pos === this.length - 1) return this.pop()

    const node = this._traverse(pos - 1)
    const toRemove = node.next
    const next = toRemove.next
    toRemove.next = null
    node.next = next
    this.length--
    return toRemove.value
  }

  toArray() {
    return [...this]
  }

  toString() {
    const data = this.toArray()
    return data.join(' ↔ ')
  }

  *[Symbol.iterator]() {
    for (
      let node = this.head, pos = 0;
      Boolean(node);
      pos++, node = node.next
    ) {
      yield node.value
    }
  }

  private _traverse(to = this.length - 1) {
    if (!this.head) return null
    let curr = this.head
    let pos = to
    while (curr && pos) {
      curr = curr.next
      pos--
    }
    return curr
  }
}

export default DoublyLinkedList
