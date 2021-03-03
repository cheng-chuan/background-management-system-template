import { MODULE as MODULE_ENUM } from './const'
import { deepFirstForeach } from '@/utils/tree'
import store from '@/store'
import cloneDeep from 'lodash/cloneDeep'
import LeaderIndexRoutes from './modules/leaderindex'
import homeRoutes from './modules/home'
import informationCollectionRoutes from './modules/information-collection'
import organizationTeamRoutes from './modules/organization-team'
import systemMaintenanceRoutes from './modules/system-maintenance'

// import gridWorkRoutes from './modules/grid-work'
// import safetyAndStabilityRoutes from './modules/safety-and-stability'
// import partyOrganizationRoutes from './modules/party-organization'

export function hasAnyPermissions(ps) {
  // return true
  const permissions = store.getters.permissions
  if (!permissions || !ps) return true
  return ps.some(v => permissions.includes(v))
}

export function hasAnyRoles(rs) {
  const roles = store.getters.roles
  if (!roles || !rs) return true
  return rs.some(v => roles.includes(v))
}

export function hasAllPermissions(ps) {
  const permissions = store.getters.permissions
  if (!permissions || !ps) return true
  return ps.every(v => permissions.includes(v))
}

export function hasAllRoles(rs) {
  const roles = store.getters.roles
  if (!roles || !rs) return true
  return rs.every(v => roles.includes(v))
}

// 分模块路由导出 配置模块路由
export const moduleRoutes = {
  // 领导首页
  [MODULE_ENUM.INDEX]: LeaderIndexRoutes,
  // 首页
  [MODULE_ENUM.HOME]: homeRoutes,
  // 信息采集
  [MODULE_ENUM.INFORMATION_COLLECTION]: informationCollectionRoutes,
  // 机构队伍
  [MODULE_ENUM.ORGANIZATION_TEAM]: organizationTeamRoutes,
  // 系统维护
  [MODULE_ENUM.SYSTEM_MAINTENANCE]: systemMaintenanceRoutes
}

// 所有模块路由导出
export const allModuleRoutes = [].concat(...Object.values(moduleRoutes))

// 模块枚举
export const MODULE = MODULE_ENUM

// 判断是否包含模块
export function hasModule(module) {
  return !!Object.values(MODULE_ENUM).find(item => item === module)
}

// 菜单过滤
export function filteredModuleRoutes(module) {
  const mrs = cloneDeep(moduleRoutes[module])
  deepFirstForeach(mrs, item => {
    // 按 fullpath 校验权限
    // if (!item.packOnly && !hasAnyPermissions([item.pnodes().map(item => item.path).join('/')])) {
    //   item.hidden = true
    // }
  }, { useOrigin: true })
  return mrs
}
