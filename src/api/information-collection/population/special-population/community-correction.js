import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  console.log(111)
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqjzryxxb/page`,
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
export function getCommunityDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqjzryxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增社区矫正业务信息
export function addCommunityInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqjzryxxb/`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 修改社区矫正业务信息
export function editCommunityInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqjzryxxb/`,
    method: 'put',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 删除社区矫正业务信息
export function delCommunityInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqjzryxxb/?id=${data}`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 批量删除社区矫正信息
export function delCommunityInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqjzryxxb/batch`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}
