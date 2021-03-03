import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/cjrxxb/page`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 查基础信息详情
export function getBasicDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ryjcxxb/?gmsfzh=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 查业务信息详情
export function getCJRDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/cjrxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增残疾人业务信息
export function addCJRInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/cjrxxb/`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 修改残疾人业务信息
export function editCJRInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/cjrxxb/`,
    method: 'put',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 删除残疾人信息
export function delCJRInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/cjrxxb/?id=${data}`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 批量删除残疾人信息
export function delCJRInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/cjrxxb/batch`,
    method: 'delete',
    data
  })
}
