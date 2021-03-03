import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 查询菜单tree
export function getModule(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysmenu/tree`,
    method: 'get',
    data
  })
}

// 查询菜单详情
export function getModuleById(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysmenu/?id=${data}`,
    method: 'get',
    data
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysmenu/`,
    method: 'post',
    data
  })
}

// 修改菜单tree
export function modify(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysmenu/`,
    method: 'put',
    data
  })
}

// 删除菜单tree
export function deleteMenu(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysmenu/?id=${data}`,
    method: 'delete',
    data
  })
}
