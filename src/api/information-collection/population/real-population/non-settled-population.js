import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 获取table列表
export function getList(data) {
  data.syrkgllbdm = '30'
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ryjcxxb/page`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 新增基础信息
export function addRegisteredPopulation(data) {
  data.syrkgllbdm = '30'
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ryjcxxb/`,
    method: 'post',
    data
  })
}

// 编辑基础信息
export function editRegisteredPopulation(data) {
  data.syrkgllbdm = '30'
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ryjcxxb/`,
    method: 'put',
    data
  })
}

// 新增户口信息
export function addRegisteredPopulationHK(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hkrkxxb/`,
    method: 'post',
    data
  })
}

// 编辑户口信息
export function editRegisteredPopulationHK(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hkrkxxb/`,
    method: 'put',
    data
  })
}

// 获取户口详情
export function detailRegisteredPopulationHK(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/hkrkxxb/?id=${data}`,
    method: 'get',
    data
  })
}

// 删除基本信息
export function deleteRegisteredPopulation(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/ryjcxxb/deleteIds`,
    method: 'put',
    data
  })
}

// 查询所有下拉框
export function searchAllDropDownBox(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dictDetail/selectList`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}

// 住房地址三级联动
export function getHouseAddress(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dzFwxxb/list?name=${data.name}&typeStr=${data.typeStr}`,
    method: 'get',
    data
  })
}

// 新增住房信息
export function addRegisteredPopulationZF(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zfxxb/`,
    method: 'post',
    data
  })
}

// 编辑住房信息
export function editRegisteredPopulationZF(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zfxxb/`,
    method: 'put',
    data
  })
}

// 删除住房信息
export function deleteRegisteredPopulationZF(id, typeStr) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zfxxb/?id=${id}&typeStr=${typeStr}`,
    method: 'delete'
  })
}

// 获取住房详情
export function getRegisteredPopulationZFList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zfxxb/page/?yybh=${data}`,
    method: 'get',
    data
  })
}
