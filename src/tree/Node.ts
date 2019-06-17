export default class Node<T> {
  value: T
  children: Node<T>[]

  constructor(value: T) {
    this.value = value
    this.children = []
  }

  addChild(node: Node<T>) {
    this.children.push(node)
    return this
  }
}
