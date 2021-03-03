import Layout from '@/layout'
import NestingRouter from '@/components/NestingRouter'
import { MODULE } from '../const'

export default [
  {
    path: `/${MODULE.INFORMATION_COLLECTION}`,
    redirect: `/${MODULE.INFORMATION_COLLECTION}/standard-address/index`
  },
  // 标准地址
  {
    path: `/${MODULE.INFORMATION_COLLECTION}/standard-address`,
    component: Layout,
    redirect: `/${MODULE.INFORMATION_COLLECTION}/standard-address/index`,
    name: 'StandardAddressMenu',
    meta: { title: '标准地址', icon: 'el-icon-news' },
    children: [{
      path: 'index',
      name: 'StandardAddress',
      component: () => import('@/views/information-collection/standard-address/standard-address/'),
      meta: { title: '标准地址' }
    }, {
      path: 'hosue-person',
      name: 'HousePerson',
      component: () => import('@/views/information-collection/standard-address/hosue-person/'),
      meta: { title: '以房管人' }
    }, {
      path: 'household-registration',
      name: 'HouseholdRegistration',
      component: () => import('@/views/information-collection/standard-address/household-registration/'),
      meta: { title: '户籍家庭' }
    }, {
      path: 'rental-housing',
      name: 'RentalHousing',
      component: () => import('@/views/information-collection/standard-address/rental-housing/'),
      meta: { title: '出租房' }
    }]
  },
  // 网格工作 -> 民意走访
  {
    path: `/${MODULE.INFORMATION_COLLECTION}/visiting-work`,
    component: Layout,
    redirect: `/${MODULE.INFORMATION_COLLECTION}/visiting-work/service-record`,
    name: 'VisitingWork',
    meta: { title: '民意走访', icon: 'el-icon-news' },
    children: [
      {
        path: 'service-record',
        name: 'serviceRRecord',
        component: () => import('@/views/temp'),
        meta: { title: '服务记录' }
      },
      {
        path: 'visit',
        name: '走访',
        component: () => import('@/views/temp'),
        meta: { title: '走访' }
      }
    ]
  },
  // 人口
  {
    path: `/${MODULE.INFORMATION_COLLECTION}/population`,
    component: Layout,
    redirect: `/${MODULE.INFORMATION_COLLECTION}/population/real-population`,
    name: 'Population',
    meta: { title: '人口', icon: 'el-icon-news' },
    children: [{
      path: `real-population`,
      redirect: `/${MODULE.INFORMATION_COLLECTION}/population/real-population/registered-population`,
      component: NestingRouter,
      name: 'RealPopulation',
      meta: { title: '实有人口' },
      children: [{
        path: 'registered-population',
        name: 'RegisteredPopulation',
        component: () => import('@/views/information-collection/population/real-population/registered-population'),
        meta: { title: '户籍人口' }
      }, {
        path: 'floating-population',
        name: 'FloatingPopulation',
        component: () => import('@/views/information-collection/population/real-population/floating-population'),
        meta: { title: '流动人口' }
      }, {
        path: 'resident-population',
        name: 'ResidentPopulation',
        component: () => import('@/views/information-collection/population/real-population/resident-population'),
        meta: { title: '常住人口' }
      }, {
        path: 'overseas-population',
        name: 'OverseasPopulation',
        component: () => import('@/views/information-collection/population/real-population/overseas-population'),
        meta: { title: '境外人员' }
      }
      ]
    },

    // 特殊人群
    {
      path: `special-population`,
      redirect: `/${MODULE.INFORMATION_COLLECTION}/population/special-population/important-young`,
      component: NestingRouter,
      name: 'SpacialPopulation',
      meta: { title: '特殊人群' },
      children: [{
        path: 'important-young',
        name: 'Important-young',
        component: () => import('@/views/information-collection/population/special-population/important-young'),
        meta: { title: '重点青少年' }
      },
      {
        path: 'important-visit',
        name: 'Important-visit',
        component: () => import('@/views/information-collection/population/special-population/important-visit'),
        meta: { title: '重点上访' }
      }, {
        path: 'community-correction',
        name: 'Community-correction',
        component: () => import('@/views/information-collection/population/special-population/community-correction'),
        meta: { title: '社区矫正' }
      }, {
        path: 'drug-related-population',
        name: 'Drug-related-population',
        component: () => import('@/views/information-collection/population/special-population/drug-related-population'),
        meta: { title: '涉毒人员' }
      }, {
        path: 'xmsf',
        name: 'xmsf',
        component: () => import('@/views/information-collection/population/special-population/xmsf'),
        meta: { title: '刑满释放' }
      }, {
        path: 'zszhjsbrxxb',
        name: 'zszhjsbrxxb',
        component: () => import('@/views/information-collection/population/special-population/zszhjsbrxxb'),
        meta: { title: '易肇事肇祸' }
      }
      ]
    },
    // 关注对象
    {
      path: `attention-population`,
      redirect: `/${MODULE.INFORMATION_COLLECTION}/population/attention-population/deformed-man`,
      component: NestingRouter,
      name: 'AttentionPopulation',
      meta: { title: '关注对象' },
      children: [{
        path: 'deformed-man',
        name: 'Deformed-man',
        component: () => import('@/views/information-collection/population/attention-population/deformed-man'),
        meta: { title: '残疾人' }
      },
      {
        path: 'double-support',
        name: 'Double-support',
        component: () => import('@/views/information-collection/population/attention-population/double-support'),
        meta: { title: '双拥人员' }
      },
      {
        path: 'lonely-old-man',
        name: 'lonely-old-man',
        component: () => import('@/views/information-collection/population/attention-population/lonely-old-man'),
        meta: { title: '空巢孤寡失助老人' }
      }
      ]
    }
    ]
  },
  // 单位
  {
    path: `/${MODULE.INFORMATION_COLLECTION}/unit`,
    component: Layout,
    redirect: `/${MODULE.INFORMATION_COLLECTION}/unit/social-organization`,
    name: 'Unit',
    meta: { title: '单位', icon: 'el-icon-news' },
    children: [{
      path: 'social-organization',
      name: 'SocialOrganization',
      component: () => import('@/views/information-collection/unit/social-organization/'),
      meta: { title: '社会组织' }
    }, {
      path: 'religion',
      name: 'Religion',
      component: () => import('@/views/information-collection/unit/religion/'),
      meta: { title: '宗教堂点' }
    }, {
      path: 'school',
      name: 'School',
      component: () => import('@/views/information-collection/unit/school/'),
      meta: { title: '学校' }
    }, {
      path: 'non-public',
      name: 'Nonpublic',
      component: () => import('@/views/information-collection/unit/non-public/'),
      meta: { title: '非公有制经济组织管理' }
    }]
  },
  {
    path: `/${MODULE.INFORMATION_COLLECTION}/convenient-service`,
    component: Layout,
    redirect: `/${MODULE.INFORMATION_COLLECTION}/convenient-service/dog-infomation`,
    name: 'DogRegistration',
    meta: { title: '便民服务', icon: 'el-icon-news' },
    alwaysFold: true,
    children: [{
      path: 'dog-infomation',
      name: 'DogInfomation',
      component: () => import('@/views/information-collection/convenient-service/dog-infomation'),
      meta: { title: '养犬信息' }
    }]
  },
  {
    path: `/${MODULE.INFORMATION_COLLECTION}/facilities`,
    component: Layout,
    redirect: `/${MODULE.INFORMATION_COLLECTION}/facilities/city-parts`,
    name: 'Facilities',
    meta: { title: '设施', icon: 'el-icon-news' },
    alwaysFold: true,
    children: [{
      path: 'city-parts',
      name: 'CityParts',
      component: () => import('@/views/information-collection/facilities/city-parts'),
      meta: { title: '城市部件' }
    }]
  }
]
