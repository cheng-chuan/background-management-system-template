<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>非公有制经济组织管理</h4>
      </template>

      <template #search-right>
        <el-input placeholder="搜索" size="mini" />
        <el-button size="mini" @click="loadList">搜索</el-button>
        <el-button size="mini" @click="$message.info('高级搜索')">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="showAddFrom">新增</el-button>
        <el-button size="mini" icon="el-icon-minus" @click="$message.info('批量删除')">批量删除</el-button>
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

    <el-dialog v-bind="formDialog" :visible.sync="formDialog.visible">
      <NonPublic
        v-if="formDialog.visible"
        ref="myForm"
        :data-id="formDialog.dataId"
        @submitSuccess="handleFormSuccess"
      />
      <hr>
      <template #footer>
        <el-button size="mini" @click="formDialog.visible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { getPage, deleteItem } from '@/api/information-collection/unit/non-public.js'
import NonPublic from './NonPublic'

export default {
  components: {
    NonPublic
  },
  data() {
    return {
      formDialog: {
        dataId: null,
        visible: false,
        title: '',
        width: '1400px',
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
          icon: 'el-icon-edit',
          method: this.showEditFrom
        }, {
          icon: 'el-icon-delete',
          danger: true,
          method: (row) => {
            deleteItem([row.xxzjbh]).then(res => {
              this.$message.success('删除成功！')
              this.loadList()
            })
          },
          message: '此操作将删除该条记录'
        }],
        columns: [{
          prop: 'dwmc',
          label: '单位名称',
          width: '150'
        }, {
          prop: 'qylbdm',
          label: '单位类别',
          width: '150',
          dictCode: 'DM00011'
        }, {
          prop: 'jjxzdm',
          label: '单位经济性质',
          width: '150',
          dictCode: 'DM01513'
        }, {
          prop: 'jjlxdm',
          label: '单位经济类型',
          width: '150',
          dictCode: 'DM00030'
        }, {
          prop: 'coyryRs',
          label: '从业人员数',
          width: '150'
        }, {
          prop: 'fddbrXm',
          label: '单位法人',
          width: '150'
        }, {
          prop: 'dwdzQhnxxdz',
          label: '单位地址',
          width: '300'
        }]
      }
    }
  },
  methods: {
    showAddFrom() {
      if (!this.$store.getters.grid || this.$store.getters.grid.length !== 4) {
        this.$message.warning('行政区划请选择至 [网格] 级！')
        return
      }
      this.formDialog.title = '添加非公有制经济组织信息'
      this.formDialog.dataId = null
      this.formDialog.visible = true
    },
    showEditFrom(row) {
      this.formDialog.title = '编辑非公有制经济组织信息'
      this.formDialog.dataId = row.xxzjbh
      this.formDialog.visible = true
    },
    // 提及成功
    handleFormSuccess() {
      this.formDialog.visible = false
      this.loadList()
    },
    // 提交表单
    submitForm() {
      this.$refs.myForm.submitForm()
    },
    // 加载列表
    loadList() {
      this.$refs.mytable.reload()
    }
  }
}
</script>

<style>

</style>
