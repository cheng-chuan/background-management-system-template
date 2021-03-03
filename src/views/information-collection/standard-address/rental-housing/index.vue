<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>出租房管理列表</h4>
      </template>

      <template #search-right>
        <ZtDicSelect v-model="conditions.rentalPurpose" code="DM00039" />
        <el-button size="mini" @click="$message.info('搜索')">搜索</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini">操作</el-button>
      </template>

      <!-- 主要内容 -->
      <template #main-content>
        <!-- 列表 -->
        <ZtTable v-bind="tableOptions">
          <!-- 字段格式化插槽 formatter-xxx -->
          <template #formatter-noticeLevel="{row}">
            <ZtDot :color="parseNoticeLevel(row.noticeLevel).color">{{ parseNoticeLevel(row.noticeLevel).label }}</ZtDot>
          </template>
          <template #formatter-address="{row}">
            <el-link type="primary" @click="$message.info(row.address)">{{ row.address }}</el-link>
          </template>
          <template #formatter-rentalPersonCount="{row}">
            <el-link type="primary" @click="$message.info(`click:${row.rentalPersonCount}`)">{{ row.rentalPersonCount }}</el-link>
          </template>
        </ZtTable>
        <!-- 列表结束 -->
      </template>
      <!-- 主要内容结束 -->

    </ZtViewLayout>
  </div>
</template>

<script>
import { getList } from '@/api/information-collection/standard-address/rental-housing.js'

export default {
  props: {
    showGridSelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const llist = []
    for (let index = 0; index < 20; index++) {
      llist.push({
        noticeLevel: 'safe',
        addressId: '',
        address: '安乐巷10号',
        rentalPurpose: '1',
        rentalPersonCount: 2,
        houseAdminName: '熊飞',
        latestServiceTime: '2020-20-20 20:20:20',
        isGroupRent: 0
      })
      llist.push({
        noticeLevel: 'err',
        addressId: '',
        address: '安乐巷10号',
        rentalPurpose: '2',
        rentalPersonCount: 2,
        houseAdminName: '熊飞',
        latestServiceTime: '2020-20-20 20:20:20',
        isGroupRent: 0
      })
    }

    return {
      conditions: {
        rentalPurpose: null
      },
      // 列表配置
      tableOptions: {
        listData: llist,
        showIndex: true,
        showSelection: true,
        operations: [{
          icon: 'el-icon-edit',
          method: (row) => {
            this.$message.info('编辑')
          }
        }, {
          icon: 'el-icon-delete',
          danger: true,
          method: (row) => {
            this.$message.info('删除')
          },
          message: '即将删除'
        }],
        columns: [{
          prop: 'noticeLevel',
          label: '关注程度',
          fixed: true
        }, {
          prop: 'address',
          label: '房屋地址',
          width: 600
        }, {
          prop: 'rentalPurpose',
          label: '出租用途',
          width: 600,
          formatter: (row) => {
            return { '1': '出租' }[row.rentalPurpose] || '未知'
          }
        }, {
          prop: 'rentalPersonCount',
          label: '租户人数',
          width: '800'
        }, {
          prop: 'houseAdminName',
          label: '房主'
        }, {
          prop: 'latestServiceTime',
          label: '最新服务时间',
          width: 200
        }, {
          prop: 'isGroupRent',
          label: '是否群租',
          formatter: (row) => {
            return row.isGroupRent ? '是' : '否'
          }
        }]
      }
    }
  },
  created() {
    // this.loadList()
  },
  methods: {
    parseNoticeLevel(noticeLevel) {
      const unknow = {
        color: 'warning',
        label: '未知'
      }
      const nlevel = {
        safe: {
          color: 'success',
          label: '安全'
        }
      }
      return nlevel[noticeLevel] || unknow
    },
    loadList() {
      getList({ page: 1, size: 10 }).then(res => {
        console.log('rental-housing-list', res)
      }).catch(err => {
        console.error('rental-housing-list', err)
      })
    }
  }

}
</script>

<style lang='scss' scoped>
.search-info,
.operation-info  {
  background-color: #FAFAFA;
  height: 40px;
  padding: 5px 10px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
}

.search-info {
  .search-info-title{
    font-size: 16px;
  }
}
.table-header {
  position: absolute;
}

</style>
