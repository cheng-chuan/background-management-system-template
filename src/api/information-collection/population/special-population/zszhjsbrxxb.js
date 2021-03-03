import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zszhjsbrxxb/page`,
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
export function getYZHZSDetail(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zszhjsbrxxb/getBySfz?gmsfhm=${data}`,
    method: 'get',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增肇事肇祸业务信息
export function addYZHZSInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zszhjsbrxxb/`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 修改肇事肇祸业务信息
export function editYZHZSInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zszhjsbrxxb/`,
    method: 'put',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 删除肇事肇祸信息
export function delYZHZSInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zszhjsbrxxb/?id=${data}`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 批量删除重点青少年信息
export function delYZHZSInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zszhjsbrxxb/batch`,
    method: 'delete',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}
