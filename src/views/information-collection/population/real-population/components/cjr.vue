<template>
  <el-form ref="cjrForm" :model="cjrForm" :rules="rules" label-width="120px" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="残疾人" label-width="80px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="关注程度：" prop="gzcd">
          <ZtDicSelect v-model="cjrForm.gzcd" code="DM01474" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="残疾原因:" prop="cjyy">
          <el-input v-model="cjrForm.cjyy" size="small" label-width="100px" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="残疾时间:" prop="cjsj">
          <el-date-picker
            v-model="cjrForm.cjsj"
            size="small"
            type="datetime"
            placeholder="选择日期时间"
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="残疾类别:" prop="cjlbdm">
          <el-select v-model="cjrForm.cjlbdm" placeholder="请选择" size="medium" label-width="100px">
            <el-option label="一级" value="1" />
            <el-option label="二级" value="2" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="残疾等级:" label-position="right" prop="cjdjdm">
          <el-select v-model="cjrForm.cjdjdm" placeholder="请选择" size="medium">
            <el-option label="一级" value="1" />
            <el-option label="二级" value="2" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否有残疾证:" prop="sfycjz">
          <el-select v-model="cjrForm.sfycjz" placeholder="请选择" size="medium">
            <el-option label="有" value="1" />
            <el-option label="无" value="2" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="残疾证号:" label-position="right" prop="cjzZjhm">
          <el-input v-model="cjrForm.cjzZjhm" size="small" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="技能特长:" prop="jntcdm">
          <ZtDicSelect v-model="cjrForm.jntcdm" code="DM01451" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="劳动能力:" label-position="right" prop="ldnldm">
          <ZtDicSelect v-model="cjrForm.ldnldm" code="DM94701" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="监护人:" prop="jhrXm">
          <el-input v-model="cjrForm.jhrXm" size="small" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addCJRInfo, editCJRInfo, getCJRDetail } from '@/api/information-collection/population/attention-population/deformed-man'

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
      cjrForm: {},
      rules: {}
    }
  },
  created() {
    this.getCJRDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getCJRDetail(id) {
      getCJRDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          this.cjrForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.cjrForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      console.log(this.dialogConfig.dialogType)
      this.$refs.cjrForm.validate((valid) => {
        if (valid) {
          this.cjrForm.xm = this.basicForm.xm
          this.cjrForm.gmsfhm = this.basicForm.gmsfhm
          this.cjrForm.xbdm = this.basicForm.xbdm
          this.cjrForm.sqrLxdh = this.basicForm.lxdh
          this.cjrForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          console.log(this.cjrForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存残疾人口业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.cjrForm)
              this.addCJRInfo(this.cjrForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            // console.log(this.basicForm)
            this.$confirm('是否修改残疾人口业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.cjrForm)
              this.editCJRInfo(this.cjrForm)
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
    addCJRInfo(params) {
      addCJRInfo(params).then(res => {
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
    editCJRInfo(params) {
      editCJRInfo(params).then(res => {
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
