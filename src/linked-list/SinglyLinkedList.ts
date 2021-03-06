import Node from './Node'

/**
 * A singly linked list with only head pointer
 */
class SinglyLinkedList<T> {
  head: Node<T>
  length: number

  constructor(...initialValues: T[]) {
    this.head = null
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

    const node = this._traverse(pos - 1)
    const newNode = new Node(el)
    newNode.next = node.next
    node.next = newNode
    this.length++
    return this
  }

  clear() {
    this.head = null
    this.length = 0
  }

  find(
    el: T,
    onFound: (node: Node<T>, index: number) => any,
    onNotFound: () => any
  ) {
    let curr = this.head
    let index = 0
    while (curr) {
      if (curr.value === el) return onFound(curr, index)
      curr = curr.next
      index++
    }
    return onNotFound()
  }

  get(pos: number) {
    if (pos < 0 || pos >= this.length) {
      throw new Error(`Index ${pos} is out of bounds`)
    }
    return this._traverse(pos).value
  }

  includes(el: T) {
    return this.find(el, () => true, () => false)
  }

  indexOf(el: T) {
    return this.find(el, (_, idx) => idx, () => -1)
  }

  pop() {
    if (!this.head) {
      return null
    }
    if (!this.head.next) {
      const node = this.head
      this.head = null
      this.length--
      return node.value
    }
    const nodeBeforeLast = this._traverse(this.length - 2)
    const lastNode = nodeBeforeLast.next
    nodeBeforeLast.next = null
    this.length--
    return lastNode.value
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

  unshift(el: T) {
    const newNode = new Node(el)
    newNode.next = this.head
    this.head = newNode
    return this
  }

  remove(pos: number) {
    if (pos < 0 || pos >= this.length) {
      throw new Error(`Index ${pos} is out of bounds`)
    }

    if (pos === 0) return this.shift()

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
    return data.join(' -> ')
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

export default SinglyLinkedList
