<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>社会组织信息</h4>
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
      <SocialOrganization
        v-if="formDialog.visible"
        ref="myForm"
        :data-id="formDialog.dataId"
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
import { getPage, deleteItem } from '@/api/information-collection/unit/social-organization.js'
import SocialOrganization from './SocialOrganization'

export default {
  components: {
    SocialOrganization
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
          label: '组织名称',
          width: '150'
        }, {
          prop: 'shzzlxdm',
          label: '组织类别',
          width: '150',
          dictCode: 'DM01563'
        }, {
          prop: 'fddbrXm',
          label: '法定代表人',
          width: '150'
        }, {
          prop: 'clrqRq',
          label: '成立日期',
          width: '150'
        }, {
          prop: 'zzdzQhnxxdz',
          label: '办公地址',
          width: '150'
        }, {
          prop: 'sfbdbzfw',
          label: '是否绑定标准房屋',
          width: '150',
          formatter: () => '否'
        }, {
          prop: 'sfyzgdzzPdbz',
          label: '是否有党组织',
          width: '150',
          formatter: (row) => row.sfyzgdzzPdbz === '1' ? '是' : '否'
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
      this.formDialog.title = '添加社会组织'
      this.formDialog.dataId = null
      this.formDialog.visible = true
    },
    showEditFrom(row) {
      this.formDialog.title = '编辑社会组织'
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
