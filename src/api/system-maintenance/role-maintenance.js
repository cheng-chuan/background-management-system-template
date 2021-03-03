import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrole/page`,
    method: 'post',
    data
  })
}

// 新增角色信息
export function addInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrole/`,
    method: 'post',
    data: data
  })
}

// 编辑角色信息
export function editInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrole/`,
    method: 'put',
    data: data
  })
}

// 删除角色
export function delInfo(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrole/?id=${data}`,
    method: 'delete',
    data
  })
}

// 启用/停用角色
export function changeInfoState(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrole/updateStatus`,
    method: 'post',
    data
  })
}

// 批量删除角色
export function delInfos(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrole/batch`,
    method: 'post',
    data: data
  })
}

// 获取用户通过角色ID
export function getUsersByRoleId(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrole/findUsers/${data}`,
    method: 'get',
    data: data
  })
}

// 配置成员--新增
export function addUsersByRoleIdAndUserName(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuserrole/addRoleUsers/${data.userName}/${data.roleId}`,
    method: 'get',
    data
  })
}

// 配置成员--删除
export function delUsersByRoleIdAndUserId(params) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuserrole/deleteUsers`,
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    params
  })
}

// 获取所有成员
export function getAllUser(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysuser/page`,
    method: 'post',
    data
  })
}

// 获取菜单tree
export function getMenuTree(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysmenu/tree`,
    method: 'get',
    data
  })
}

// 查询角色下的菜单
export function getCheckedMenu(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrolemenu/selectRoleMenu/roleId/${data}`,
    method: 'get',
    data
  })
}

// 保存角色下配置的菜单
export function saveCheckedMenu(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysrolemenu/addRoleMenu`,
    method: 'post',
    data
  })
}
