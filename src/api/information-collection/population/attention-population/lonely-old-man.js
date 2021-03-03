import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/lnrxxb/page`,
    method: 'post',
    data
  })
}

// 查基础信息详情
export function getBasicDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ryjcxxb/?gmsfzh=${data}`,
    method: 'get',
    data
  })
}

// 查业务信息详情
export function getLNRDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/lnrxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    data
  })
}

// 新增老年人业务信息
export function addLNRInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/lnrxxb/`,
    method: 'post',
    data
  })
}

// 修改老年人业务信息
export function editLNRInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/lnrxxb/`,
    method: 'put',
    data
  })
}

// 删除老年人信息
export function delLNRInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/lnrxxb/?id=${data}`,
    method: 'delete',
    data
  })
}

