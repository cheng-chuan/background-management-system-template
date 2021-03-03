<template>
  <el-form ref="sqjzryForm" :model="sqjzryForm" :rules="rules" label-width="150px" style="width:90%;background:#EEEEEE;margin:5px auto;padding:0 10px">
    <el-row :gutter="24">
      <el-col :span="18">
        <el-form-item label="社区矫正人员" label-width="100px" />
      </el-col>
      <el-col :span="6" style="padding-top:10px">
        <el-button type="normal" size="mini" @click="cancel">取消</el-button>
        <el-button type="primary" size="mini" @click="commitInfo">保存</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="社区服刑人员编号：" prop="xxzjbh">
          <el-input v-model="sqjzryForm.xxzjbh" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="接受方式:" prop="jsfsdm">
          <ZtDicSelect v-model="sqjzryForm.jsfsdm" code="LM00025" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="关注程度：" prop="gzcddm">
          <ZtDicSelect v-model="sqjzryForm.gzcddm" code="DM01474" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原羁押场所:" prop="yjycsDwmc">
          <el-input v-model="sqjzryForm.yjycsDwmc" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="犯罪类型：" prop="fzlxdm">
          <ZtDicSelect v-model="sqjzryForm.fzlxdm" code="LM10100" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="具体罪名：" prop="zm">
          <el-input v-model="sqjzryForm.zm" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="四史情况：" prop="ssqkdm">
          <ZtDicSelect v-model="sqjzryForm.ssqkdm" code="LM00026" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="三涉情况：" prop="sasqkdm">
          <ZtDicSelect v-model="sqjzryForm.sasqkdm" code="LM00027" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="是否累惯犯：" prop="sflgfPdbz">
          <ZtDicSelect v-model="sqjzryForm.sflgfPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="服刑类别：" prop="jzlbdm">
          <ZtDicSelect v-model="sqjzryForm.jzlbdm" code="LM00024" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原判刑期:" prop="ypxq">
          <el-input v-model="sqjzryForm.ypxq" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="原判刑期开始时间：" prop="ypxqKsrq">
          <el-date-picker
            v-model="sqjzryForm.ypxqKsrq"
            size="small"
            type="datetime"
            placeholder="选择日期时间"
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原判刑期结束时间:" prop="ypxqJsrq">
          <el-date-picker
            v-model="sqjzryForm.ypxqJsrq"
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
        <el-form-item label="服刑时间：" prop="jzKsrq">
          <el-date-picker
            v-model="sqjzryForm.jzKsrq"
            size="small"
            type="datetime"
            placeholder="选择日期时间"
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="至:" prop="jzJsrq">
          <el-date-picker
            v-model="sqjzryForm.jzJsrq"
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
        <el-form-item label="案件类别：" prop="ajlbdm">
          <ZtDicSelect v-model="sqjzryForm.ajlbdm" code="DM00001" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否建立矫正小组：" prop="sfjljzxzPdbz">
          <ZtDicSelect v-model="sqjzryForm.sfjljzxzPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="是否重新犯罪：" prop="sfzxfzPdbz">
          <ZtDicSelect v-model="sqjzryForm.sfzxfzPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="重犯罪名：" prop="zxfzZm">
          <el-input v-model="sqjzryForm.zxfzZm" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="是否有脱管：" prop="sfytgPdbz">
          <ZtDicSelect v-model="sqjzryForm.sfytgPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="是否有漏管：" prop="sfylgPdbz">
          <ZtDicSelect v-model="sqjzryForm.sfylgPdbz" code="DM01117" width="100%" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="脱管原因：" prop="tgjzqkXxqk">
          <el-input v-model="sqjzryForm.tgjzqkXxqk" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="漏管原因：" prop="lgyyXxqk">
          <el-input v-model="sqjzryForm.lgyyXxqk" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item label="近况描述：" prop="jkms">
          <el-input v-model="sqjzryForm.jkms" size="small" placeholder="" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="附件上传：" prop="fjxxXxzjbh">
          <el-input v-model="sqjzryForm.fjxxXxzjbh" size="small" placeholder="" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { addCommunityInfo, editCommunityInfo, getCommunityDetail } from '@/api/information-collection/population/special-population/community-correction'

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
      sqjzryForm: {},
      rules: {}
    }
  },
  created() {
    this.getCommunityDetail(this.basicForm.gmsfhm)
  },
  methods: {
    getCommunityDetail(id) {
      getCommunityDetail(id).then(res => {
        console.log(res)
        if (res.data.data) {
          this.sqjzryForm = res.data.data
          this.dialogConfig.dialogType = 'edit'
        } else {
          this.dialogConfig.dialogType = 'add'
        }
      })
    },
    cancel() {
      this.sqjzryForm = {}
      this.$emit('cancelForm')
    },
    commitInfo() {
      this.$refs.sqjzryForm.validate((valid) => {
        if (valid) {
          this.sqjzryForm.xm = this.basicForm.xm
          this.sqjzryForm.gmsfhm = this.basicForm.gmsfhm
          this.sqjzryForm.xbdm = this.basicForm.xbdm
          this.sqjzryForm.lxdh = this.basicForm.lxdh
          this.sqjzryForm.xxzjbh = this.basicForm.xxzjbh ? this.basicForm.xxzjbh : ''
          console.log(this.sqjzryForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存社区矫正业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.sqjzryForm)
              this.addCommunityInfo(this.sqjzryForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            this.$confirm('是否修改社区矫正业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.sqjzryForm)
              this.editCommunityInfo(this.sqjzryForm)
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
    addCommunityInfo(params) {
      addCommunityInfo(params).then(res => {
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
    editCommunityInfo(params) {
      editCommunityInfo(params).then(res => {
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
