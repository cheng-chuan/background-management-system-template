import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/page`,
    method: 'post',
    data
  })
}

// 查询用户信息详情
export function getDetailInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/getUser`,
    method: 'get',
    data: data
  })
}

// 新增用户信息
export function addInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/`,
    method: 'post',
    data: data
  })
}

// 编辑用户信息
export function editInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/`,
    method: 'put',
    data: data
  })
}

// 删除/启用/停用用户
export function changeInfoState(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/updateIsEnabled`,
    method: 'post',
    data
  })
}

// 批量删除用户
export function delInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/batch`,
    method: 'post',
    data: data
  })
}

// 查询角色信息
export function getRolesByUserId(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/findRole/${data}`,
    method: 'get',
    data: data
  })
}

// 保存配置角色
export function saveConfigRoles(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/configRole`,
    method: 'post',
    data: data
  })
}

// 查询组织信息
export function getOrganizations(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/configOu`,
    method: 'get',
    data: data
  })
}

// 保存用户组织
export function saveUserOrganzition(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/saveUserOu`,
    method: 'post',
    data: data
  })
}
