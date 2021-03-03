<template>
  <el-dialog
    :title="roleMemberDialogConfig.title"
    :visible.sync="roleMemberDialogConfig.dialogVisible"
    :close-on-click-modal="false"
    width="width"
    @open="openDialog"
  >
    <div style="display:flex;justify-content:space-between">
      <el-button type="normal" size="mini" @click="delUsers">删除</el-button>
      <div>
        <el-select v-model="userName" filterable clearable size="small" placeholder="请输入账号">
          <el-option
            v-for="item in allUserList"
            :key="item.userguid"
            :label="item.loginid"
            :value="item.loginid"
          />
        </el-select>
        <el-button type="primary" size="mini" style="margin-left:10px" @click="addUser">新增</el-button>
      </div>
    </div>
    <div style="height:450px">
      <ZtTable ref="mytable_2" v-bind.sync="memberTableOptions" @selection-change="changeSelected" />
    </div>
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="commitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getUsersByRoleId, addUsersByRoleIdAndUserName, delUsersByRoleIdAndUserId, getAllUser } from '@/api/system-maintenance/role-maintenance'

export default {
  props: {
    roleMemberDialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      allUserList: [],
      userName: '',
      mulselectedIds: [],
      // 表格配置
      memberTableOptions: {
        listPromiseApi: getUsersByRoleId,
        reqParser: () => {
          return this.roleMemberDialogConfig.roleId
        },
        resParser: (res) => {
          return {
            total: res.data.total,
            rows: res.data.data
          }
        },
        simplePage: true,
        showIndex: false,
        showSelection: true,
        // operations: [{
        //   icon: 'el-icon-delete',
        //   tooltip: '删除',
        //   danger: true,
        //   method: this.deleteRow,
        //   message: '此操作将删除当前角色记录'
        // },
        // {
        //   icon: 'el-icon-edit',
        //   tooltip: '编辑',
        //   danger: true,
        //   method: this.editRow,
        //   message: '此操作将修改当前角色记录'
        // },
        // {
        //   icon: 'el-icon-video-pause',
        //   tooltip: '禁用',
        //   danger: true,
        //   method: this.editState,
        //   message: '此操作将禁用当前角色记录'
        // },
        // {
        //   icon: 'el-icon-video-play',
        //   tooltip: '启用',
        //   danger: true,
        //   method: this.editState,
        //   message: '此操作将启用当前角色记录'
        // }],
        columns: [{
          prop: 'loginid',
          label: '账号'
        }, {
          prop: 'firstname',
          label: '姓名'
        }, {
          prop: 'mobile',
          label: '手机号'
        }, {
          prop: 'oucodelevel',
          label: '所属机构'
        }]
      }

    }
  },
  created() {
    this.initAllUser({ pageNo: 1, pageSize: 100000000 })
  },
  methods: {
    loadList() {
      this.$refs.mytable_2.reload()
    },
    initAllUser(params) {
      getAllUser(params).then(res => {
        this.allUserList = res.data.datas
      })
    },
    openDialog() {
      this.$nextTick(() => {
        this.loadList()
      })
    },
    commitInfo() {

    },
    // 新增事件
    addUser() {
      const params = {}
      params.userName = this.userName
      params.roleId = this.roleMemberDialogConfig.roleId
      this.addUsersByRoleIdAndUserName(params)
      // console.log(params)
    },
    delUsers() {
      const params = {}
      params.roleId = this.roleMemberDialogConfig.roleId
      params.ids = this.mulselectedIds.join(',')
      this.delUsersByRoleIdAndUserId(params)
      // console.log(params)
    },
    cancel() {
      this.roleMemberDialogConfig.dialogVisible = false
    },
    // 新增用户操作
    addUsersByRoleIdAndUserName(params) {
      addUsersByRoleIdAndUserName(params).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.loadList()
          this.$message.success('新增成功')
        } else {
          this.$message.error('新增失败')
        }
      }).catch(() => {
        this.$message.error('请求服务失败')
      })
    },
    // 删除用户操作
    delUsersByRoleIdAndUserId(params) {
      delUsersByRoleIdAndUserId(params).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.loadList()
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        this.$message.error('请求服务失败')
      })
    },
    changeSelected(val) {
      this.mulselectedIds = val ? val.map(item => item.userguid) : []
    }
  }
}
</script>

<style>

</style>
