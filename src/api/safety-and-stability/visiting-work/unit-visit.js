import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dwzfxxb/page`,
    method: 'POST',
    params: params
  })
}

// 非公有制经济组织单位搜索
export function searchUnit(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fgyzjjzzxxb/page`,
    method: 'POST',
    params: data
  })
}

// 非公有制经济组织单位搜索
export function searchUnitDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fgyzjjzzxxb/`,
    method: 'GET',
    params: { id: id }
  })
}

// 详情
export function getDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dwzfxxb/`,
    method: 'GET',
    params: { id: id }
  })
}

// 新增
export function addItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dwzfxxb/`,
    method: 'POST',
    data: data
  })
}

// 更新
export function updateItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dwzfxxb/`,
    method: 'PUT',
    data: data
  })
}

// 删除
export function deleteItem(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dwzfxxb/`,
    method: 'DELETE',
    params: params
  })
}
