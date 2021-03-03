<template>
  <el-dialog
    :title="dialogConfig.title"
    :visible.sync="dialogConfig.dialogVisible"
    width="60%"
    :close-on-click-modal="false"
    @open="open"
  >
    <div style="height:500px;overflow:auto;padding:0 15px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-upload
            class="avatar-uploader"
            action="#"
            style="bborder: 1px dashed #d9d9d9;border-radius: 6px"
            :http-request="upLoad"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt>
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-col>
        <el-col :span="18">
          <el-form ref="basicForm" :model="basicForm" label-width="100px">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="所属网格:">
                  <!-- <el-input v-model="basicForm.grid" size="small" disabled /> -->
                  <ZtGridLabel />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="学校名称:">
                  <el-input v-model="basicForm.xxmc" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学校类型">
                  <el-select v-model="basicForm.xxlx" placeholder="请选择" size="medium">
                    <el-option label="一级" value="1" />
                    <el-option label="二级" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="学校地址:" label-width="100px">
                  <el-input v-model="basicForm.xxdz" size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="9">
                <el-form-item label="学校性质：">
                  <el-select v-model="basicForm.xxxz" placeholder="请选择" size="medium">
                    <el-option label="一级" value="1" />
                    <el-option label="二级" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="关注程度：">
                  <el-select v-model="basicForm.gzcd" placeholder="请选择" size="medium">
                    <el-option label="一级" value="1" />
                    <el-option label="二级" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-divider />
      <el-form
        ref="schoolForm"
        :model="schoolForm"
        label-width="120px"
      >
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="校长姓名:" label-width="100px">
              <el-input v-model="schoolForm.xzxm" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="校长身份证号码:" label-width="120px">
              <el-input v-model="schoolForm.xzsfzhm" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="联系方式:" label-width="100px">
              <el-select v-model="schoolForm.lxfs" placeholder="手机" size="medium">
                <el-option label="手机" value="1" />
                <el-option label="座机" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-input v-model="schoolForm.lxhm" size="small" />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="9">
            <el-form-item label="治保人数:" label-width="100px">
              <el-input v-model="schoolForm.zbrs" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="主要负责人:" label-width="120px">
              <el-input v-model="schoolForm.zyfzr" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="主要负责人联系方式:" label-width="180px">
              <el-select v-model="schoolForm.zyfzrlxfs" placeholder="手机" size="medium">
                <el-option label="手机" value="1" />
                <el-option label="座机" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-input v-model="schoolForm.zyfzrlxhm" size="small" />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="分管治保负责人:" label-width="140px">
              <el-input v-model="schoolForm.fgzbfzr" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式:">
              <el-select v-model="schoolForm.fgzbfzrlxfs" placeholder="手机" size="medium">
                <el-option label="手机" value="1" />
                <el-option label="座机" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-input v-model="schoolForm.fgzbfzrlxhm" size="small" />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="在校学生人数:" label-width="120px">
              <el-input v-model="schoolForm.zxxsrs" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="在校教师人数:" label-width="120px">
              <el-input v-model="schoolForm.zxjsrs" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保安人数:" label-width="120px">
              <el-input v-model="schoolForm.bars" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="治安岗亭数量:" label-width="120px">
              <el-input v-model="schoolForm.zagtsl" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input v-model="schoolForm.bz" type="textarea" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer">
      <hr>
      <el-button
        type="primary"
        @click="lastCommittPopulationInfo"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  addRegisteredPopulation,
  editRegisteredPopulation,
  searchAllDropDownBox
} from '@/api/information-collection/population/real-population/registered-population'

