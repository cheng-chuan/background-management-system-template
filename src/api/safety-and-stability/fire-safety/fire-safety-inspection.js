import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xfaqxcxxb/page`,
    method: 'POST',
    data: data
  })
}

// 详情
export function getDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xfaqxcxxb/`,
    method: 'GET',
    params: { xxzjbh: id }
  })
}

// 新增
export function addItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xfaqxcxxb/`,
    method: 'POST',
    data: data
  })
}

// 更新
export function updateItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xfaqxcxxb/`,
    method: 'PUT',
    data: data
  })
}

// 删除
export function deleteItem(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xfaqxcxxb/`,
    method: 'DELETE',
    params: params
  })
}
