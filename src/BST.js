class Tree {
  constructor(item) {
      this.item = item
      this.id = Util.node_id(item)
      this.left = null
      this.right = null
  }
  insert(item) {}
  delete(item) {}
}

class Util {

  /*
   * @returns int: tree depth
   */
  static depth(tree) {
    if (!tree) return
    let r = 0
    let l = 0

    if (tree.right) r = Util.depth(tree.right)
    if (tree.left) l = Util.depth(tree.left)

    return Math.max(r, l) + 1
  }

  /*
   * compare two trees
   */
  static treecmp(A, B) {
    if (!A || !B) return false
    let cmp = true

    if (A.left == null && B.left != null || A.left != null && B.left == null) cmp = false
    else if (A.left) cmp = cmp && Util.treecmp(A.left, B.left)

    if (A.right == null && B.right != null || A.right != null && B.right == null) cmp = false
    else if (A.right) cmp = cmp && Util.treecmp(A.right, B.right)

    cmp = cmp && ( A.item == B.item )
    return cmp
  }


  /*
   * @returns list: all items in tree
   */
  static all_items(tree) {
    if (!tree) return false

    let i = []
    if (tree.right) i = [...i, ...Util.all_items(tree.right)]
    if (tree.left) i = [...i, ...Util.all_items(tree.left)]
    i = [tree.item, ...i]
    return i
  }

  /*
   * @returns all x fields in tree
   */
  static all_x(tree, x) {
    if (!tree) return false

    let i = []
    if (tree.right) i = [...i, ...Util.all_x(tree.right, x)]
    if (tree.left) i = [...i, ...Util.all_x(tree.left, x)]
    i = [tree[x], ...i]
    return i
  }

  static all_ids(tree) {
    if (!tree) return false

    let i = []
    if (tree.right) i = [...i, ...Util.all_ids(tree.right)]
    if (tree.left) i = [...i, ...Util.all_ids(tree.left)]
    i = [tree.id, ...i]
    return i
  }

  /*
   * @returns bool: true if is balanced
   */
  static is_balanced(tree, bf) {
    if (!tree) return false

    let l = 0
    let r = 0

    let l_is_balanced = true
    let r_is_balanced = true

    if (tree.left) {
      l = Util.tree_info(tree.left)[0]
      l_is_balanced = Util.is_balanced(tree.left, bf)
     }
    if (tree.right) {
      r = Util.tree_info(tree.right)[0]
      r_is_balanced= Util.is_balanced(tree.right, bf)
    }

    let d = r - l
    let c = (d <= bf && d >= (bf * -1))

    return c && l_is_balanced && r_is_balanced
  }

  /*
   * @returns bool: true if is balanced (needs height field in tree)
   */
  static is_balanced_h(tree, bf) {
    if (!tree) return false

    let l = 0
    let r = 0

    let l_is_balanced = true
    let r_is_balanced = true

    if (tree.left) {
      l = tree.left.height
      l_is_balanced = Util.is_balanced_h(tree.left, bf)
     }
    if (tree.right) {
      r = tree.right.height
      r_is_balanced= Util.is_balanced_h(tree.right, bf)
    }

    let d = r - l
    let c = (d <= bf && d >= (bf * -1))

    return c && l_is_balanced && r_is_balanced
  }

  /*
   * @returns bool: true if is a BST
   */
  static is_bst(tree) {
    if (!tree) return false

    let t = tree.item
    let l = t-1
    let r = t+1

    let l_is_bst = true
    let r_is_bst = true

    if (tree.left) {
      l = tree.left.item
      l_is_bst = Util.is_bst(tree.left)
    }
    if (tree.right) {
      r = tree.right.item
      r_is_bst = Util.is_bst(tree.right)
    }

    return (l <= t && r >= t) && l_is_bst && r_is_bst
  }

  /*
   * @returns int: min value in tree
   */
  static min(tree) {
    while (tree.left != null) {
      tree = tree.left
    }
    return tree.item
  }

  /*
   * @returns int: max value in tree
   */
  static max(tree) {
    while (tree.right != null) {
      tree = tree.right
    }
    return tree.item
  }

  static node_id(item) {
    return Number.parseInt("" + item + Math.floor(Math.random() * (Math.pow(10, 9))))
  }

  static diff_by(a, b, diff) {
    let r = a - b
    if (r <= diff && r >= (diff * -1)) {
      return true
    }
    return false
  }

