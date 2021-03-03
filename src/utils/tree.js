import cloneDeep from 'lodash/cloneDeep'

function pnodes(pnodeName = '_pnode') {
  const pnodes = [this]
  let pnode = this[pnodeName]
  while (pnode) {
    pnodes.unshift(pnode)
    pnode = pnode[pnodeName]
  }
  return pnodes
}

// 列表转树
export function list2Tree(list, { idField = 'id', parentIdField = 'parentId', childrenField = 'children', rootId = '0', useOrigin = false } = {}) {
  if (!list || !Array.isArray(list)) return

  const _list = useOrigin ? list : cloneDeep(list)
  const tree = []

  _list.forEach((oriPnode) => {
    const pnode = oriPnode
    if (rootId === pnode[parentIdField]) {
      tree.push(pnode)
    }
    _list.forEach((oriCnode) => {
      const cnode = oriCnode
      if (cnode[parentIdField] === pnode[idField]) {
        if (!pnode[childrenField] || !Array.isArray(pnode[childrenField])) {
          pnode[childrenField] = []
        }
        pnode[childrenField].push(cnode)
      }
    })
  })

  return tree
}

// 深度遍历
export function deepFirstForeach(tree, action, { childrenFirld = 'children', useOrigin = false } = {}) {
  if (!tree || !Array.isArray(tree) || !action) return

  var _stack = [].concat(useOrigin ? tree : cloneDeep(tree))
  while (_stack.length) {
    const _curNode = _stack.shift()
    !_curNode.pnodes && (_curNode.pnodes = pnodes)
    action(_curNode)
    const children = _curNode[childrenFirld]
    if (children && children.length) {
      children.forEach(item => {
        item._pnode = _curNode
      })
      _stack = _curNode[childrenFirld].concat(_stack)
    }
  }
}

// 广度遍历
export function widthFirstForeach(tree, action, { childrenFirld = 'children', useOrigin = false } = {}) {
  if (!tree || !Array.isArray(tree) || !action) return
  var _queue = [].concat(useOrigin ? tree : cloneDeep(tree))
  while (_queue.length) {
    const _curNode = _queue.shift()
    action(_curNode)
    const children = _curNode[childrenFirld]
    if (children && children.length) {
      children.forEach(item => {
        item._pnode = _curNode
      })
      _queue = _queue.concat(_curNode[childrenFirld])
    }
  }
}

