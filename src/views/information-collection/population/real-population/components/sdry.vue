<template>
  <el-form ref="drugForm" :model="drugForm" :rules="rules" label-width="110px" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="吸毒人员" label-width="80px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="关注程度：" prop="gzcddm">
          <ZtDicSelect v-model="drugForm.gzcddm" code="DM01474" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="吸毒状态:" prop="xdztdm">
          <ZtDicSelect v-model="drugForm.xdztdm" code="LM99322" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="初次发现时间：" prop="ccfxsj">
          <el-date-picker
            v-model="drugForm.ccfxsj"
            size="small"
            type="datetime"
            placeholder="选择日期时间"
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="查获时间:" prop="chrq">
          <el-date-picker
            v-model="drugForm.chrq"
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
        <el-form-item label="管控情况：" prop="gkxzdm">
          <ZtDicSelect v-model="drugForm.gkxzdm" code="LM00037" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="吸毒原因:" prop="xdyydm">
          <ZtDicSelect v-model="drugForm.xdyydm" code="DM01051" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="毒品来源：" prop="dplydm">
          <ZtDicSelect v-model="drugForm.dplydm" code="DM00899" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="戒毒情况:" prop="jdqkdm">
          <ZtDicSelect v-model="drugForm.jdqkdm" code="LM99321" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="滥用毒品种类：" prop="lydpzldm">
          <ZtDicSelect v-model="drugForm.lydpzldm" code="DM00339" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否服美沙酮戒毒:" label-width="130px" prop="sffmstjd">
          <el-checkbox v-model="drugForm.sffmstjd" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="犯罪情况：" prop="fzqk">
          <el-input v-model="drugForm.fzqk" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="有无违法犯罪史:" prop="sfywffzsPdbz" label-width="130px">
          <el-checkbox v-model="drugForm.sfywffzsPdbz" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="附件上传：" prop="fjscdz">
          <el-input v-model="drugForm.fjscdz" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addDrugInfo, editDrugInfo, getDrugDetail } from '@/api/information-collection/population/special-population/drug-related-population'

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
      drugForm: {},
      rules: {}
    }
  },
  created() {
    this.getDrugDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getDrugDetail(id) {
      getDrugDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          if (res.data.data.sffmstjd === '1') {
            res.data.data.sffmstjd = true
          } else {
            res.data.data.sffmstjd = false
          }
          if (res.data.data.sfywffzsPdbz === '1') {
            res.data.data.sfywffzsPdbz = true
          } else {
            res.data.data.sfywffzsPdbz = false
          }
          this.drugForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.drugForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      this.$refs.drugForm.validate((valid) => {
        if (valid) {
          this.drugForm.xm = this.basicForm.xm
          this.drugForm.gmsfhm = this.basicForm.gmsfhm
          this.drugForm.xbdm = this.basicForm.xbdm
          this.drugForm.lxdh = this.basicForm.lxdh
          this.drugForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          this.drugForm.sffmstjd = this.drugForm.sffmstjd ? '1' : '0'
          this.drugForm.sfywffzsPdbz = this.drugForm.sfywffzsPdbz ? '1' : '0'
          console.log(this.drugForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存涉毒人员业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.drugForm)
              this.addDrugInfo(this.drugForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            this.$confirm('是否修改涉毒人员业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.drugForm)
              this.editDrugInfo(this.drugForm)
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
    addDrugInfo(params) {
      addDrugInfo(params).then(res => {
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
    editDrugInfo(params) {
      editDrugInfo(params).then(res => {
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
