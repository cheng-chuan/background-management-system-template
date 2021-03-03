import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdqsnxxb/page`,
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
export function getYoungDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdqsnxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增重点青少年业务信息
export function addYoungInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdqsnxxb/`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 修改重点青少年业务信息
export function editYoungInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdqsnxxb/`,
    method: 'put',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 删除重点青少年信息
export function delYoungInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdqsnxxb/?id=${data}`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 批量删除重点青少年信息
export function delYoungInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zdqsnxxb/batch`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}
