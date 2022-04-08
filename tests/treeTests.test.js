import { binaryTree, AVLTree, Util } from '../src/BST'

export const treeTests = (name, tree, balanceFactor) => {
  describe(`tree tests (${name})`, () => {
    test("insert to tree", () => {
      let t = new tree(10)

      call_func(t, "insert", 12, 6, 19, -77, 11, 7)

      // expected:
      //       10
      //    6      12
      //  -77   7  11   19

      expect(Util.treecmp(t,
        {
          item: 10,
          left: {item: 6, left: {item: -77}, right: {item: 7}},
          right: {item: 12, left: {item: 11}, right: {item: 19}}
        }
      )).toBe(true)

    })

    test("delete from tree", () => {
      let t = new tree(10)
      t.left = new tree(5)
      t.right = new tree(15)
      t.left.left = new tree(2)
      t.right.right = new tree(20)

      call_func(t, "delete", 5, 20)

      expect(Util.treecmp(t,
        {
          item: 10,
          left: {item: 2},
          right: {item: 15},
        }
      )).toBe(true)

      call_func(t, "delete", 15, 2)

      expect(Util.treecmp(t,
        {
          item: 10
        }
      )).toBe(true)

      t = new tree(10)
      t.left = new tree(5)

      t.delete(10)
      expect(Util.treecmp(t, {item: 5})).toBe(true)

      t = new tree(11)
      t.left = new tree(9)
      t.right = new tree(15)
      t.right.right = new tree(17)

      t.delete(11)

      expect(Util.treecmp(t,
        {
          item: 15,
          left: {item: 9},
          right: {item: 17}
        }
      )).toBe(true)
    })
  })
}

const avltests = (tree) => {
  describe(`AVL tests`, () => {
    describe(`insert to tree`, () => {
      test("insert balanced values", () => {
        let t = new tree(10)

        call_func(t, "insert", 12, 6, 19, 3, 11, 7)

        // expected:
        //       10
        //    6      12
        //  3   7  11   19

        expect(Util.treecmp(t,
          {
            item: 10,
            left: {item: 6, left: {item: 3}, right: {item: 7}},
            right: {item: 12, left: {item: 11}, right: {item: 19}}
          }
        )).toBe(true)
      })
      test("right rotate", () => {
        let t = new tree(10)
        t.insert(6)
        t.insert(5)

        expect(Util.treecmp(t,
          {
            item: 6,
            left: {item: 5},
            right: {item: 10}
          }
        )).toBe(true)

        t = new tree(10)

        call_func(t, "insert", 0, 20, 19, 22, 28)

        // expected:
        //       20
        //    10    22
        //  0   19    28

        expect(Util.treecmp(t,
          {
            item: 20,
            left: {item: 10, left: {item: 0}, right: {item: 19}},
            right: {item: 22, right: {item: 28}}
          }
        )).toBe(true)
      })
      test("left rotate", () => {
        let t = new tree(10)
        t.insert(12)
        t.insert(19)

        expect(Util.treecmp(t,
          {
          item: 12,
          left: {item: 10},
          right: {item: 19}
          }
        )).toBe(true)

        t = new tree(50)

        call_func(t, "insert", 55, 20, 19, 25, 10)

        // expected:
        //      20
        //   19    50
        //  10   25   55

        expect(Util.treecmp(t,
          {
            item: 20,
            left: {item: 19, left: {item:10}},
            right: {item:50, right: {item: 55}, left: {item:25}}
          }
        )).toBe(true)
      })
      test("right left rotate", () => {
        let t = new tree(10)
        t.insert(12)
        t.insert(11)

        expect(Util.treecmp(t,
          {
            item: 11,
            left: {item: 10},
            right: {item: 12}
          }
        )).toBe(true)
      })
      test("left right rotate", () => {
        let t = new tree(10)
        t.insert(7)
        t.insert(8)

        expect(Util.treecmp(t,
          {
            item: 8,
            left: {item: 7},
            right: {item: 10}
          }
        )).toBe(true)
      })
    })
    describe(`delete from tree`, () => {
      test("delete root", () => {
        let t = new tree(10)
        t.left = new tree(5)

        t.delete(10)
        expect(Util.treecmp(t, {item: 5})).toBe(true)

        t = new tree(11)
        t.left = new tree(9)
        t.right = new tree(15)
        t.right.right = new tree(17)

        t.delete(11)

        expect(Util.treecmp(t,
          {
            item: 15,
            left: {item: 9},
            right: {item: 17}
          }
        )).toBe(true)
      })
      test("delete balanced values", () => {
        let t = new tree(10)
        t.left = new tree(5)
        t.right = new tree(15)
        t.left.left = new tree(2)
        t.right.right = new tree(20)

        call_func(t, "delete", 5, 20)

        expect(Util.treecmp(t,
          {
            item: 10,
            left: {item: 2},
            right: {item: 15},
          }
        )).toBe(true)

        call_func(t, "delete", 15, 2)

        expect(Util.treecmp(t,
          {
            item: 10
          }
        )).toBe(true)

      })
      test("right rotate", () => {
        let t = new tree(10)
        t.left = new tree(5)
        t.right = new tree(20)
        t.left.left = new tree(0)
        t.right.right = new tree(25)

        call_func(t, "delete", 20, 25)
        expect(Util.treecmp(t,
          {
            item: 5,
            left: {item: 0},
            right: {item: 10}
          }
        )).toBe(true)
      })

      test("left rotate", () => {
        let t = new tree(10)
        t.left = new tree(2)
        t.right = new tree(55)
        t.left.left = new tree(0)
        t.right.right = new tree(100)

        call_func(t, "delete", 2, 0)

        expect(Util.treecmp(t,
          {
            item: 55,
            left: {item: 10},
            right: {item: 100}
          }
        )).toBe(true)

      })

      test("right left rotate", () => {
        let t = new tree(10)

        t.left = new tree(2)
        t.right = new tree(55)
        t.left.left = new tree(0)
        t.right.left = new tree(50)

        call_func(t, "delete", 0, 2)
        expect(Util.treecmp(t,
          {
            item: 50,
            left: {item: 10},
            right: {item: 55}
          }
        )).toBe(true)
      })

      test("left right rotate", () => {
        let t = new tree(10)

        t.left = new tree(2)
        t.right = new tree(55)
        t.left.right = new tree(8)
        t.right.right = new tree(66)
        t.right.right.right = new tree(90)

        call_func(t, "delete", 66, 90, 55)

        expect(Util.treecmp(t,
          {
            item: 8,
            left: {item: 2},
            right: {item: 10}
          }
        )).toBe(true)

      })
    })
  })
}

function call_func(obj, func, /*args*/) {
  let args = Array.prototype.slice.call (arguments, call_func.length);
  let l = args.length
  for (let i = 0; i < l; i++)
  {
    obj[func](args[i])
  }
}

treeTests("binaryTree", binaryTree)
treeTests("AVLTree", AVLTree)
avltests(AVLTree)
