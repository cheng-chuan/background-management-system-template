<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>标准地址列表</h4>
      </template>

      <template #search-right>
        <el-date-picker
          v-model="conditions.createDateRange"
          size="mini"
          type="datetimerange"
          range-separator="至"
          start-placeholder="新增时间 开始"
          end-placeholder="新增时间 结束"
        />
        <ZtDicSelect v-model="conditions.buildingUsage" hasnull code="LM00017" />
        <ZtDicSelect v-model="conditions.enable" hasnull :custom-options="enableOptions" />
        <el-input v-model="conditions.keyword" placeholder="请输入关键字…" size="mini" />
        <el-button size="mini" @click="loadPageList">搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="showAddDialog">新增</el-button>
        <el-button size="mini" icon="el-icon-delete">批量删除</el-button>
        <el-dropdown trigger="click">
          <el-button size="mini">
            更多菜单<i class="el-icon-caret-bottom el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>更多1</el-dropdown-item>
            <el-dropdown-item>更多2</el-dropdown-item>
            <el-dropdown-item>更多3</el-dropdown-item>
            <el-dropdown-item>更多4</el-dropdown-item>
            <el-dropdown-item>更多5</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button size="mini" icon="el-icon-refresh">刷新</el-button>
        <el-button size="mini">地址迁移</el-button>
      </template>

      <template #operate-right>
        <ZtDicSelect v-model="conditions.enable" hasnull :custom-options="enableOptions" />
        <el-button size="mini">Excel导入</el-button>
      </template>

      <!-- 主要内容 -->
      <template #main-content>
        <!-- 列表 -->
        <ZtTable v-bind.sync="tableOptions">
          <template #formatter-address="{row}">
            <el-link type="primary" @click="$message.info(row.jlxmc)">{{ formattRowAddress(row) }}</el-link>
          </template>
          <template #formatter-jzytdm="{row}">
            <ZtDictLabel code="LM00017" :value="row.jzytdm" />
          </template>
          <template #formatter-sfdsdm="{row}">
            {{ {'1':'地上','0':'地下'}[row.sfdsdm] || 'Unknow' }}
          </template>
          <template #formatter-syztdm="{row}">
            <ZtDictLabel :custom-options="enableOptions" :value="row.syztdm" />
          </template>
          <template #formatter-fwlbdm="{row}">
            <ZtDictLabel code="DM00025" :value="row.fwlbdm" />
          </template>
        </ZtTable>
        <!-- 列表结束 -->
      </template>
      <!-- 主要内容结束 -->

    </ZtViewLayout>

    <el-dialog v-bind.sync="formDialog">
      <StandardAddressForm v-if="formDialog.visible" ref="myForm" :data-id="formDialog.dataId" />
      <template #footer>
        <el-button size="mini" @click="formDialog.visible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import StandardAddressForm from './StandardAddressForm.vue'
import { getPage, deleteItem, addItem, updateItem } from '@/api/information-collection/standard-address/standard-address.js'
import { ENABLE_OPTS } from '@/api/common/dict'

export default {
  components: {
    StandardAddressForm
  },
  data() {
    const thiz = this
    return {
      // 更新弹窗 配置
      formDialog: {
        dataId: null,
        visible: false,
        title: '更新标准地址',
        width: '1400px',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false
      },
      // 自定义选线 - 启用选项
      enableOptions: ENABLE_OPTS,
      // 查询条件
      conditions: {
        createDateRange: null,
        buildingUsage: null,
        enable: null,
        keyword: null
      },
      // 表格配置
      tableOptions: {
        reloadListData: thiz.loadPageList,
        pageNumber: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        listData: [],
        showIndex: true,
        showSelection: true,
        operations: [{
          icon: 'el-icon-edit',
          method: (row) => {
            this.formDialog.dataId = row.dzbm
            this.formDialog.visible = true
          }
        }, {
          icon: 'el-icon-delete',
          method: this.deleteRow,
          danger: true,
          message: row => `即将删除地址 [${this.formattRowAddress(row)}]`
        }],
        columns: [{
          prop: 'address',
          label: '地址',
          width: '140',
          fixed: true
        }, {
          prop: 'jzytdm',
          label: '建筑用途',
          width: '80',
          fixed: true
        }, {
          prop: 'sszdyjxzqyDzbm',
          label: '所属网格',
          width: '140'
        }, {
          prop: 'jlxmc',
          label: '街路巷名称'
        }, {
          prop: 'zdh',
          label: '组（队）号',
          width: '100'
        }, {
          prop: 'mph',
          label: '门牌号',
          width: '80'
        }, {
          prop: 'sfwqtsj',
          label: '是否为迁移数据',
          width: '140'
        }, {
          prop: 'xqjzmc',
          label: '小区名称',
          width: '140'
        }, {
          prop: 'ldh',
          label: '楼栋号',
          width: '140'
        }, {
          prop: 'sfdsdm',
          label: '地上/地下',
          width: '140'
        }, {
          prop: 'syztdm',
          label: '启用状态',
          width: '140'
        }, {
          prop: 'fwlbdm',
          label: '房屋类别',
          width: '140'
        }, {
          prop: 'cxsj',
          label: '新增时间',
          width: '160'
        }, {
          prop: 'xgsj',
          label: '更新时间',
          width: '160'
        }]
      }
    }
  },
  methods: {
    formattRowAddress(row) {
      if (!row) return '-'
      return `${row.jlxmc || row.zdmc || '没有地址'}${row.zdh}号`
    },
    // 确认并删除
    deleteRow(row) {
      deleteItem([row.dzbm]).then(res => {
        this.$message.success('删除成功！')
        this.loadPageList()
      })
    },
    // 查询列表
    loadPageList() {
      this.tableOptions.loading = true
      getPage({
        page: this.tableOptions.pageNumber || 1,
        size: this.tableOptions.pageSize || 10
      }).then(res => {
        this.tableOptions.listData = res.data.datas
        this.tableOptions.total = res.data.total
        this.tableOptions.loading = false
      }).catch(() => {
        this.tableOptions.loading = false
      })
    },
    // 提交添加地址
    submitForm() {
      this.$refs.myForm.validate((valid, data) => {
        if (valid) {
          const sdata = cloneDeep(data)
          const dataPatch = {
            dzyslxdm: '1',
            jlxdm: '1',
            sszdyjxzqyDzbm: '1',
            syztdm: '1',
            ssjlxxqDzbm: '1',
            sjlyDsdm: '1',
            sjlyDsmc: '1'
          }
          if (this.formDialog.dataId) {
            updateItem(Object.assign(dataPatch, sdata)).then(res => {
              this.$message.success('修改成功！')
              this.formDialog.visible = false
              this.loadPageList()
            })
          } else {
            addItem(Object.assign(dataPatch, sdata)).then(res => {
              this.$message.success('添加成功！')
              this.formDialog.visible = false
              this.loadPageList()
            })
          }
        } else {
          this.$message.warning('请填完整写表单！')
        }
      })
    },
    // 显示新增表单
    showAddDialog() {
      this.formDialog.dataId = null
      this.formDialog.visible = '更新标准地址'
      this.formDialog.visible = true
    }
  }
}
</script>

<style>

</style>
