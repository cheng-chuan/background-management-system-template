import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import echarts from 'echarts'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// import '@/utils/drag-dialog'
import '@/utils/color.js'
import moment from 'moment'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

// 全局引入自定义组件
import customComponents from '@/components/common'
Vue.use(customComponents) // 必须有install

import { dateFmt } from '@/utils/date'
Vue.prototype.$dateFmt = dateFmt

import { fchain } from '@/utils/field'
// eslint-disable-next-line no-unused-vars
import { valid } from 'mockjs'
Vue.prototype.fchain = fchain

// vue filter
// 当input为时间戳时，需转为Number类型
Vue.filter('datrfmt', function(input, fmtstring) {
  return moment(input).format(fmtstring)
})
// 当input为时间戳时，需转为Number类型
Vue.filter('weekrfmt', function(input, fmtstring) {
  return moment(input).locale('zh-cn').format(fmtstring)
})
// 格式化身份证号码
Vue.filter('IdFormate', function(value) {
  if (value.length !== 0 && value !== undefined && value !== null && value.length > 5) {
    return value.substring(0, 4) + '*'.repeat(value.length - (4 + 2)) + value.substring(value.length - 2)
  } else {
    return value
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
