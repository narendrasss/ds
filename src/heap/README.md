# Heap

A heap is a tree-like data structure where each node satisfies the *heap* property. There are two types of heaps, both of which have different heap properties:

- For every node in a **min** heap, the value at the node is less than or equal to the values of its children nodes.
- For every node in a **max** heap, the value at the node is greater than or equal to the values of its children nodes.

The tree below is an exaple of a min heap:

```
       1      
   ┌───┴───┐  
   2       3  
 ┌─┴─┐   ┌─┴─┐
 4   5   6   7
┌┘            
8
```

The tree below is a max heap with the same values:

```
       8      
   ┌───┴───┐  
   7       6  
 ┌─┴─┐   ┌─┴─┐
 4   3   2   5
┌┘            
1
```

## Heap Sort

Heaps allow you to quickly (`O(log n)`) retrieve max/min values. Because of this, they are often used to sort arrays. The algorithm that does this is known as **heap sort**.

Heap sort works in the following way.

1. Turn the unsorted array into a min heap. This algorithm is commonly known as `heapify`.
2. Repeatedly remove the top element of the heap.

Step one takes `O(nlogn)` time, as `n` insertions are done with `O(logn)` time for each insertion. Step two takes `O(nlogn)` time, resulting in a total of `O(2nlogn) = O(nlogn)` time.
