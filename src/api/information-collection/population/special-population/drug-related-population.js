import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  console.log(111)
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sdryxxb/page`,
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
export function getDrugDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sdryxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增涉毒人员业务信息
export function addDrugInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sdryxxb/`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 修改涉毒人员业务信息
export function editDrugInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sdryxxb/`,
    method: 'put',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 删除涉毒人员业务信息
export function delDrugInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sdryxxb/?id=${data}`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 批量删除涉毒信息
export function delDrugInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sdryxxb/batch`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}
