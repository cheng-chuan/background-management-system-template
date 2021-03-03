import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ldrkgxryxxb/page`,
    method: 'GET',
    params: params
  })
}

// 搜索流动人口
export function searchFloatingPopulation({ data, params }) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ldrkxxb/page`,
    method: 'POST',
    data: data,
    params: params
  })
}

// 搜索流动人口
export function searchFloatingPopulationDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ldrkxxb/`,
    method: 'GET',
    params: { id: id }
  })
}

// 详情
export function getDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ldrkgxryxxb/`,
    method: 'GET',
    params: { id: id }
  })
}

// 新增
export function addItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ldrkgxryxxb/`,
    method: 'POST',
    data: data
  })
}

// 更新
export function updateItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ldrkgxryxxb/`,
    method: 'PUT',
    data: data
  })
}

// 删除
export function deleteItem(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ldrkgxryxxb/`,
    method: 'DELETE',
    params: params
  })
}
