<template>
  <el-form ref="xmsfryForm" :model="xmsfryForm" :rules="rules" label-width="124px" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="刑满释放人员" label-width="100px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="关注程度：" prop="gzcddm">
          <ZtDicSelect v-model="xmsfryForm.gzcddm" code="DM01474" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="犯罪类型：" prop="fzlxdm">
          <ZtDicSelect v-model="xmsfryForm.fzlxdm" code="LM10100" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="原罪名：" prop="zm">
          <el-input v-model="xmsfryForm.zm" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="服刑(劳教)场所：" prop="fxcsDwmc">
          <el-input v-model="xmsfryForm.fxcsDwmc" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="原判刑期：" prop="ypxq">
          <el-input v-model="xmsfryForm.ypxq" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="本年度是否重犯：" prop="sfcxfzPdbz">
          <ZtDicSelect v-model="xmsfryForm.sfcxfzPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="出监所时间：" prop="sfrqRq">
          <el-date-picker
            v-model="xmsfryForm.sfrqRq"
            type="datetime"
            placeholder="选择日期"
            size="small"
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否脱管：" prop="jgzt">
          <ZtDicSelect v-model="xmsfryForm.jgzt" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="危险性评估：" prop="wxxpglxdm">
          <ZtDicSelect v-model="xmsfryForm.wxxpglxdm" code="LM00021" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否累犯：" prop="sflfPdbz">
          <ZtDicSelect v-model="xmsfryForm.sflfPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="帮教情况：" prop="bjqkXxqk">
          <ZtDicSelect v-model="xmsfryForm.bjqkXxqk" code="LM00036" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否已安置：" prop="azqkdm">
          <ZtDicSelect v-model="xmsfryForm.azqkdm" code="DM01462" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="衔接日期：" prop="xjrqRq">
          <el-date-picker
            v-model="xmsfryForm.xjrqRq"
            type="datetime"
            placeholder="请选择日期"
            size="small"
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="衔接情况：" prop="xjqkdm">
          <ZtDicSelect v-model="xmsfryForm.xjqkdm" code="LM00022" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="关注年限：" prop="gznx">
          <el-input v-model="xmsfryForm.gznx" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="犯罪行为：" prop="fzxw">
          <el-input v-model="xmsfryForm.fzxw" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="未安置原因：" prop="wazyyXxqk">
          <el-input v-model="xmsfryForm.wazyyXxqk" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="附件上传：" prop="fjxxXxzjbh">
          <el-input v-model="xmsfryForm.fjxxXxzjbh" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addXMSFInfo, editXMSFInfo, getXMSFDetail } from '@/api/information-collection/population/special-population/xmsf'

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
      xmsfryForm: {},
      rules: {}
    }
  },
  created() {
    this.getXMSFDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getXMSFDetail(id) {
      getXMSFDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          this.xmsfryForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.xmsfryForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      this.$refs.xmsfryForm.validate((valid) => {
        if (valid) {
          this.xmsfryForm.xm = this.basicForm.xm
          this.xmsfryForm.gmsfhm = this.basicForm.gmsfhm
          this.xmsfryForm.xbdm = this.basicForm.xbdm
          this.xmsfryForm.lxdh = this.basicForm.lxdh
          this.xmsfryForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          console.log(this.xmsfryForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存刑满释放业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.xmsfryForm)
              this.addXMSFInfo(this.xmsfryForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            this.$confirm('是否修改刑满释放业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.xmsfryForm)
              this.editXMSFInfo(this.xmsfryForm)
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
    addXMSFInfo(params) {
      addXMSFInfo(params).then(res => {
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
    editXMSFInfo(params) {
      editXMSFInfo(params).then(res => {
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
