import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sydxxxb/page?page=${data.pageNo}&size=${data.pageSize}`,
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
export function getSYDXDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sydxxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增双拥对象业务信息
export function addSYDXInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sydxxxb/`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 修改双拥对象业务信息
export function editSYDXInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sydxxxb/`,
    method: 'put',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 删除双拥对象信息
export function delSYDXInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sydxxxb/?id=${data}`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 批量删除双拥对象信息
export function delSYDXInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sydxxxb/batch`,
    method: 'post',
    data
  })
}
