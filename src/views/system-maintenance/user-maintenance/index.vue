<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>用户列表</h4>
      </template>

      <template #search-right>
        <el-input placeholder="搜索" size="mini" />
        <el-button size="mini" placeholder="请输入宗教堂点名称" @click="loadList">搜索</el-button>
        <el-button size="mini" @click="$message.info('高级搜索')">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="addInfo">新增用户</el-button>
        <el-button size="mini" icon="el-icon-minus" @click="delInfos">批量删除</el-button>
        <el-button size="mini" icon="el-icon-user" @click="addRoleInfo">配置角色</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh" @click="$message.info('刷新')">刷新</el-button>
      </template>

      <!-- 主要内容 -->
      <template #main-content>
        <!-- 列表 -->
        <ZtTable ref="mytable" v-bind.sync="tableOptions" @selection-change="changeSelected">
          <template #formatter-isenabled="{row}">
            <!-- {{ getStatus(row.isenabled) }} -->
            <ZtDictLabel :custom-options="statusArr" :value="row.isenabled" />
          </template>
        </ZtTable>
        <!-- 列表结束 -->
      </template>
      <!-- 主要内容结束 -->

    </ZtViewLayout>
    <AddDialog :dialog-config="dialogConfig" @updateList="loadList" />
    <AddRole :role-dialog-config="roleDialogConfig" />
    <AddOrganization :tree-dialog-config="treeDialogConfig" @updateList="loadList" />
  </div>
</template>

<script>
import { getPage, changeInfoState, delInfos } from '@/api/system-maintenance/user-maintenance'

import AddDialog from './addDialog'
import AddRole from './addRole'
import AddOrganization from '@/views/system-maintenance/user-maintenance/addOrganization'

export default {
  components: {
    AddDialog,
    AddRole,
    AddOrganization
  },
  data() {
    return {
      statusArr: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        },
        {
          label: '删除',
          value: -1
        }
      ],
      mulSelectionIds: [],
      // 用户弹窗配置
      dialogConfig: {
        title: '',
        dialogVisible: false,
        dialogType: '',
        row: {}
      },
      // 角色弹窗配置
      roleDialogConfig: {
        title: '',
        dialogVisible: false,
        dialogType: '',
        userId: ''
      },
      // 组织弹窗配置
      treeDialogConfig: {
        title: '',
        dialogVisible: false,
        dialogType: '',
        row: {}
      },
      // 表格配置
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
          icon: 'el-icon-delete',
          tooltip: '删除',
          danger: true,
          method: this.deleteRow,
          message: '此操作将删除当前用户记录'
        },
        {
          icon: 'el-icon-edit',
          tooltip: '编辑',
          danger: true,
          method: this.editRow,
          message: '此操作将修改当前用户记录'
        },
        {
          icon: 'el-icon-video-pause',
          tooltip: '禁用',
          danger: true,
          method: this.editState_2,
          isShow: (row) => {
            if (row.isenabled === 0) {
              return false
            } else {
              return true
            }
          },
          message: '此操作将禁用当前用户记录'
        },
        {
          icon: 'el-icon-video-play',
          tooltip: '启用',
          danger: true,
          method: this.editState_1,
          isShow: (row) => {
            if (row.isenabled === 1) {
              return false
            } else {
              return true
            }
          },
          message: '此操作将启用当前用户记录'
        },
        {
          icon: 'el-icon-s-order',
          tooltip: '配置组织',
          method: this.editOrganization
        }],
        columns: [{
          prop: 'loginid',
          label: '登录账号',
          width: '100'
        }, {
          prop: 'firstname',
          label: '用户名称',
          width: '100'
        }, {
          prop: 'mobile',
          label: '手机号',
          width: '80'
        }, {
          prop: 'lylx',
          label: '来源类型',
          dictCode: 'ZT00001'
        }, {
          prop: 'oucodelevel',
          label: '组织'
        }, {
          prop: 'isenabled',
          label: '状态'
        }, {
          prop: 'lastlogintime',
          label: '最近登陆时间'
        }]
      }
    }
  },
  computed: {

  },
  methods: {
    getStatus(status) {
      switch (status) {
        case '1':
          return '正常'
        case '0':
          return '禁用'
        case '-1':
          return '删除'
        default:
          break
      }
    },
    loadList() {
      this.$refs.mytable.reload()
    },
    // 配置角色
    addRoleInfo() {
      if (this.mulSelectionIds.length < 1) {
        this.$message.warning('请选择一条用户信息')
      } else if (this.mulSelectionIds.length > 1) {
        this.$message.warning('只能选择一条用户信息')
      } else {
        this.roleDialogConfig.dialogVisible = true
        this.roleDialogConfig.title = '配置角色'
        this.roleDialogConfig.userId = this.mulSelectionIds[0]
      }
    },
    addInfo() {
      this.dialogConfig.title = '新增用户信息'
      this.dialogConfig.dialogType = 'add'
      this.dialogConfig.dialogVisible = true
    },
    // 删除行
    deleteRow(row) {
      row.isenabled = -1
      changeInfoState(row).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.loadList()
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message.error('请求服务失败')
      })
      // changeInfoState(row.xxzjbh).then(res => {
      //   console.log(res)
      //   if (res.status === 200 && res.data.code === '000000') {
      //     this.loadList()
      //     this.$message.success({
      //       message: '删除成功'
      //     })
      //   } else {
      //     this.$message.error({
      //       message: '删除失败'
      //     })
      //   }
      // }).catch(() => {
      //   this.$message.error({
      //     message: '服务请求失败'
      //   })
      // })
    },
    // 编辑行
    editRow(row) {
      console.log(row)
      this.dialogConfig.row = row
      this.dialogConfig.title = '编辑用户信息'
      this.dialogConfig.dialogType = 'edit'
      this.dialogConfig.dialogVisible = true
    },
    // 批量删除操作
    delInfos() {
      this.$confirm('是否删除所选信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delInfos(this.mulSelectionIds).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.loadList()
            this.$message.success({
              message: '删除成功'
            })
          } else {
            this.$message.error({
              message: '删除失败'
            })
          }
        }).catch(() => {
          this.$message.error({
            message: '服务请求失败'
          })
        })
      }).catch(() => {
        this.$message.info({
          message: '已取消删除'
        })
      })
    },
    // row选择事件
    changeSelected(val) {
      this.mulSelectionIds = val instanceof Array ? val.map(item => {
        return item.userguid
      }) : []
      console.log(this.mulSelectionIds)
    },
    // 启用
    editState_1(row) {
      row.isenabled = 1
      changeInfoState(row).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.$message.success('启用成功')
        } else {
          this.$message.error('启用失败')
        }
      }).catch(() => {
        this.$message.error('请求服务失败')
      })
    },
    // 停用
    editState_2(row) {
      row.isenabled = 0
      changeInfoState(row).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.$message.success('停用成功')
        } else {
          this.$message.error('停用失败')
        }
      }).catch(() => {
        this.$message.error('请求服务失败')
      })
    },
    // 配置组织
    editOrganization(row) {
      this.treeDialogConfig.title = '配置组织'
      this.treeDialogConfig.dialogVisible = true
      this.treeDialogConfig.row = row
    }

  }
}
</script>

<style>

</style>
