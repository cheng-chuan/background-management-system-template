import Layout from '@/layout'
import { MODULE } from '../const'

export default [
  {
    path: `/${MODULE.ORGANIZATION_TEAM}`,
    redirect: `/${MODULE.ORGANIZATION_TEAM}/comprehensive-management-organization/index`
  },
  {
    path: `/${MODULE.ORGANIZATION_TEAM}/comprehensive-management-organization`,
    component: Layout,
    redirect: `/${MODULE.ORGANIZATION_TEAM}/comprehensive-management-organization/index`,
    name: 'ComprehensiveManagementOrganizationMenu',
    meta: { title: '综治机构', icon: 'el-icon-news' },
    children: [
      {
        path: 'index',
        name: 'ComprehensiveManagementOrganization',
        component: () => import('@/views/temp'),
        meta: { title: '综治组织' }
      },
      {
        path: 'organization-infomation',
        name: 'OrganizationInfomation',
        component: () => import('@/views/temp'),
        meta: { title: '机构信息' }
      }
    ]
  },
  {
    path: `/${MODULE.ORGANIZATION_TEAM}/mass-prevention-and-treatment`,
    component: Layout,
    redirect: `/${MODULE.ORGANIZATION_TEAM}/mass-prevention-and-treatment/team-info`,
    name: 'MassPreventionAndTreatment',
    meta: { title: '群防群治', icon: 'el-icon-news' },
    children: [
      {
        path: 'team-infomation',
        name: 'TeamInfomation',
        component: () => import('@/views/temp'),
        meta: { title: '队伍信息' }
      },
      {
        path: 'organization-infomation',
        name: 'OrganizationInfomation',
        component: () => import('@/views/temp'),
        meta: { title: '组织信息' }
      }
    ]
  }
]
