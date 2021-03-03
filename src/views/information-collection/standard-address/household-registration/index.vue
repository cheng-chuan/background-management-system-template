<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>户籍家庭管理列表</h4>
      </template>

      <template #search-right>
        <ZtDicSelect hasnull />
        <el-input placeholder="搜索" size="mini" />
        <el-button size="mini" @click="loadList">搜索</el-button>
        <el-button size="mini" @click="$message.info('高级搜索')">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-minus" @click="$message.info('批量删除')">批量删除</el-button>
        <el-button size="mini" @click="$message.info('重置户号')">重置户号</el-button>
        <el-button size="mini" @click="$message.info('更换户主')">更换户主</el-button>
        <el-button size="mini" @click="$message.info('管理维护成员')">管理维护成员</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh" @click="$message.info('刷新')">刷新</el-button>
      </template>

      <!-- 主要内容 -->
      <template #main-content>
        <!-- 列表 -->
        <ZtTable ref="mytable" v-bind.sync="tableOptions" />
        <!-- 列表结束 -->
      </template>
      <!-- 主要内容结束 -->

    </ZtViewLayout>

    <el-dialog v-bind.sync="detailDialogConf">
      <HouseholdRegistrationDetail v-if="detailDialogConf.visible" v-bind="detailConf" />
    </el-dialog>

    <el-dialog v-bind.sync="populationDetailDialog">
      <el-tabs v-model="populationDetailConf.actTab">
        <el-tab-pane label="基本信息" name="p1">
          <PopulationBasicDetail v-if="populationDetailDialog.visible" :detail-id="populationDetailConf.basicDetailIdNumber" />
        </el-tab-pane>
        <el-tab-pane label="户籍信息" name="p2">
          <HouseholdRegistrationDetail v-if="populationDetailDialog.visible" nolink :detail-id="populationDetailConf.householdRegistrationHh" />
        </el-tab-pane>
        <el-tab-pane label="住房信息" name="p3">
          <PopulationBasicDetail v-if="populationDetailDialog.visible" :detail-id="populationDetailConf.housingId" />
        </el-tab-pane>
        <el-tab-pane label="产权信息" name="p4">
          <PopulationBasicDetail v-if="populationDetailDialog.visible" :detail-id="populationDetailConf.propertyRightId" />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

  </div>
</template>

<script>
import { getPage, deleteItem } from '@/api/information-collection/standard-address/household-registration.js'
import HouseholdRegistrationDetail from './HouseholdRegistrationDetail.vue'
import PopulationBasicDetail from './PopulationBasicDetail.vue'

export default {
  components: {
    HouseholdRegistrationDetail,
    PopulationBasicDetail
  },
  data() {
    return {
      detailConf: {
        detail: null,
        detailId: null
      },
      populationDetailConf: {
        actTab: 'p1',
        basicDetailIdNumber: null,
        householdRegistrationHh: null,
        housingId: null,
        propertyRightId: null
      },
      populationDetailDialog: {
        visible: false,
        title: '查看户籍人员详细信息',
        width: '800px',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: true
      },
      detailDialogConf: {
        visible: false,
        title: '查看户籍家庭',
        width: '800px',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: true
      },
      // 表格配置
      tableOptions: {
        listPromiseApi: getPage,
        reqParser: (pageNumber, pageSize) => {
          return { page: pageNumber, size: pageSize }
        },
        resParser: (res) => {
          return {
            total: res.data.total,
            rows: res.data.datas
          }
        },
        showIndex: true,
        showSelection: true,
        operations: [{
          icon: 'el-icon-delete',
          danger: true,
          method: this.deleteRow,
          message: '此操作将删除当前户籍人口记录'
        }],
        columns: [{
          prop: 'hh',
          label: '户号',
          width: '200',
          link: true,
          handleLink: (row) => {
            // 户号
            this.detailConf.detailId = row.hh
            this.detailDialogConf.visible = true
          }
        }, {
          prop: 'xm',
          label: '户主姓名',
          width: '200',
          link: true,
          handleLink: (row) => {
            // 身份证号
            this.populationDetailConf.basicDetailIdNumber = row.gmsfhm
            this.populationDetailConf.householdRegistrationHh = row.hh
            this.populationDetailDialog.visible = true
          }
        }, {
          prop: 'hjrkxxbsCount',
          label: '现有家庭成员数',
          width: '200'
        }, {
          prop: 'lxdh',
          label: '联系方式',
          width: '200'
        }]
      }
    }
  },
  methods: {
    loadList() {
      this.$refs.mytable.reload()
    },
    // 删除行
    deleteRow(row) {
      deleteItem({ HH: row.hh	 }).then(res => {
        this.$message.success('户籍家庭删除成功！')
        this.loadList()
      })
    }
  }
}
</script>

<style>

</style>
