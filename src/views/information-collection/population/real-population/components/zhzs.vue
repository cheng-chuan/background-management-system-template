<template>
  <el-form ref="yzszhForm" :model="yzszhForm" label-width="124px" :rules="rules" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="易肇事肇祸严重精神障碍患者" label-width="200px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="危险程度：" prop="mqwxxpgdjdm">
          <ZtDicSelect v-model="yzszhForm.mqwxxpgdjdm" code="LM00060" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="患病名称：" prop="hbmc">
          <el-input v-model="yzszhForm.hbmc" size="small" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="初次发病日期：" prop="ccfbrqRq">
          <el-date-picker
            v-model="yzszhForm.ccfbrqRq"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
            style="width:100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="有无肇事肇祸史：" prop="ywzszhsPdbz">
          <ZtDicSelect v-model="yzszhForm.ywzszhsPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="家庭经济状况：" prop="jtjjzkdm">
          <ZtDicSelect v-model="yzszhForm.jtjjzkdm" code="DM01493" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否纳入低保：" prop="sfnrdbPdbz">
          <ZtDicSelect v-model="yzszhForm.sfnrdbPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="是否接受过治疗：" prop="sfjsgzl">
          <ZtDicSelect v-model="yzszhForm.sfjsgzl" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="康复机构：" prop="jskfxljgDwmc">
          <el-input v-model="yzszhForm.jskfxljgDwmc" size="small" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="监护人姓名：" prop="jhrXm">
          <el-input v-model="yzszhForm.jhrXm" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="监护人联系方式：" prop="jhrLxhm">
          <el-input v-model="yzszhForm.jhrLxhm" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="治疗医院：" prop="zlyyDwmc">
          <el-input v-model="yzszhForm.zlyyDwmc" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="诊断类型：" prop="zdlxdm">
          <ZtDicSelect v-model="yzszhForm.zdlxdm" code="DM01496" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="治疗情况：" prop="zlqkdm">
          <ZtDicSelect v-model="yzszhForm.zlqkdm" code="LM00033" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="附件上传：" prop="fjxxXxzjbh">
          <el-input v-model="yzszhForm.fjxxXxzjbh" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addYZHZSInfo, editYZHZSInfo, getYZHZSDetail } from '@/api/information-collection/population/special-population/zszhjsbrxxb'

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
      yzszhForm: {},
      rules: {}
    }
  },
  created() {
    this.getYZHZSDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getYZHZSDetail(id) {
      getYZHZSDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          this.yzszhForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.yzszhForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      this.$refs.yzszhForm.validate((valid) => {
        if (valid) {
          this.yzszhForm.xm = this.basicForm.xm
          this.yzszhForm.gmsfhm = this.basicForm.gmsfhm
          this.yzszhForm.xbdm = this.basicForm.xbdm
          this.yzszhForm.lxdh = this.basicForm.lxdh
          this.yzszhForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          console.log(this.yzszhForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存残疾人口业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.yzszhForm)
              this.addYZHZSInfo(this.yzszhForm)
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
              console.log(this.yzszhForm)
              this.editYZHZSInfo(this.yzszhForm)
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
    addYZHZSInfo(params) {
      addYZHZSInfo(params).then(res => {
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
    editYZHZSInfo(params) {
      editYZHZSInfo(params).then(res => {
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
