import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zjtdxxb/page`,
    method: 'get',
    params: params
  })
}

// 新增信息
export function addInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zjtdxxb/`,
    method: 'post',
    data: data
  })
}

// 编辑信息
export function editInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zjtdxxb/`,
    method: 'put',
    data: data
  })
}

// 删除
export function delInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zjtdxxb/?id=${data}`,
    method: 'delete',
    data
  })
}

// 批量删除
export function delInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zjtdxxb/batch`,
    method: 'post',
    data: data
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
