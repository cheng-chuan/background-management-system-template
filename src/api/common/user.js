import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取当前登录用户
export function getUserInfo() {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/getUser`,
    method: 'GET'
  })
}

// 获取当前登录用户菜单列表
export function getMenus() {
  console.log(API_MODULE.COMPREHENSIVE_GOVERN)
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrolemenu/selectUserMenu`,
    method: 'GET'
  })
}

// 登出
export function logout() {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/logout`,
    method: 'GET'
  })
}
