import Node from './Node'

class LinkedList<T> {
  head: Node<T> | null
  length: number

  constructor(initialValue?: T) {
    this.head = initialValue ? new Node(initialValue) : null
    this.length = initialValue ? 1 : 0
  }

  add(el: T, pos?: number) {
    if (!this.head || pos === undefined || pos > this.length) {
      return this.push(el)
    }
    if (pos === 0) {
      return this.unshift(el)
    }

    const node = this._traverse(pos - 1)
    const newNode = new Node(el)
    newNode.next = node.next
    node.next = newNode
    this.length++
    return this
  }

  clear() {}

  get(pos: number) {}

  includes(el: T) {}

  indexOf(el: T) {}

  pop() {
    const last = this._traverse()
    if (last) {
    }
  }

  push(el: T) {
    const newNode = new Node(el)
    const last = this._traverse()
    if (!last) {
      this.head = newNode
    } else {
      last.next = newNode
    }
    this.length++
    return this
  }

  shift() {
    if (this.head) {
      const removee = this.head
      this.head = this.head.next
      this.length--
      return removee.value
    }
    return null
  }

  unshift(el: T): LinkedList<T> {
    const newNode = new Node(el)
    newNode.next = this.head
    this.head = newNode
    return this
  }

  remove(pos: number) {}

  toArray() {
    return [...this]
  }

  toString() {
    const data = this.toArray()
    return data.join(' -> ')
  }

  *[Symbol.iterator]() {
    for (let node = this.head, pos = 0; node; pos++, node = node.next) {
      yield node.value
    }
  }

  private _traverse(to = this.length - 1) {
    if (!this.head) return null
    let curr = this.head
    while (curr && to) {
      curr = curr.next
      to = to--
    }
    return curr
  }
}

export default LinkedList
