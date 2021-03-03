import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xmsfryxxb/page`,
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
export function getXMSFDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xmsfryxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增刑满释放业务信息
export function addXMSFInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xmsfryxxb/`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 修改刑满释放业务信息
export function editXMSFInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xmsfryxxb/`,
    method: 'put',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 删除刑满释放信息
export function delXMSFInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xmsfryxxb/?id=${data}`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 批量删除重点青少年信息
export function delXMSFInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/xmsfryxxb/batch`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}
