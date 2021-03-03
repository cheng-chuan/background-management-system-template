<template>
  <el-form ref="zdqsnForm" :model="zdqsnForm" :rules="rules" label-width="150px" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="重点青少年" label-width="82px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="关注程度：" prop="gzcddm">
          <ZtDicSelect v-model="zdqsnForm.gzcddm" code="DM01474" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="管理手段：" prop="bfsddm">
          <ZtDicSelect v-model="zdqsnForm.bfsddm" code="LM00043" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="违法情况：" prop="wflxdm">
          <el-select v-model="zdqsnForm.wflxdm" placeholder="请选择" size="small" style="width:100%">
            <el-option label="无" value="1" />
            <el-option label="有" value="2" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="犯罪类型：" prop="fzlxdm">
          <ZtDicSelect v-model="zdqsnForm.fzlxdm" code="LM10100" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="学校所属层次：" prop="xxxscjdm">
          <ZtDicSelect v-model="zdqsnForm.xxxscjdm" code="DM01479" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="教育学校名称：" prop="jyxxmc">
          <el-input v-model="zdqsnForm.jyxxmc" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="人员类型：" prop="rylxdm">
          <ZtDicSelect v-model="zdqsnForm.rylxdm" code="LM00041" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="帮扶人姓名：" prop="bfrXm">
          <el-input v-model="zdqsnForm.bfrXm" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="帮扶人联系方式：" prop="bfrLxdh">
          <el-input v-model="zdqsnForm.bfrLxdh" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="家庭情况：" prop="jtqkdm">
          <ZtDicSelect v-model="zdqsnForm.jtqkdm" code="LM00042" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否违法犯罪：" prop="sfwffzPdbz">
          <el-checkbox v-model="zdqsnForm.sfwffzPdbz" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="监护人身份证号：" prop="jhrGmsfhm">
          <el-input v-model="zdqsnForm.jhrGmsfhm" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="监护人姓名：" prop="jhrXm">
          <el-input v-model="zdqsnForm.jhrXm" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="监护人联系方式：" prop="jhrLxdh">
          <el-input v-model="zdqsnForm.jhrLxdh" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="监护关系：" prop="yjhrgx">
          <ZtDicSelect v-model="zdqsnForm.yjhrgx" code="LM10039" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="监护人居住详址：" prop="jhrQhnxxdz">
          <el-input v-model="zdqsnForm.jhrQhnxxdz" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="附件上传：" prop="fjscdz">
          <el-input v-model="zdqsnForm.fjscdz" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addYoungInfo, editYoungInfo, getYoungDetail } from '@/api/information-collection/population/special-population/important-young'

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
      zdqsnForm: {},
      rules: {}
    }
  },
  created() {
    this.getYoungDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getYoungDetail(id) {
      getYoungDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          if (res.data.data.sfwffzPdbz === '1') {
            res.data.data.sfwffzPdbz = true
          } else {
            res.data.data.sfwffzPdbz = false
          }
          this.zdqsnForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.zdqsnForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      this.$refs.zdqsnForm.validate((valid) => {
        if (valid) {
          this.zdqsnForm.xm = this.basicForm.xm
          this.zdqsnForm.gmsfhm = this.basicForm.gmsfhm
          this.zdqsnForm.xbdm = this.basicForm.xbdm
          this.zdqsnForm.lxdh = this.basicForm.lxdh
          this.zdqsnForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          this.zdqsnForm.sfwffzPdbz = this.zdqsnForm ? '1' : '0'
          console.log(this.zdqsnForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存重点青少年业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.zdqsnForm)
              this.addYoungInfo(this.zdqsnForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            this.$confirm('是否修改重点青少年业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.zdqsnForm)
              this.editYoungInfo(this.zdqsnForm)
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
    addYoungInfo(params) {
      addYoungInfo(params).then(res => {
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
    editYoungInfo(params) {
      editYoungInfo(params).then(res => {
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
