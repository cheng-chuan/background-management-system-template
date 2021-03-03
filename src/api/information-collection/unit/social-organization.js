import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/shzzxxb/page`,
    method: 'POST',
    data
  })
}

// 详情
export function getDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/shzzxxb/`,
    method: 'GET',
    params: { id: id }
  })
}

// 新增
export function addItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/shzzxxb/`,
    method: 'POST',
    data: data
  })
}

// 更新
export function updateItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/shzzxxb/`,
    method: 'PUT',
    data: data
  })
}

// 删除
export function deleteItem(ids) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/shzzxxb/batch`,
    method: 'POST',
    data: ids
  })
}
