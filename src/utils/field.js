// 读取属性
export function fchain(obj, fchain, def = null) {
  if (!obj || typeof obj !== 'object' || !fchain || typeof fchain !== 'string') return def
  const fields = fchain.split('.').filter(item => !!item)
  let fnext = obj
  fields.forEach(f => {
    if (fnext !== null && Object.prototype.hasOwnProperty.call(fnext, f)) {
      fnext = fnext[f]
    } else {
      fnext = null
    }
  })
  return fnext || def
}
