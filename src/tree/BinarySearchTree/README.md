# Binary Search Trees

A binary search tree or BST for short is a particular type of tree that keeps its nodes in sorted order.

In a BST, each node in a node's **left** subtree is comparatively smaller than itself, while each node in its **right** subtree is comparatively larger.

Below is a tree of height 4 with 8 at its root (also the output if you call `tree.print()`!):

```
        8      
    ┌───┴───┐  
    3       10  
  ┌─┴─┐     └─┐
  1   6       14
     ┌┴┐     ┌┘
     4 7     13 
```