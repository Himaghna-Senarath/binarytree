import { Util } from '../src/BST'
import { binaryTree } from '../src/BST'

let tree = binaryTree

test("Util.tree_search()", () => {
  let t = {item: 5, id: 5,
            left: {item: -5, id: -5, left: {item: -55, id: -55}, right: {item: -3, id: -3}},
            right: {item: 55, id: 55, right: {item: 155, id: 155}, left: {item: 10, id: 10}}}

  expect(Util.tree_search(t, 5)[0]).toBe(true)
  expect(Util.tree_search(t, -5)[0]).toBe(true)
  expect(Util.tree_search(t, 55)[0]).toBe(true)
  expect(Util.tree_search(t, -55)[0]).toBe(true)
  expect(Util.tree_search(t, -3)[0]).toBe(true)
  expect(Util.tree_search(t, 10)[0]).toBe(true)
  expect(Util.tree_search(t, 155)[0]).toBe(true)

  expect(Util.tree_search(t, -55)[1]).toEqual([5, -5, -55])
  expect(Util.tree_search(t, -3)[1]).toEqual([5, -5, -3])
  expect(Util.tree_search(t, 155)[1]).toEqual([5, 55, 155])

})

test("treeinfo()", () => {
  let t = new tree(9)
  t.insert(1)
  t.insert(10)

  let info = Util.tree_info(t)

  let depth = info[0]
  let ncount = info[1]
  let type = info[2]

  expect(depth).toBe(2)
  expect(ncount).toBe(3)
  expect(type).toEqual({
    "perfect":true,
    "balanced":true,
    "full":true,
    "degenarate":false,
    "leaf":false
  })

  t = new tree(33)
  t.insert(0)
  t.insert(-1)
  t.insert(-9)

  info = Util.tree_info(t)

  depth = info[0]
  ncount = info[1]
  type = info[2]

  expect(depth).toBe(4)
  expect(ncount).toBe(4)
  expect(type).toEqual({
    "perfect":false,
    "balanced":false,
    "full":false,
    "degenarate":true,
    "leaf":false
  })

  t = new tree(44)
  t.insert(22)
  t.insert(55)
  t.insert(11)
  t.insert(33)

  info = Util.tree_info(t)

  depth = info[0]
  ncount = info[1]
  type = info[2]

  expect(depth).toBe(3)
  expect(ncount).toBe(5)
  expect(type).toEqual({
    "perfect":false,
    "balanced":true,
    "full":true,
    "degenarate":false,
    "leaf":false
  })

  t = new tree(44)

  info = Util.tree_info(t)

  depth = info[0]
  ncount = info[1]
  type = info[2]

  expect(depth).toBe(1)
  expect(ncount).toBe(1)
  expect(type).toEqual({
    "perfect":false,
    "balanced":false,
    "full":false,
    "degenarate":false,
    "leaf":true
  })

})
