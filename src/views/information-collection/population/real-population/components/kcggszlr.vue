<template>
  <el-form ref="kcggszlrForm" :model="kcggszlrForm" :rules="rules" label-width="120px" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="空巢孤寡失助老人" label-width="130px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="老人类别:" prop="lrlbdm" label-width="180px">
          <ZtDicSelect v-model="kcggszlrForm.lrlbdm" code="DM01458" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否独生子女家庭:" prop="sfdsznjtPdbz" label-width="180px">
          <ZtDicSelect v-model="kcggszlrForm.sfdsznjtPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
      <!-- <el-col :span="12">
            <el-form-item label="单位名称:" prop="dwmc">
              <el-input v-model="kcggszlrForm.dwmc" size="small" label-width="100px" />
            </el-form-item>
          </el-col> -->
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="离退休前单位_工作性质:" prop="ltxqdwGzxzdm" label-width="180px">
          <ZtDicSelect v-model="kcggszlrForm.ltxqdwGzxzdm" code="DM01476" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="离退休日期:" prop="tlxrqRq" label-width="180px">
          <el-date-picker
            v-model="kcggszlrForm.tlxrqRq"
            size="small"
            type="datetime"
            placeholder="选择日期时间"
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="离退休前单位_职务:" prop="ltxqdwSfhzw" label-width="180px">
          <el-input v-model="kcggszlrForm.ltxqdwSfhzw" size="small" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="退休工资_金额:" prop="txgzJe" label-width="180px">
          <el-input v-model="kcggszlrForm.txgzJe" size="small" label-width="100px" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="生活照料情况:" prop="shzlqk" label-width="180px">
          <ZtDicSelect v-model="kcggszlrForm.shzlqk" code="DM01492" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="健康状况:" prop="jkzkdm" label-width="180px">
          <ZtDicSelect v-model="kcggszlrForm.jkzkdm" code="DM00146" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="生活自理能力:" prop="shzlnldm" label-width="180px">
          <ZtDicSelect v-model="kcggszlrForm.shzlnldm" code="DM01500" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="居住状况:" prop="jzzkdm" label-width="180px">
          <ZtDicSelect v-model="kcggszlrForm.jzzkdm" code="DM01504" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addLNRInfo, editLNRInfo, getLNRDetail } from '@/api/information-collection/population/attention-population/lonely-old-man'

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
      kcggszlrForm: {},
      rules: {}
    }
  },
  created() {
    this.getLNRDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getLNRDetail(id) {
      getLNRDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          this.kcggszlrForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.kcggszlrForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      this.$refs.kcggszlrForm.validate((valid) => {
        if (valid) {
          this.kcggszlrForm.xm = this.basicForm.xm
          this.kcggszlrForm.gmsfhm = this.basicForm.gmsfhm
          this.kcggszlrForm.xbdm = this.basicForm.xbdm
          this.kcggszlrForm.lxdh = this.basicForm.lxdh
          this.kcggszlrForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          console.log(this.kcggszlrForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存空巢孤寡失助老人业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.kcggszlrForm)
              this.addLNRInfo(this.kcggszlrForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            this.$confirm('是否修改空巢孤寡失助老人业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.kcggszlrForm)
              this.editLNRInfo(this.kcggszlrForm)
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
    addLNRInfo(params) {
      addLNRInfo(params).then(res => {
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
    editLNRInfo(params) {
      editLNRInfo(params).then(res => {
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
