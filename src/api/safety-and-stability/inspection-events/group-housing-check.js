import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 分页查询
export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/qzfwjcxxb/page`,
    method: 'post',
    data: data
  })
}

// 查询地址列表
export function getAddressPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dzJlxxqxxb/page?page=1&size=1000`,
    method: 'get',
    data: data
  })
}

// 新增信息
export function addInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/qzfwjcxxb/`,
    method: 'post',
    data: data
  })
}

// 编辑信息
export function editInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/qzfwjcxxb/`,
    method: 'put',
    data: data
  })
}

// 删除
export function delInfo(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/qzfwjcxxb/?xxzjbh=${params}`,
    method: 'delete',
    params: params
  })
}

// 批量删除
export function delInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/qzfwjcxxb/batch`,
    method: 'post',
    data: data
  })
}
