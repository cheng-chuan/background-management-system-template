<template>
  <el-form ref="zdsfryForm" :model="zdsfryForm" :rules="rules" label-width="124px" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="23">
      <el-col :span="18">
        <el-form-item label="重点上访人员" label-width="100px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10" :offset="2">
        <el-form-item label="关注程度：" prop="gzcddm">
          <ZtDicSelect v-model="zdsfryForm.gzcddm" code="DM01474" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="0">
        <el-form-item label="上访状态:" label-width="120px" prop="sfztdm">
          <ZtDicSelect v-model="zdsfryForm.sfztdm" code="LM99327" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10" :offset="2">
        <el-form-item label="事发地：" prop="sfd">
          <el-input v-model="zdsfryForm.sfd" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="0">
        <el-form-item label="上访类型：" prop="sflxdm">
          <!-- <el-select v-model="zdsfryForm.sflxdm" size="small" placeholder="请选择">
            <el-option label="进京非正常上访" value="1" />
            <el-option label="设法涉诉上访" value="2" />
            <el-option label="进省访" value="3" />
            <el-option label="集体访" value="4" />
            <el-option label="越级访" value="5" />
            <el-option label="重复访" value="6" />
            <el-option label="进京集体访" value="7" />
            <el-option label="进京重复访" value="8" />
          </el-select> -->
          <ZtDicSelect v-model="zdsfryForm.sflxdm" code="DM98561" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="10" :offset="2">
        <el-form-item label="上访原因：" prop="sfyyYy">
          <el-input v-model="zdsfryForm.sfyyYy" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10" :offset="2">
        <el-form-item label="附件上传：" prop="fjscdz">
          <el-input v-model="zdsfryForm.fjscdz" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addVisitInfo, editVisitInfo, getVisitDetail } from '@/api/information-collection/population/special-population/important-visit'

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
      zdsfryForm: {},
      rules: {}
    }
  },
  created() {
    this.getVisitDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getVisitDetail(id) {
      getVisitDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          this.zdsfryForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.zdsfryForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      this.$refs.zdsfryForm.validate((valid) => {
        if (valid) {
          this.zdsfryForm.xm = this.basicForm.xm
          this.zdsfryForm.gmsfhm = this.basicForm.gmsfhm
          this.zdsfryForm.xbdm = this.basicForm.xbdm
          this.zdsfryForm.lxdh = this.basicForm.lxdh
          this.zdsfryForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          console.log(this.zdsfryForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存残疾人口业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.zdsfryForm)
              this.addVisitInfo(this.zdsfryForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            this.$confirm('是否修改残疾人口业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.zdsfryForm)
              this.editVisitInfo(this.zdsfryForm)
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
    addVisitInfo(params) {
      addVisitInfo(params).then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.$emit('confirmImportPopulation')
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
    editVisitInfo(params) {
      editVisitInfo(params).then(res => {
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