  /*
   * @returns list: [int: tree depth, int: node count, obj: {tree type}]
   */
  static tree_info(tree) {
    let right_depth = 0, left_depth = 0
    let count = 0
    let type = {
      "perfect": false,
      "degenarate": false,
      "balanced": false,
      "full": false,
      "leaf": false
    }
    let right = null, left = null

    if (tree == null) {
      return [0, 0, type]
    }
    else if (tree.left == null && tree.right == null) {
      type["leaf"] = true
      return [1, 1, type]
    }
    if (tree.left != null) {
      left = Util.tree_info(tree.left)
      left_depth = left[0]
      count += left[1]
    }
    if (tree.right != null) {
      right = Util.tree_info(tree.right)
      right_depth = right[0]
      count += right[1]
    }

    let left_type = null
    let right_type = null

    if (left) left_type = left[2]
    if (right) right_type = right[2]

    if (right_type && left_type) {
      if ((right_type["leaf"] == true || right_type["perfect"] == true) && (left_type["leaf"] == true || left_type["perfect"] == true) && (left_depth - right_depth == 0)) {
        type["perfect"] = true
      }
      if ((right_type["leaf"] == true || right_type["perfect"] == true) && (left_type["leaf"] == true || left_type["perfect"] == true)) {
        type["full"] = true
      }
      if (Util.diff_by(left_depth, right_depth, 1)) {
        type["balanced"] = true
      }
    }
    else if (right_type != left_type){
      if (right_type && (right_type["leaf"] == true || right_type["degenarate"] == true)) {
        type["degenarate"] = true
      }
      if (left_type && (left_type["leaf"] == true || left_type["degenarate"] == true)) {
        type["degenarate"] = true
      }
    }

    return [Math.max(left_depth, right_depth) + 1, count + 1, type]
  }

  /*
   * @returns list: [boolean: found, list: [path to item]]
   */
  static tree_search(tree, item) {
    if (tree == null) {
      return [false, [tree.id]]
    }
    if (tree.item == item) {
      return [true, [tree.id]]
    }
    else if (tree.item <= item && tree.right) {
      let search = Util.tree_search(tree.right, item)
      let found = search[0]
      let path = search[1]

      return [found, [tree.id, ...path]]
    }
    else if (tree.item > item && tree.left) {
     let search = Util.tree_search(tree.left, item)
     let found = search[0]
     let path = search[1]
     return [found, [tree.id, ...path]]
    }
    return [false, [tree.id]]
  }

  /*
   * search tree with duplicate items
   * @param d_right true if duplicates weighted to right
   *
   * @returns list: [boolean: found, list: [path to item]]
   */
  static tree_search_d(tree, item, d_right) {
    if (tree == null) {
      return [false, [tree.id]]
    }
    if (tree.item == item) {
      if (d_right && tree.right && tree.right.item == item) return [true, [tree.id, ...Util.tree_search_d(tree.right, item, d_right)]]
      else if (!d_right && tree.left && tree.left.item == item) return [true, [tree.id, ...Util.tree_search_d(tree.left, item, d_right)]]
      return [true, [tree.id]]
    }
    else if (tree.item <= item && tree.right) {
      let search = Util.tree_search_d(tree.right, item, d_right)
      let found = search[0]
      let path = search[1]

      return [found, [tree.id, ...path]]
    }
    else if (tree.item > item && tree.left) {
     let search = Util.tree_search_d(tree.left, item, d_right)
     let found = search[0]
     let path = search[1]
     return [found, [tree.id, ...path]]
    }
    return [false, [tree.id]]
  }

  /*
   * @returns int: leaf nodes in tree
   */
  static tree_leaf_nodes(node, level, mxlevel) {
      if (node == null) {
        return 1;
      }
      if (node.left == null && node.right == null)
          return 1;

      else if (level == mxlevel)
      {
          return 1;
      }
      return (Util.tree_leaf_nodes(node.left, level + 1, mxlevel)
      + Util.tree_leaf_nodes(node.right, level + 1, mxlevel))
  }
}

class AVLTree extends Tree {
  constructor(item) {
    super(item)
    this.height = 1
  }
  updateHeight() {
    if (!this.left && !this.right) {
      this.height = 1
      return this.height
    }
    let l = 0
    let r = 0
    if (this.left) {
      l = this.left.updateHeight()
    }
    if (this.right) {
      r = this.right.updateHeight()
    }
    this.height = Math.max(l, r) + 1
    return this.height
  }
  balance() {
    this.height = 1

    let balance = height(this.left) - height(this.right)

    if (balance > 1) {
      if (height(this.left.left) > height(this.left.right)) {
        this.rightRotate()
      }
      else {
        this.leftRightRotate()
      }
    }
    else if (balance < -1) {
      if (height(this.right.right) > height(this.right.left)) {
        this.leftRotate()
      } else {
        this.rightLeftRotate()
      }
    }

    this.updateHeight()
    return
  }
  setTree(node) {
    this.height = node.height
    this.left = node.left
    this.right = node.right
    this.item = node.item
  }
  delete(num) {
    if (this.item == num) {
      if (this.left && this.right) {
        let tmp = this.left
        let val = Util.min(this.right)

        if (val == this.right.item && !this.right.right && !this.right.left) this.right = null
        else this.right.delete(val)

        this.item = val
        this.left = tmp
      }
      else if (this.left) this.setTree(this.left)

      else if (this.right) this.setTree(this.right)

      this.balance()
      return
    }

    if (this.item > num && this.left) {
      if (this.left.item == num) {
        if (this.left.left && this.left.right) {
          let tmp = this.left.left
          let val = Util.min(this.left.right)
          this.left.delete(val)
          this.left.item = val
          this.left.left = tmp
        }
        else if (this.left.left) {
          this.left = this.left.left
        }
        else if (this.left.right) {
          this.left = this.left.right
        }
        else {
          this.left = null
        }

      } else {
        this.left.delete(num)
      }
    }
    else if (this.item <= num && this.right) {
      if (this.right.item == num) {
        if (this.right.right && this.right.left) {
          let tmp = this.right.left
          let val = Util.min(this.right.right)
          this.right.delete(val)
          this.right.item = val
          this.right.left = tmp
        }
        else if (this.right.right) {
          this.right = this.right.right
        }
        else if (this.right.left){
          this.right = this.right.left
        } else {
          this.right = null
        }
      }
      else {
        this.right.delete(num)
      }
    }

    this.balance()
    return
  }

