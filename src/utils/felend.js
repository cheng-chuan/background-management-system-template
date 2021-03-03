// var obj = {}
var colors = ['#568bfc', '#44c86f', '#f6a349', '#ff737d', '#51c9da', '#ef354b']
export const formatefelend = (data) => {
  if (data.length !== 0) {
    // var newdata = data.reduce((item, next) => {
    //   obj[next.dictName] ? '' : obj[next.dictName] = true && item.push(next)
    //   return item
    // }, [])
    // console.log(newdata)
    data.forEach((ele, index) => {
      ele.name = ele.dictName
      ele.marker = {
        symbol: 'circle',
        style: { fill: colors[index] }
      }
    })

    // console.log(newdata)
    return data
  }
}
// var objstreet = {}
export const formatefelendstreet = (data) => {
  if (data.length !== 0) {
    // var newdatastreet = data.reduce((item, next) => {
    //   objstreet[next.dictName] ? '' : objstreet[next.dictName] = true && item.push(next)
    //   return item
    // }, [])
    data.forEach((ele, index) => {
      ele.name = ele.dictName
      // ele.value = ele.value1
      ele.marker = {
        symbol: 'circle',
        style: { fill: colors[index] }
      }
    })
    return data
  }
}

