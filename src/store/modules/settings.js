import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  layoutType: true, //当前系统为true，第三方为false
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_LATOUT_TYPE: (state, data) => {
    state.layoutType = data
  },

}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changelayouttype({ commit }, data) {
    commit('CHANGE_LATOUT_TYPE', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

