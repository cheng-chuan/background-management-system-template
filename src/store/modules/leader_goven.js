import request from '@/utils/request'
import { API_MODULE } from '@/api/const'
import { formatefelend, formatefelendstreet } from '@/utils/felend'
export default {
  state: {
    timeType: '当日',
    reportdimensional: [],
    // 办理量排名
    reportsortstrict: [],
    // 各渠道上报量
    reportdatas: [],
    // 辖区概况
    reportdirstrict: [],
    reportdirstrictfelendstreet: [],
    reportdirstrictmonth: [],
    reportdirstrictfelend: [],
    // 热点事件统计排名
    hotsortreport: []
  },
  mutations: {
    changeTimeType: (state, data) => {
      state.timeType = data
    },
    reportdimensional: (state, data) => {
      state.reportdimensional = data
    },
    reportsortstrict: (state, data) => {
      state.reportsortstrict = data
    },
    reportdatas: (state, data) => {
      state.reportdatas = data
    },
    reportdirstrict: (state, data) => {
      state.reportdirstrict = data
    },
    reportdirstrictmonth: (state, data) => {
      state.reportdirstrictmonth = data
    },
    reportdirstrictfelend: (state, data) => {
      state.reportdirstrictfelend = data
    },
    hotsortreport: (state, data) => {
      state.hotsortreport = data
    },
    reportdirstrictstreet: (state, data) => {
      state.reportdirstrictstreet = data
    },
    reportdirstrictfelendstreet: (state, data) => {
      state.reportdirstrictfelendstreet = data
    }
  },
  actions: {
    // 改变时间类型
    changeTimeTypeMethod(context, data) {
      context.commit('changeTimeType', data)
    },
    // 异步操作（也可以定义同步方法）。提交mutation，而不是直接变更状态。
    reportdimensionalMethod(context, data) {
      return new Promise((resolve, reject) => {
        request({
          url: API_MODULE.COMPREHENSIVE_GOVERN + '/reportoverview/page',
          method: 'POST',
          data: data
        }).then(res => {
          if (res.data.datas.length !== 0 && res.data.datas !== null) {
            if (data.dimensional === '全区办理量') {
              context.commit('reportdimensional', res.data.datas)
            } else if (data.dimensional === '办理量排名-街道园区' || data.dimensional === '办理量排名-部门') {
              context.commit('reportsortstrict', res.data.datas)
            } else if (data.dimensional === '各渠道上报量') {
              context.commit('reportdatas', res.data.datas)
            } else if (data.dimensional === '辖区业务概况-地区') {
              context.commit('reportdirstrict', res.data.datas)
              context.commit('reportdirstrictfelendstreet', formatefelendstreet(res.data.datas))
            } else if (data.dimensional === '辖区业务概况-月度') {
              context.commit('reportdirstrictmonth', res.data.datas)
              context.commit('reportdirstrictfelend', formatefelend(res.data.datas))
            } else if (data.dimensional === '热点事件统计排名') {
              context.commit('hotsortreport', res.data.datas)
            }
          }
        }).catch(err => {
          // Message.error(`${err && err.data && err.data.message || '网络错误'}！`)
          reject(err)
        })
      })
    }
  }
}

