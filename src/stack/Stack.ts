import LinkedList from '../linked-list'

class Stack<T> {
  data: LinkedList<T>

  constructor(...initialValues: T[]) {
    this.data = new LinkedList()
    initialValues.forEach(value => this.push(value))
  }

  isEmpty() {
    return this.data.length === 0
  }

  top() {
    return this.data.get(0)
  }

  pop() {
    return this.data.shift()
  }

  push(el: T) {
    this.data.unshift(el)
    return this
  }

  *[Symbol.iterator]() {
    yield this.data[Symbol.iterator]
  }
}

export default Stack
