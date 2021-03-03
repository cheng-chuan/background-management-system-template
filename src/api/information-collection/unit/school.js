import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xxjbxxb/page`,
    method: 'post',
    data
  })
}

// 新增信息
export function addInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xxjbxxb/`,
    method: 'post',
    data: data
  })
}

// 编辑信息
export function editInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xxjbxxb/`,
    method: 'put',
    data: data
  })
}

// 删除
export function delInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xxjbxxb/?id=${data}`,
    method: 'delete',
    data
  })
}

// 批量删除
export function delInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xxjbxxb/batch`,
    method: 'post',
    data: data
  })
}
