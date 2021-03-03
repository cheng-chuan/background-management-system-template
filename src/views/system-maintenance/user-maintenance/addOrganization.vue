<template>
  <el-dialog
    :title="treeDialogConfig.title"
    :visible.sync="treeDialogConfig.dialogVisible"
    :close-on-click-modal="false"
    width="width"
    @open="openDialog"
  >
    <el-tree
      ref="tree"
      show-checkbox
      :data="treeData"
      :props="treeProps"
      :default-expanded-keys="defaultExpandedKeys"
      :check-strictly="true"
      node-key="ouguid"
      @node-click="nodeClick"
      @check-change="checkNodeChange"
    />
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="commitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getOrganizations, saveUserOrganzition } from '@/api/system-maintenance/user-maintenance'

export default {
  props: {
    treeDialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checked: [],
      defaultExpandedKeys: [],
      treeData: [],
      treeProps: {
        label: 'ouname',
        id: 'ouguid',
        children: 'children'
      }
    }
  },
  created() {
    this.initOrganzationTree()
  },
  methods: {
    initOrganzationTree() {
      getOrganizations().then(res => {
        this.treeData = [res.data.data]
      }).catch(() => {
        this.$message.error('获取组织失败')
      })
    },
    openDialog() {
      // console.log(this.treeDialogConfig.row)
      this.$nextTick(() => {
        if (this.treeDialogConfig.row.ouguid) {
          this.$refs.tree.setCheckedKeys([this.treeDialogConfig.row.ouguid], true)
          this.defaultExpandedKeys = [this.treeDialogConfig.row.ouguid]
        } else {
          this.$refs.tree.setCheckedKeys([])
          this.defaultExpandedKeys = []
        }
      })
    },
    commitInfo() {
      const params = this.treeDialogConfig.row ? this.treeDialogConfig.row : {}
      params.oucodelevel = this.checked[0] ? this.checked[0].oucodelevel : ''
      params.ouguid = this.checked[0] ? this.checked[0].ouguid : ''
      console.log(params)
      this.saveOrganzation(params)
    },
    // 保存组织方法
    saveOrganzation(params) {
      saveUserOrganzition(params).then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.cancel()
          this.$emit('updateList')
          this.$message.success('保存组织成功')
        } else {
          this.$message.error('保存组织失败')
        }
      }).catch(() => {
        this.$message.error('服务请求失败')
      })
    },
    cancel() {
      this.checked = []
      this.$refs.tree.setCheckedKeys([], true)
      this.defaultExpandedKeys = []
      this.$refs.tree.setCheckedNodes([])
      this.treeDialogConfig.dialogVisible = false
      console.log(this.checked)
    },
    nodeClick(data, node) {
      // console.log(data, node)
    },
    checkNodeChange(data, isChecked) {
      // console.log(data, isChecked)
      if (isChecked) {
        this.$refs.tree.setCheckedNodes([data])
        this.checked = [data]
      } else {
        this.checked = []
      }
    }

  }
}
</script>

<style>

</style>
