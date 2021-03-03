import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkzfxxb/page`,
    method: 'POST',
    params: params
  })
}

// 详情
export function getDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkzfxxb/`,
    method: 'GET',
    params: { id: id }
  })
}

// 新增
export function addItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkzfxxb/`,
    method: 'POST',
    data: data
  })
}

// 更新
export function updateItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkzfxxb/`,
    method: 'PUT',
    data: data
  })
}

// 删除
export function deleteItem(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkzfxxb/`,
    method: 'DELETE',
    params: params
  })
}
