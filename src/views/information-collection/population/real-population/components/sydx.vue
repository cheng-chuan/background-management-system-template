<template>
  <el-form ref="sydxForm" :model="sydxForm" :rules="rules" label-width="120px" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="双拥人口" label-width="90px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="关注程度:" prop="gzcddm">
          <ZtDicSelect v-model="sydxForm.gzcddm" code="DM01474" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="单位名称:" prop="dwmc">
          <el-input v-model="sydxForm.dwmc" size="small" label-width="100px" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="人员类型:" prop="rylbdm">
          <ZtDicSelect v-model="sydxForm.rylbdm" code="DM00316" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form-item label="个人简介:" prop="grjlXxqk">
          <el-input
            v-model="sydxForm.grjlXxqk"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form-item label="备注:" prop="bz">
          <el-input
            v-model="sydxForm.bz"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addSYDXInfo, editSYDXInfo, getSYDXDetail } from '@/api/information-collection/population/attention-population/double-support'

export default {
  props: {
    dialogConfig: {
      type: Object,
      required: true
    },
    basicForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sydxForm: {},
      rules: {}
    }
  },
  created() {
    this.getSYDXDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getSYDXDetail(id) {
      getSYDXDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          this.sydxForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.sydxForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      this.$refs.sydxForm.validate((valid) => {
        if (valid) {
          this.sydxForm.xm = this.basicForm.xm
          this.sydxForm.gmsfhm = this.basicForm.gmsfhm
          this.sydxForm.xbdm = this.basicForm.xbdm
          this.sydxForm.lxdh = this.basicForm.lxdh
          this.sydxForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          console.log(this.sydxForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存双拥对象业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.sydxForm)
              this.addSYDXInfo(this.sydxForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            this.$confirm('是否修改双拥对象业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.sydxForm)
              this.editSYDXInfo(this.sydxForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消修改'
              })
            })
          }
        } else {
          this.$message.warning({
            message: '注意必填选项'
          })
          return false
        }
      })
    },
    // 新增业务信息操作
    addSYDXInfo(params) {
      addSYDXInfo(params).then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.$emit('confirmCareObject')
          this.cancel()
          this.$message.success({
            message: '业务信息保存成功'
          })
        } else {
          this.$message.warning({
            message: '业务信息保存失败'
          })
        }
      }).catch(() => {
        this.$message.error({
          message: '服务请求失败'
        })
      })
    },
    // 编辑业务信息操作
    editSYDXInfo(params) {
      editSYDXInfo(params).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.cancel()
          this.$message.success({
            message: '业务数据编辑成功'
          })
        } else {
          this.$message.warning({
            message: '业务数据编辑失败'
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
</script>

<style>

</style>
