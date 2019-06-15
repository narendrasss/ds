import LinkedList from '../linked-list'

class Queue<T> {
  data: LinkedList<T>

  constructor(...initialValues: T[]) {
    this.data = new LinkedList(...initialValues)
  }

  isEmpty() {
    return this.data.length === 0
  }

  front() {
    return this.data.get(this.data.length - 1)
  }

  enqueue(el: T) {
    this.data.unshift(el)
    return this
  }

  dequeue() {
    return this.data.pop()
  }

  *[Symbol.iterator]() {
    yield this.data[Symbol.iterator]
  }
}

export default Queue
