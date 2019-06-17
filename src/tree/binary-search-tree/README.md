# Binary Search Trees

A binary search tree or BST is a particular type of tree that keeps its nodes in sorted order.

In a BST, each node in a node's **left** subtree is comparatively smaller than itself, while each node in its **right** subtree is comparatively larger.

Below is a tree of height 4 with 8 at its root:

```
        8
    ┌───┴───┐
    3       10
  ┌─┴─┐     └─┐
  1   6       14
     ┌┴┐     ┌┘
     4 7     13
```

This ordered structure allows for **very** fast insertions, removals, and lookups. With `n` nodes, lookup requires on average only `log n` operations.

Say for example you want to find the node `6` in the above tree. To find 6, we go through the following steps:

1. Is 6 less than 8? Yes, so look for 6 in the left subtree.
2. Is 6 less than 3? No, so look for 6 in the right subtree.
3. We find 6.

The ordering allows us to know whether we should look in the left or the right subtree. We know that if the value exists, then we only need to see if it's less than the current value. If it is, then it must be in the left subtree. If it's not, then it must be in the right subtree.

This lookup is much faster than the linear time that is required in other data structures like linked lists and arrays.

## API

The file `tree/binary-search-tree` exports a `BinarySearchTree` class. The constructor takes a **comparator** function and an optional list of initial values to be added to the tree. The comparator function is used to determine the ordering of the nodes.

### Example

```js
import BinarySearchTree from '@narendras/ds/tree/binary-search-tree'

const comparator = (a: number, b: number) => b - a

const values = [8, 3, 10, 1, 6, 14, 4, 7, 13]
const tree = new BinarySearchTree(comparator, ...values)

console.log(tree.print())
/*
logs:
      8
  ┌───┴───┐
  3       10
┌─┴─┐     └─┐
1   6       14
   ┌┴┐     ┌┘
   4 7     13
*/

tree.insert(2)
console.log(tree.print())
/*
logs:
      8
  ┌───┴───┐
  3       10
┌─┴─┐     └─┐
1   6       14
└┐ ┌┴┐     ┌┘
 2 4 7     13
*/
```
