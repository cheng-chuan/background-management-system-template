import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/kclrxcxxb/page`,
    method: 'post',
    data: data
  })
}

// 新增信息
export function addInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/kclrxcxxb/`,
    method: 'post',
    data: data
  })
}

// 编辑信息
export function editInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/kclrxcxxb/`,
    method: 'put',
    data: data
  })
}

// 删除
export function delInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/kclrxcxxb/?id=${data}`,
    method: 'delete',
    data
  })
}

// 批量删除
export function delInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/kclrxcxxb/batch`,
    method: 'post',
    data: data
  })
}
