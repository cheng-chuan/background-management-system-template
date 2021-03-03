import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { hasModule, hasAnyPermissions, MODULE } from '@/router/module'
import { Message } from 'element-ui'
import { dateFmt } from '@/utils/date.js'
import Axios from 'axios'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/500'] // no redirect whitelist

const watermarkInterval = null
// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()
//   if (window.location.ancestorOrigins[0]) {
//     if (window.location.ancestorOrigins[0].indexOf(`${process.env.VUE_APP_INDEX_OF_PROD_HOST}`) < 0) {
//       store.dispatch('settings/changelayouttype', false)
//       if (!window.localStorage.getItem('currentIndexRouter')) {
//         window.localStorage.setItem('currentIndexRouter', window.location.href)
//       }
//       if (!window.localStorage.getItem('lt')) {
//         if (to.query.code) {
//           store.dispatch('user/getcodethird', to.query.code)
//         } else {
//           location.href = process.env.VUE_APP_LODIN_REDICT_THIRD
//         }
//       }
//     }
//   } else {
//     document.title = getPageTitle(to.meta.title)
//     // 白名单过滤
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//       return
//     }
//     // 查询用户信息
//     if (!store.state.user.userInfo) {
//       try {
//         await store.dispatch('user/getInfo')
//       } catch (err) {
//         next({ path: '/500' })
//         NProgress.done()
//         return
//       }
//     }
//     // 用户信息检测
//     if (!store.state.user.userInfo) {
//       Message.error('没有获取到用户信息！')
//       next({ path: '/500' })
//       NProgress.done()
//     } else {
//       // 水印
//       const userInfo = store.state.user.userInfo
//       clearInterval(watermarkInterval)
//       if (window.watermark) {
//         window.watermark.load({
//           watermark_txt: `${userInfo.username}<br>扬州市广陵区12345平台<br>${dateFmt(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
//         })
//         watermarkInterval = setInterval(() => {
//           window.watermark.load({
//             watermark_txt: `${userInfo.username}<br>扬州市广陵区12345平台<br>${dateFmt(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
//           })
//         }, 5000)
//       }
//     }

//     // 跳转有权限的默认页
//     if (to.redirectedFrom === '/') {
//       if (store.getters.permissions && store.getters.permissions.length > 0) {
//         next({
//           path: store.getters.permissions.find(item => item.startsWith(`/${MODULE.INFORMATION_COLLECTION}`)) ||
//             store.getters.permissions.find(item => item.startsWith(`/${MODULE.ORGANIZATION_TEAM}`)) ||
//             store.getters.permissions.find(item => item.startsWith(`/${MODULE.SYSTEM_MAINTENANCE}`)) ||
//             store.getters.permissions.find(item => item.startsWith(`/${MODULE.INDEX}`))
//         })
//         return
//       }
//     }

//     // 后端权限角色未完成时暂时注释
//     // 通过 /12345/index 访问页面
//     // 如果是领导权限跳转单独的主页
//     // const leaderPath = '/index'
//     // if (store.state.user.userInfo.username === 'admin' && to.path !== leaderPath) {
//     //   router.push({ path: leaderPath })
//     // }

//     // 页面权限校验
//     // if (to.meta && to.meta.permissions && !hasAnyPermissions(to.meta.permissions)) {
//     if (to.path !== '/401' && !hasAnyPermissions([to.fullPath])) {
//       console.log('定向401')
//       next({ path: '/401' })
//       return
//     }

//     // 设置激活菜单
//     const toPaths = to.path.split('/')
//     const module = toPaths ? toPaths.filter(item => !!item)[0] : null
//     if (hasModule(module)) {
//       store.dispatch('app/switchModule', module)
//     }
//   }
//   next()
//   NProgress.done()
// })

router.afterEach(() => {
  NProgress.done()
})
