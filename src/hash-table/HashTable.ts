import LinkedList from '../linked-list'

type KeyValueNode<K, V> = {
  key: K
  value: V
}

export default class HashTable<K, V> {
  buckets: LinkedList<KeyValueNode<K, V>>[]
  capacity: number
  maxLoadFactor: number
  size: number

  constructor(capacity: number = 19, maxLoadFactor: number = 0.75) {
    this.capacity = capacity
    this.maxLoadFactor = maxLoadFactor
    this.reset()
  }

  reset(
    capacity: number = this.capacity,
    buckets: LinkedList<KeyValueNode<K, V>>[] = Array.from(
      { length: 19 },
      () => new LinkedList()
    ),
    size: number = 0
  ) {
    this.capacity = capacity
    this.buckets = buckets
    this.size = size
  }

  get(key: K) {
    const bucket = this.getBucket(key)
    return bucket.find(node => (node.key === key ? node.value : null))
  }

  set(key: K, value: V) {
    const bucket = this.getBucket(key)
    bucket.push({ key, value })
    this.size++
    if (this.shouldRehash()) {
      this.rehash()
    }
  }

  has(key: K) {
    return this.get(key) !== null
  }

  remove(key: K) {
    const bucket = this.getBucket(key)
    const [value, index] = bucket.find((node, pos) =>
      node.key === key ? [node.value, pos] : null
    )
    if (index) {
      bucket.remove(index)
      this.size--
      return value
    }
    return null
  }

  entries(): [K, V][] {
    return this.buckets.reduce(
      (acc, list) => [
        ...acc,
        ...list.toArray().map(({ key, value }) => [key, value])
      ],
      []
    )
  }

  getBucket(key: K) {
    const index = this.hash(key)
    return this.buckets[index]
  }

  getCurrentLoadFactor() {
    return this.size / this.buckets.length
  }

  hash(key: K) {
    const str = String(key)
    let hash = 2166136261
    for (let i = 0; i < str.length; i += 1) {
      hash ^= str.codePointAt(i)
      hash *= 16777619
    }
    return (hash >>> 0) % this.buckets.length
  }

  rehash() {
    const size = Math.max(this.size, this.buckets.length) * 2
    const table = new HashTable(size)
    this.entries().forEach(([key, value]) => table.set(key, value))

    const buckets = table.buckets as LinkedList<KeyValueNode<K, V>>[]
    this.reset(table.capacity, buckets, table.size)
  }

  shouldRehash() {
    return this.getCurrentLoadFactor() > this.maxLoadFactor
  }
}
