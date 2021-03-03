<template>
  <div class="app-container">
    <ZtViewLayout>
      <template #search-left>
        <h4>以房管人列表</h4>
      </template>

      <template #search-right>
        <el-input placeholder="搜索" size="mini" />
        <el-button size="mini" @click="loadList">搜索</el-button>
        <el-button size="mini" @click="$message.info('高级搜索')">高级搜索</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh" @click="loadList">刷新</el-button>
      </template>

      <!-- 主要内容 -->
      <template #main-content>
        <!-- 列表 -->
        <ZtTable ref="mytable" v-bind.sync="tableOptions" />
        <!-- 列表结束 -->
      </template>
      <!-- 主要内容结束 -->
    </ZtViewLayout>

    <el-dialog v-bind="detailDialog" :visible.sync="detailDialog.visible">
      <BuildingDetail v-if="detailDialog.visible && detailDialog.ctag === 'buildingDetail'" :detail-id="buildingDetail.detailId" />
      <BuildingStructureDetail v-if="detailDialog.visible && detailDialog.ctag === 'buildingStructureDetail'" :detail-id="buildingDetail.detailId" />
    </el-dialog>

    <el-dialog v-bind="formDialog" :visible.sync="formDialog.visible">
      <BuildingMaintenanceForm
        v-if="formDialog.visible"
        ref="myForm"
        :data-id="formDialog.detailId"
        @submitSuccess="handleFormSuccess"
      />
      <template #footer>
        <el-button size="mini" @click="formDialog.visible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { getPage } from '@/api/information-collection/standard-address/hosue-person'
import BuildingDetail from './BuildingDetail'
import BuildingStructureDetail from './BuildingStructureDetail'
import BuildingMaintenanceForm from './BuildingMaintenanceForm'

export default {
  components: {
    BuildingDetail,
    BuildingStructureDetail,
    BuildingMaintenanceForm
  },
  data() {
    return {
      buildingDetail: {
        detailId: null
      },
      formDialog: {
        dataId: null,
        visible: false,
        title: '维护楼栋信息',
        width: '800px',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: true
      },
      detailDialog: {
        ctag: null,
        visible: false,
        title: '',
        width: '800px',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: true
      },
      tableOptions: {
        listPromiseApi: getPage,
        reqParser: (pageNumber, pageSize) => {
          return { pageNo: pageNumber, pageSize: pageSize }
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
          icon: 'el-icon-s-order',
          tooltip: '详情',
          method: (row) => {
            this.buildingDetail.detailId = row.dzbm
            this.detailDialog.title = '查看楼宇'
            this.detailDialog.ctag = 'buildingDetail'
            this.detailDialog.visible = true
          }
        }, {
          icon: 'el-icon-s-home',
          tooltip: '维护房屋',
          method: (row) => {
            this.buildingDetail.detailId = row.dzbm
            this.detailDialog.title = '维护房屋'
            this.detailDialog.ctag = 'buildingStructureDetail'
            this.detailDialog.visible = true
          }
        }, {
          icon: 'el-icon-office-building',
          tooltip: '维护楼栋',
          method: (row) => {
            this.formDialog.title = '维护楼栋信息'
            this.formDialog.visible = true
          }
        }],
        columns: [{
          prop: 'dzbm',
          label: '地址编码',
          width: '200'
        }, {
          prop: 'address',
          label: '房屋地址',
          width: '300'
        }, {
          prop: 'fwlbdm',
          label: '房屋类型',
          width: '150',
          dictCode: 'DM00025'
        }, {
          prop: 'fzsl',
          label: '房间数',
          width: '120'
        }, {
          prop: 'rysl',
          label: '总人数',
          width: '100'
        }, {
          prop: 'tsrqsl',
          label: '特殊人群',
          width: '120'
        }, {
          prop: 'ghdxsl',
          label: '关怀人群',
          width: '120'
        }]
      }
    }
  },
  methods: {
    // 加载列表
    loadList() {
      this.$refs.mytable.reload()
    },
    // 提交表单
    submitForm() {
      this.$refs.myForm.submitForm()
    },
    // 提交成功
    handleFormSuccess() {
      this.formDialog.visible = false
      this.loadList()
    }
  }
}
</script>

<style>

</style>