export default {
  props: {
    dialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 表单
      basicForm: {
        grid: null
      },
      schoolForm: {
        importantPerson: [],
        careObj: []
      },
      //   所有下拉信息
      allList: {
        sexyList: [],
        nationList: [],
        politicalLandscapeList: [],
        cultureList: [],
        maritalStatusList: [],
        religiousBeliefsList: [],
        jobList: [],
        jobPlaceList: [],
        relationshipList: [],
        doorCategoryList: []
      },
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  watch: {
  },
  created() {
    // console.log(this.dialogConfig)
    this.getDropDownList('DM00039')
    this.getDropDownList('DM01058')
    this.getDropDownList('DM01106')
    this.getDropDownList('DM01083')
    this.getDropDownList('DM01053')
    this.getDropDownList('DM01102')
  },
  methods: {
    open() {
      console.log(this.dialogConfig)
      if (this.dialogConfig.dialogType === 'edit') {
        this.basicForm = this.dialogConfig.formData
      }
      console.log(this.basicForm)
    },
    // 获取下拉框
    getDropDownList(data) {
      const params = {}
      params.dictValue = data
      params.rowVersion = ''
      searchAllDropDownBox(params).then((res) => {
        // console.log(res)
        switch (data) {
          case 'DM00039':
            this.allList.nationList = res.data.datas
            break
          case 'DM01058':
            this.allList.sexyList = res.data.datas
            break
          case 'DM01106':
            this.allList.politicalLandscapeList = res.data.datas
            break
          case 'DM01083':
            this.allList.jobList = res.data.datas
            break
          case 'DM01053':
            this.allList.religiousBeliefsList = res.data.datas
            break
          case 'DM01102':
            this.allList.maritalStatusList = res.data.datas
            break
          default:
            break
        }
      })
    },
    // 提交数据
    commitPopulationInfo() {
      if (this.dialogConfig.dialogType === 'add') {
        // 新增
        console.log('add')
        if (this.currentStep === 1) {
          this.$confirm('是否保存基础信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              console.log(this.basicForm)
              console.log('提交基本信息')
              this.addPopulationInfo(this.basicForm)
            })
            .catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
        } else if (this.currentStep === 2) {
          console.log(this.stepTwoForm)
          console.log('提交住房信息')
        }
      } else if (this.dialogConfig.dialogType === 'edit') {
        // 编辑
        console.log('edit')
        if (this.currentStep === 1) {
          this.$confirm('是否修改基础信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              console.log(this.basicForm)
              console.log('修改基本信息')
              this.editPopulationInfo(this.basicForm)
            })
            .catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
        } else if (this.currentStep === 2) {
          console.log('修改住房信息')
        }
      }
    },
    // 最后一步提交数据
    lastCommittPopulationInfo() {
      if (this.dialogConfig.dialogType === 'add') {
        console.log('提交最后一次数据')
      } else if (this.dialogConfig.dialogType === 'edit') {
        console.log('修改最后一次数据')
      }
      this.cancelDialog()
    },
    // 新增操作
    addPopulationInfo(params) {
      addRegisteredPopulation(params)
        .then((res) => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.$message.success({
              message: '基础信息保存成功'
            })
          } else {
            this.$message.warning({
              message: '基本数据保存失败'
            })
          }
        })
        .catch(() => {
          this.$message.error({
            message: '服务请求失败'
          })
        })
    },
    // 编辑操作
    editPopulationInfo(params) {
      editRegisteredPopulation(params)
        .then((res) => {
          if (res.status === 200 && res.code === '000000') {
            this.$message.success({
              message: '基本数据编辑成功'
            })
          } else {
            this.$message.warning({
              message: '基本数据编辑失败'
            })
          }
        })
        .catch(() => {
          this.$message.error({
            message: '服务请求失败'
          })
        })
    },
    // 关闭弹窗
    cancelDialog() {
      this.dialogConfig.dialogVisible = false
      this.basicForm = {}
      this.schoolForm = {}
      this.$emit('updateList')
      this.currentStep = 0
      if (this.dialogConfig.row) {
        console.log(this.dialogConfig.row)
      }
    },
    // 步骤条
    preStep() {
      if (this.currentStep >= 0) {
        this.currentStep--
      } else {
        this.currentStep = 0
      }
    },
    nextStep() {
      if (this.currentStep <= this.maxStep) {
        this.currentStep++
        this.commitPopulationInfo()
      } else {
        this.currentStep = this.maxStep
      }
    },
    // 上传图片相关处理
    upLoad() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
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
.el-col {
  border-radius: 4px;
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
