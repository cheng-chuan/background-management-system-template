<template>
  <el-dialog
    :title="rolePermissionDialogConfig.title"
    :visible.sync="rolePermissionDialogConfig.dialogVisible"
    :close-on-click-modal="false"
    width="width"
    @open="openDialog"
  >
    <el-tabs type="border-card">
      <el-tab-pane v-for="(item,index) in menuTree" :key="item.id" :label="item.name">
        <el-tree
          :ref="`tree${index}`"
          :check-strictly="true"
          show-checkbox
          :default-checked-keys="defaultCheckedKeys"
          :default-expanded-keys="defaultExpandedKeys"
          node-key="id"
          :data="[item]"
          :props="treeProps"
          @check-change="changeSelected"
        />
      </el-tab-pane>
    </el-tabs>

    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="commitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getMenuTree, getCheckedMenu, saveCheckedMenu } from '@/api/system-maintenance/role-maintenance'

export default {
  props: {
    rolePermissionDialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menuTree: [],
      treeProps: {
        label: 'name',
        id: 'id',
        children: 'sonBeanList'
      },
      defaultCheckedKeys: [], // 默认选中项
      defaultExpandedKeys: [], // 默认展开项
      mulSelectedInfo: []// 选中菜单项

    }
  },
  created() {
    this.initMenuTree()
  },
  methods: {
    initMenuTree() {
      getMenuTree().then(res => {
        this.menuTree = res.data.data
      })
    },
    initDefaultChecked(id) {
      getCheckedMenu(id).then(res => {
        this.mulSelectedInfo = res.data.data.map(item => item.menuId)
        this.defaultCheckedKeys = res.data.data.map(item => item.menuId)
        this.defaultExpandedKeys = res.data.data.map(item => item.menuId)
      })
    },
    openDialog() {
      // this.initMenuTree()
      this.initDefaultChecked(this.rolePermissionDialogConfig.roleId)
    },
    commitInfo() {
      const params = {}
      params.roleId = this.rolePermissionDialogConfig.roleId
      params.ids = this.mulSelectedInfo
      this.saveCheckedMenu(params)
    },
    cancel() {
      this.defaultCheckedKeys = []
      this.defaultExpandedKeys = []
      this.mulSelectedInfo = []
      this.rolePermissionDialogConfig.dialogVisible = false
    },
    saveCheckedMenu(params) {
      saveCheckedMenu(params).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.cancel()
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('请求服务失败')
      })
    },
    // 复选框选择事件
    changeSelected(val, isCheck) {
      if (isCheck) {
        const arr = this.mulSelectedInfo.map(item => item)
        if (arr.indexOf(val.id) === -1) {
          this.mulSelectedInfo.push(val.id)
        }
      } else {
        const index = this.mulSelectedInfo.findIndex(item => {
          return item === val.id
        })
        this.mulSelectedInfo.splice(index, 1)
      }
    }

  }
}
</script>

<style>

</style>
