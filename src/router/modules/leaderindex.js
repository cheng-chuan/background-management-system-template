import { MODULE } from '../const'
export default [
  {
    path: `/${MODULE.INDEX}`,
    component: () => import('@/views/leaderIndex/leaderIndex'),
    name: 'Index',
    meta: { title: '主页', icon: 'el-icon-news' }
  }
]
