import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  console.log(111)
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdsfryxxb/page`,
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
export function getVisitDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdsfryxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增重点上访业务信息
export function addVisitInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdsfryxxb/`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 修改重点上访业务信息
export function editVisitInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdsfryxxb/`,
    method: 'put',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 删除重点上访业务信息
export function delVisitInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdsfryxxb/?id=${data}`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 批量删除重点上访信息
export function delVisitInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdsfryxxb/batch`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}
