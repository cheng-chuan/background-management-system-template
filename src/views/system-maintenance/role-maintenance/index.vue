<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>角色列表</h4>
      </template>

      <template #search-right>
        <el-input placeholder="搜索" size="mini" />
        <el-button size="mini" placeholder="请输入宗教堂点名称" @click="loadList">搜索</el-button>
        <el-button size="mini" @click="$message.info('高级搜索')">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="addInfo">新增角色</el-button>
        <el-button size="mini" icon="el-icon-minus" @click="delInfos">批量删除</el-button>
        <el-button size="mini" icon="el-icon-user" @click="addRolePermission">角色权限</el-button>
        <el-button size="mini" icon="el-icon-user" @click="addRoleMember">角色成员</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh" @click="$message.info('刷新')">刷新</el-button>
      </template>

      <!-- 主要内容 -->
      <template #main-content>
        <!-- 列表 -->
        <ZtTable ref="mytable" v-bind.sync="tableOptions" @selection-change="changeSelected">
          <template #formatter-status="{row}">
            <ZtDictLabel :custom-options="statusArr" :value="row.status" />
          </template>
        </ZtTable>
        <!-- 列表结束 -->
      </template>
      <!-- 主要内容结束 -->

    </ZtViewLayout>
    <AddDialog :dialog-config="dialogConfig" @updateList="loadList" />
    <AddRolePermission ref="permissionSon" :role-permission-dialog-config="rolePermissionDialogConfig" />
    <AddRoleMember :role-member-dialog-config="roleMemberDialogConfig" />
  </div>
</template>

<script>
import { getPage, delInfo, delInfos, changeInfoState } from '@/api/system-maintenance/role-maintenance'

import AddDialog from './addDialog'
import AddRolePermission from './addRolePermission'
import AddRoleMember from '@/views/system-maintenance/role-maintenance/addRoleMember'

export default {
  components: {
    AddDialog,
    AddRolePermission,
    AddRoleMember
  },
  data() {
    return {
      statusArr: [
        {
          value: 1,
          label: '正常'
        }, {
          value: 0,
          label: '禁用'
        }
      ],
      mulSelectionIds: [],
      // 角色弹窗配置
      dialogConfig: {
        title: '',
        dialogVisible: false,
        dialogType: '',
        row: {}
      },
      // 角色权限弹窗配置
      rolePermissionDialogConfig: {
        title: '',
        dialogVisible: false,
        dialogType: '',
        roleId: ''
      },
      // 角色成员弹窗配置
      roleMemberDialogConfig: {
        title: '',
        dialogVisible: false,
        dialogType: '',
        roleId: ''
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
          message: '此操作将删除当前角色记录'
        },
        {
          icon: 'el-icon-edit',
          tooltip: '编辑',
          danger: true,
          method: this.editRow,
          message: '此操作将修改当前角色记录'
        },
        {
          icon: 'el-icon-video-pause',
          tooltip: '禁用',
          isShow: (row) => {
            if (row.status === 0) {
              return false
            } else {
              return true
            }
          },
          danger: true,
          method: this.editState_1,
          message: '此操作将禁用当前角色记录'
        },
        {
          icon: 'el-icon-video-play',
          tooltip: '启用',
          isShow: (row) => {
            if (row.status === 1) {
              return false
            } else {
              return true
            }
          },
          danger: true,
          method: this.editState_2,
          message: '此操作将启用当前角色记录'
        }],
        columns: [{
          prop: 'name',
          label: '角色名称'
        }, {
          prop: 'code',
          label: '角色编码'
        }, {
          prop: 'remark',
          label: '角色备注'
        }, {
          prop: 'status',
          label: '状态'
        }, {
          prop: 'createDate',
          label: '创建时间'
        }]
      }
    }
  },
  methods: {
    loadList() {
      this.$refs.mytable.reload()
    },
    // 配置角色权限
    addRolePermission() {
      if (this.mulSelectionIds.length < 1) {
        this.$message.warning('请选择一条信息')
      } else if (this.mulSelectionIds.length > 1) {
        this.$message.warning('只能选择一条信息')
      } else {
        this.$refs.permissionSon.initMenuTree()
        this.rolePermissionDialogConfig.dialogVisible = true
        this.rolePermissionDialogConfig.title = '角色权限'
        this.rolePermissionDialogConfig.roleId = this.mulSelectionIds[0]
      }
    },
    // 角色成员
    addRoleMember() {
      if (this.mulSelectionIds.length < 1) {
        this.$message.warning('请选择一条信息')
      } else if (this.mulSelectionIds.length > 1) {
        this.$message.warning('只能选择一条信息')
      } else {
        this.roleMemberDialogConfig.title = '角色成员'
        this.roleMemberDialogConfig.dialogVisible = true
        this.roleMemberDialogConfig.roleId = this.mulSelectionIds[0]
      }
    },
    addInfo() {
      this.dialogConfig.title = '新增角色信息'
      this.dialogConfig.dialogType = 'add'
      this.dialogConfig.dialogVisible = true
    },
    // 删除行
    deleteRow(row) {
      delInfo(row.id).then(res => {
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
        return item.id
      }) : []
    },
    // 停用
    editState_1(row) {
      row.status = 0
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
    // 启用
    editState_2(row) {
      row.status = 1
      changeInfoState(row).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.$message.success('启用成功')
        } else {
          this.$message.error('启用失败')
        }
      }).catch(() => {
        this.$message.error('请求服务失败')
      })
    }

  }
}
</script>

<style>

</style>
