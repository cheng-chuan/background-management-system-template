
const getters = {
  code:state=>state.user.code,
  isRouterAlive:state=>state.user.isRouterAlive,
  layoutType: state => state.settings.layoutType, // 当前运行的样式
  module: state => state.app.module,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  grid: state => state.biz.grid,
  // 按 code 查询缓存的字典项
  dicoptions: state => state.biz.selectOptions,
  // 获取当前选择的网格对象信息
  gridinfos: state => {
    return state.biz.grid && state.biz.gridInfos ? state.biz.grid.map(item => state.biz.gridInfos[item]).filter(item => !!item) : []
  },
  // 网格code
  gridCode: state => ((state.biz.gridInfos && state.biz.grid && state.biz.grid.length > 0 && state.biz.gridInfos[state.biz.grid[state.biz.grid.length - 1]]) || {}).oucode || null,
  userInfo: state => state.user.userInfo,
  permissions: state => state.user.permissions,
  roles: state => state.user.roles,
  // 领导页
  timeType: state => state.reportview.timeType,
  reportdimensional: state => {
    if (state.reportview.reportdimensional.length !== 0) {
      return state.reportview.reportdimensional.filter((ele, index) => {
        return ele.countType === state.reportview.timeType
      })[0]
    } else {
      return {
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: 0,
        value6: 0,
        value7: 0,
        value8: 0
      }
    }
  },
  reportsortstrict: state => {
    if (state.reportview.reportsortstrict.length !== 0) {
      return state.reportview.reportsortstrict.filter((ele, index) => {
        return ele.countType === state.reportview.timeType
      }).slice(0, 10)
    }
  },
  // 各渠道上报量
  reportdatas: state => {
    if (state.reportview.reportdatas.length !== 0) {
      return state.reportview.reportdatas.filter((ele, index) => {
        return ele.countType === state.reportview.timeType
      })[0]
    } else {
      return {
        value1: '0',
        value2: '0',
        value3: '0',
        value4: '0',
        value5: '0',
        value6: '0',
        value7: '0',
        value8: '0',
        value9: '0',
        value10: '0',
        value11: '0',
        value12: '0',
        value13: '0',
        value14: '0',
        value15: '0',
        value16: '0',
        value17: '0',
        value18: '0'
      }
    }
  },

  // 辖区概况-月度
  reportdirstrictmonth: state => {
    if (state.reportview.reportdirstrictmonth.length !== 0) {
      // console.log(state.reportview.reportdirstrictmonth)
      return state.reportview.reportdirstrictmonth
    } else {
      return []
    }
  },
  // felend
  reportdirstrictfelend: state => {
    if (state.reportview.reportdirstrictfelend.length !== 0) {
      return state.reportview.reportdirstrictfelend
    } else {
      return []
    }
  },
  reportdirstrictfelendstreet: state => {
    if (state.reportview.reportdirstrictfelendstreet.length !== 0) {
      return state.reportview.reportdirstrictfelendstreet
    } else {
      return []
    }
  },
  // 辖区概况-地区
  reportdirstrict: state => {
    if (state.reportview.reportdirstrict.length !== 0) {
      return state.reportview.reportdirstrict.filter((ele, index) => {
        return ele.countType === state.reportview.timeType
      })
    } else {
      return []
    }
  },
  // 热点事件
  hotsortreport: state => {
    if (state.reportview.hotsortreport.length !== 0) {
      return state.reportview.hotsortreport.filter((ele, index) => {
        return ele.countType === state.reportview.timeType
      })
    } else {
      return null
    }
  }
}
export default getters
