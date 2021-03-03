import Layout from '@/layout'
// import NestingRouter from '@/components/NestingRouter'
import { MODULE } from '../const'
export default [
  {
    path: `/${MODULE.HOME}`,
    component: Layout,
    redirect: `/${MODULE.HOME}/dashboard`,
    name: 'Home',
    meta: { title: '主页', icon: 'el-icon-news' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/home-page/dashboard'),
        meta: { title: '我的桌面', icon: 'el-icon-news' }
      }
    ]
  }
]
