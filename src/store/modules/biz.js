
import { findDicsByCode } from '@/api/common/dict'
import { Message } from 'element-ui'
import Vue from 'vue'

const state = {
  grid: [],
  gridInfos: {},
  selectOptions: {
    default: [{
      label: '默认项1',
      value: 'def1'
    }, {
      label: '默认项2',
      value: 'def2'
    }]
  }
}

const mutations = {
  // 设置字典下拉菜单列表
  SET_SELECT_OPTIONS: (state, { code, options }) => {
    Vue.set(state.selectOptions, code, options)
    // state.selectOptions[code] = options
  },
  // 设置当前选择的网格
  SWITCH_GRID: (state, grid) => {
    state.grid = grid
  },
  // 设置当前选择的网格
  STORE_GRID_INFO: (state, gridInfos) => {
    if (gridInfos) {
      gridInfos.forEach(ele => {
        Vue.set(state.gridInfos, ele.ouguid, ele)
      })
    }
  }
}

const jpo = new Date()
const jumpLock = {}

const actions = {
  // 通过字典 Code 加载字典选项
  loadOptionsByCode({ commit, state }, code) {
    return new Promise((resove, reject) => {
      if (jumpLock[code]) {
        resove()
        return
      }
      jumpLock[code] = jpo
      if (state.selectOptions[code]) {
        delete jumpLock[code]
        resove()
        return
      }
      findDicsByCode(code).then(res => {
        commit('SET_SELECT_OPTIONS', {
          code,
          options: res.data.datas.map(item => ({
            id: item.id,
            label: item.dictDetailName,
            value: item.dictDetailValue
          }))
        })
        delete jumpLock[code]
        resove()
      }).catch(err => {
        delete jumpLock[code]
        Message({
          message: `字典项[${code}]请求失败：${err && err.data && err.data.message || '网络错误！'}`,
          type: 'error',
          duration: 5 * 1000
        })
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

