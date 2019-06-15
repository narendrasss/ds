# Linked Lists

A linked list is a data structure where each element contains a _pointer_ to the next element. The elements are not laid out contiguously but rather tells you where you can find the next element in the list.

`insert array vs linked list visual here`

## Why linked lists over arrays?

Linked lists have significantly faster insertions and removals over arrays, especially when the length of the list is dynamic.

During compilation arrays are allocated a fixed amount of memory. For an array of 10 numbers, the compiler will allocate the memory needed for exactly 10 numbers. But what if we want to another number? We would have to:

1. Allocate memory for 11 numbers
2. Copy the entire array over to the new memory location
3. Add the 11th number

This is an `O(n)` operation, as we have to go through every single element of the array.

With linked lists, all we need to do is update the pointer of the element at the end of the list. No further copying or allocation is required.

We can compare the performance of the two structures by running `npm run perf:linked-list` or `yarn perf:linked-list`. This command runs a performance test of some basic list operations. After running the command you would get something like:

```
Get element:
  Array: 0.253ms
  Linked list: 0.669ms
Push element to end of list:
  Array: 1.242ms
  Linked list: 0.050ms
Push element to end of list:
  Only head pointer: 0.412ms
  With tail pointer: 0.050ms
```

The linked list inserts an element in 0.05ms whereas the array does it in 1.242ms (248x slower!).

## Variants

The most basic of linked lists is called a **singly linked list**. "Singly" means that each "node" in the list has a pointer to the next item, but does not know what item came before it.

A linked list usually only has a reference to the start or "head" of the list.
