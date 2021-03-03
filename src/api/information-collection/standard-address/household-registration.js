import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkxxb/page`,
    method: 'GET',
    params: params
  })
}

// 详情
export function getDetail(hh) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkxxb/`,
    method: 'GET',
    params: { HH: hh }
  })
}

// 新增
export function addItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkxxb/`,
    method: 'POST',
    data: data
  })
}

// 删除
export function deleteItem(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hjrkxxb/`,
    method: 'DELETE',
    params: params
  })
}