  insert(num) {
    if (this.item > num) {
      if (this.left) this.left.insert(num)
      else this.left = new AVLTree(num)
    }
    else if (this.item <= num) {
      if (this.right) this.right.insert(num)
      else this.right = new AVLTree(num)
    }

    this.balance()
    return
  }

  rightRotate() {
    let tmp = this.left
    this.left = tmp.right

    let n = new AVLTree(this.item)
    n.setTree(this)

    tmp.right = n
    this.setTree(tmp)
  }

  leftRotate() {
    let tmp = this.right
    this.right = tmp.left

    let n = new AVLTree(this.item)
    n.setTree(this)

    tmp.left = n
    this.setTree(tmp)
  }

  leftRightRotate() {
     this.left.leftRotate()
     this.rightRotate();
  }

  rightLeftRotate() {
     this.right.rightRotate();
     this.leftRotate();
  }
}

function height(n) {
  return n == null ? 0 : n.height
}

class binaryTree extends Tree {
  constructor(item) {
      super(item)
  }

  setTree(node) {
    this.left = node.left
    this.right = node.right
    this.item = node.item
  }

  insert(data) {
    return this.insertTree(this, data)
  }

  insertTree(Tree, data) {
    if (Tree == null) {
      this.item = new binaryTree(data);
      return [this.id]
    }
    else if (this.item <= data && this.right) {
      return [this.id, ...this.right.insert(data)]
    }
    else if (this.item <= data) {
      this.right = new binaryTree(data)
      return [this.id, this.right.id]
    }
    else if (this.item > data && this.left) {
     return [this.id, ...this.left.insert(data)]
    }
    else if (this.item > data) {
     this.left = new binaryTree(data)
     return [this.id, this.left.id]
   }
   return []
  }

  depth() {
    return this.depthTree(this)
  }

  depthTree(Tree) {
    let r = 0, l = 0
    if (Tree == null) {
      return 1
    }
    else if (Tree.left == null && Tree.right == null) {
      return 1
    }
    if (Tree.left != null) {
      r = this.depthTree(Tree.left)
    }
    if (Tree.right != null) {
      l = this.depthTree(Tree.right)
    }
    return Math.max(l, r) + 1
  }

  delete(item) {
    if (this.item == item) {
      if (this.left && this.right) {
        let tmp = this.left
        let val = Util.min(this.right)

        if (val == this.right.item && !this.right.right && !this.right.left) this.right = null
        else this.right.delete(val)

        this.item = val
        this.left = tmp
      }
      else if (this.left) this.setTree(this.left)

      else if (this.right) this.setTree(this.right)

      return
    }

    else if (item < this.item && this.left != null) {

      if (item == this.left.item){
        if (this.left.left == null && this.left.right == null) {
          this.left = null
        }
        else if (this.left.left == null) {
          this.left = this.left.right
        }
        else if (this.left.right == null) {
          this.left = this.left.left
        }
        else {
          let val = Util.min(this.left.right)
          if (val == this.left.item) {
            this.left.item = val-1
            this.left.delete(val)
            this.left.item = val
          } else {
            this.delete(val)
            this.left.item = val
          }
        }
      }
      else {
        this.left.delete(item)
      }
    }

    else if (item >= this.item && this.right != null) {

      if (item == this.right.item){
        if (this.right.left == null && this.right.right == null) {
          this.right = null
        }
        else if (this.right.left == null) {
          this.right = this.right.right
        }
        else if (this.right.right == null) {
          this.right = this.right.left
        }
        else {
          let val = Util.min(this.right.right)

          // if successor is the same as the value to be deleted
          if (val == this.right.item) {
            this.right.item = val-1
            this.right.delete(val)
            this.right.item = val
          } else {
            this.delete(val)
            this.right.item = val
          }
        }
      }
      else {
        this.right.delete(item)
      }
    }
  }
}

export { binaryTree, AVLTree }
export { Util }
