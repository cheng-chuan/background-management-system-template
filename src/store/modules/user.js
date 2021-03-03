import { getUserInfo, getMenus, logout } from '@/api/common/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
import { list2Tree, deepFirstForeach } from '@/utils/tree.js'
import Axios from 'axios'
import Cookies from 'js-cookie'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: null,
    permissions: [],
    // permissionInfos: [],
    roles: null,
    roleInfos: null,
    code: null, // 第三方code获取，不存在为空
    isRouterAlive: true // 刷新路由
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = state.permissions.concat(permissions)
  },
  SET_CODE_THIRD: (state, data) => {
    state.code = data
  }
}

const actions = {
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // 初始化用户，菜单权限
      Promise.all([getUserInfo(), getMenus()]).then((values) => {
        const userRes = values[0]
        const menuRes = values[1]
        if (userRes) {
          const userInfo = userRes.data.data
          commit('SET_NAME', userInfo && (userInfo.nickname || userInfo.username || '未命名'))
          commit('SET_AVATAR', userInfo && userInfo.avatar || 'https://wx2.sbimg.cn/2020/08/29/6u69K.jpg')
          commit('SET_USER_INFO', userInfo)
        }
        if (menuRes) {
          // todo
          const menus = menuRes.data.data
          const pers = []
          deepFirstForeach(list2Tree(menus, { rootId: null }), item => {
            pers.push(item.pnodes().map(item => item.url).join(''))
          })
          commit('SET_PERMISSIONS', pers)
        }
        resolve()
      }).catch(err => {
        Message.error(`用户信息初始化失败：${err && err.data && err.data.message || '网络错误'}！`)
        reject(err)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        // 目前接口是 302 无法执行一下代码
        removeToken() // must remove  token  first
        resetRouter()
      }).catch(err => {
        console.error('logout fail!', err)
      })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // 用第三方code获取token
  getcodethird({ commit }, data) {
    Axios.get(`${process.env.VUE_APP_GT_CODE_TOKEN}?code=` + data).then(res => {
      console.log(res)
      if (res.data.code === '000000') {
        window.localStorage.setItem('lt', res.data.data.token)
        window.location.href = window.localStorage.getItem('currentIndexRouter')
      } else {
        Message.error('系统正在维护中！')
        window.localStorage.clear()
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

