import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fgyzjjzzxxb/page`,
    method: 'POST',
    data: { ...data, sfxxxx: '2' }
  })
}

// 详情
export function getDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fgyzjjzzxxb/`,
    method: 'GET',
    params: { id: id }
  })
}

// 新增
export function addItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fgyzjjzzxxb/`,
    method: 'POST',
    data: data
  })
}

// 更新
export function updateItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fgyzjjzzxxb/`,
    method: 'PUT',
    data: data
  })
}

// 删除
export function deleteItem(ids) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fgyzjjzzxxb/batch`,
    method: 'POST',
    data: ids
  })
}
