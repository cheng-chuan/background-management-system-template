import Layout from '@/layout'
import { MODULE } from '../const'

export default [
  {
    path: `/${MODULE.SYSTEM_MAINTENANCE}`,
    redirect: `/${MODULE.SYSTEM_MAINTENANCE}/user-maintenance`
  },
  {
    path: `/${MODULE.SYSTEM_MAINTENANCE}/user-maintenance`,
    component: Layout,
    redirect: `/${MODULE.SYSTEM_MAINTENANCE}/user-maintenance/index`,
    packOnly: true,
    children: [
      {
        path: 'index',
        name: 'UserMaintenance',
        component: () => import('@/views/system-maintenance/user-maintenance'),
        meta: { title: '用户管理', icon: 'el-icon-news' }
      }
    ]
  },
  {
    path: `/${MODULE.SYSTEM_MAINTENANCE}/role-maintenance`,
    component: Layout,
    redirect: `/${MODULE.SYSTEM_MAINTENANCE}/role-maintenance/index`,
    packOnly: true,
    children: [
      {
        path: 'index',
        name: 'RoleMaintenance',
        component: () => import('@/views/system-maintenance/role-maintenance'),
        meta: { title: '角色管理', icon: 'el-icon-news' }
      }
    ]
  },
  {
    path: `/${MODULE.SYSTEM_MAINTENANCE}/menu-maintenance`,
    component: Layout,
    redirect: `/${MODULE.SYSTEM_MAINTENANCE}/menu-maintenance/index`,
    packOnly: true,
    children: [
      {
        path: 'index',
        name: 'MenuMaintenance',
        component: () => import('@/views/system-maintenance/menu-maintenance'),
        meta: { title: '菜单管理', icon: 'el-icon-news' }
      }
    ]
  }
]
