<template>
  <el-dialog
    :title="roleDialogConfig.title"
    :visible.sync="roleDialogConfig.dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    @open="openDialog"
  >
    <div>
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in allRoles" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="commitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRolesByUserId, saveConfigRoles } from '@/api/system-maintenance/user-maintenance'

export default {
  props: {
    roleDialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      roleIds: [],
      allRoles: []
    }
  },
  methods: {
    openDialog() {
      getRolesByUserId(this.roleDialogConfig.userId).then(res => {
        // console.log(res)
        this.allRoles = res.data.data
      })
      // console.log(this.roleDialogConfig.userId)
    },
    commitInfo() {
      const params = {}
      params.userId = this.roleDialogConfig.userId
      params.roleIds = this.roleIds
      console.log(params)
      this.saveRoles(params)
    },
    saveRoles(params) {
      saveConfigRoles(params).then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.$message.success('角色保存成功')
          this.cancel()
        } else {
          this.$message.error('角色保存失败')
        }
      }).catch(() => {
        this.$message.error(() => {
          this.$message.error('请求服务失败')
        })
      })
    },
    cancel() {
      this.roleDialogConfig.dialogVisible = false
      this.roleIds = []
    }

  }
}
</script>

<style>

</style>
