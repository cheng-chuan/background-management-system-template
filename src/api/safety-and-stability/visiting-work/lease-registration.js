import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/czdjxxb/page`,
    method: 'GET',
    params: params
  })
}

// 住房地址三级联动
export function searchAddress(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dzFwxxb/list`,
    method: 'GET',
    params
  })
}

// 住房地址编码
export function searchAddressCode(qhnxxdz) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dzFwxxb/adress`,
    method: 'GET',
    params: { qhnxxdz: qhnxxdz }
  })
}

// 详情
export function getDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/czdjxxb/`,
    method: 'GET',
    params: { id: id }
  })
}

// 新增
export function addItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/czdjxxb/`,
    method: 'POST',
    data: data
  })
}

// 更新
export function updateItem(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/czdjxxb/`,
    method: 'PUT',
    data: data
  })
}

// 删除
export function deleteItem(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/czdjxxb/`,
    method: 'DELETE',
    params: params
  })
}
