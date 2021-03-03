<template>
  <el-dialog
    :title="dialogConfig.title"
    :visible.sync="dialogConfig.dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    :before-close="dialogBeforeClose"
    @open="openDialog"
  >
    <el-form ref="formData" :model="formData" label-width="90px">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="角色名称：">
            <el-input v-model="formData.name" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="角色编码：">
            <el-input v-model="formData.code" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="角色备注：">
            <el-input v-model="formData.remark" type="textarea" rows="5" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="commitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addInfo, editInfo } from '@/api/system-maintenance/role-maintenance'

export default {
  props: {
    dialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  created() {

  },
  methods: {
    openDialog() {
      // console.log(this.dialogConfig)
      this.formData = this.dialogConfig.row ? this.dialogConfig.row : {}
    },
    dialogBeforeClose() {
      this.cancel()
    },
    cancel() {
      this.dialogConfig.dialogVisible = false
      this.dialogConfig.row = {}
      this.formData = {}
    },
    commitInfo() {
      this.formData.qhnxxdz = this.assistHouseAddress
      if (this.dialogConfig.dialogType === 'add') {
        console.log('add')
        addInfo(this.formData).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.cancel()
            this.$emit('updateList')
            this.$message.success({
              message: '新增成功'
            })
          } else {
            this.$message.error({
              message: '新增失败'
            })
          }
        }).catch(() => {
          this.$message.error({
            message: '服务请求失败'
          })
        })
      } else if (this.dialogConfig.dialogType === 'edit') {
        console.log('edit')
        editInfo(this.formData).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.cancel()
            this.$emit('updateList')
            this.$message.success({
              message: '编辑成功'
            })
          } else {
            this.$message.error({
              message: '编辑失败'
            })
          }
        }).catch(() => {
          this.$message.error({
            message: '服务请求失败'
          })
        })
      }
    }

  }

}
</script>

<style scoped lang='scss'>
.el-icon-plus {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.el-icon-plus:hover {
  border-color: #409eff;
}
.el-upload-list__item-thumbnail {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item {
  margin-bottom: 2px;
}
.el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 5px 0;
  background-color: #f9fafc;
}
/* el-divider 修改高度&虚线效果 */
 .el-divider--horizontal{
     margin: 5px 0;
     background: 0 0;
     border-top: 1px dashed rgb(85, 84, 84);
 }
</style>
