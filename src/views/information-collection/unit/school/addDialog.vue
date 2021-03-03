<template>
  <el-dialog
    :title="dialogConfig.title"
    :visible.sync="dialogConfig.dialogVisible"
    :close-on-click-modal="false"
    width="width"
    :before-close="dialogBeforeClose"
    @open="openDialog"
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
            <div class="el-upload__text">点击上传图片</div>
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
          <el-dialog :visible.sync="img_dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-col>
        <el-col :span="18">
          <el-form ref="formData" :model="formData" label-width="100px">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="所属网格:">
                  <!-- <el-input v-model="formData.grid" size="small" disabled /> -->
                  <ZtGridLabel />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="学校名称:">
                  <el-input v-model="formData.xuxDwmc" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学校类型:">
                  <ZtDicSelect v-model="formData.xxlxdm" code="DM01479" width="100%" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="学校地址:" label-width="100px">
                  <el-input v-model="formData.xuxQhnxxdz" size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="学校性质：">
                  <ZtDicSelect v-model="formData.xxxzdm" code="DM01650" width="100%" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="关注程度：">
                  <ZtDicSelect v-model="formData.gzcddm" code="DM01474" width="100%" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-divider />
      <el-form
        ref="formData"
        :model="formData"
        label-width="120px"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="校长姓名:" label-width="100px">
              <el-input v-model="formData.xzXm" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="校长身份证号码:" label-width="120px">
              <el-input v-model="formData.xzGmsfhm" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="联系方式:" label-width="100px">
              <el-input v-model="formData.xzLxdh" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="治保人数:" label-width="100px">
              <el-input v-model="formData.zbrs" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主要负责人:" label-width="120px">
              <el-input v-model="formData.zafzrXm" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="主要负责人联系方式:" label-width="170px">
              <el-input v-model="formData.zafzrLxdh" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="分管治保负责人:" label-width="140px">
              <el-input v-model="formData.fgabzrrXm" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式:">
              <el-input v-model="formData.fgabzrrLxdh" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="在校学生人数:" label-width="120px">
              <el-input v-model="formData.zxxsRs" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="在校教师人数:" label-width="120px">
              <el-input v-model="formData.zxjsrs" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保安人数:" label-width="120px">
              <el-input v-model="formData.aqRs" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="治安岗亭数量:" label-width="120px">
              <el-input v-model="formData.zagtsl" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input v-model="formData.bz" type="textarea" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="commitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addInfo, editInfo } from '@/api/information-collection/unit/school'

export default {
  props: {
    dialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogImageUrl: null,
      img_dialogVisible: null,
      formData: {}
    }
  },
  methods: {
    openDialog() {
      // console.log(this.dialogConfig)
      this.formData = this.dialogConfig.row ? this.dialogConfig.row : {}
    },
    dialogBeforeClose() {
      this.cancel()
    },
    cancel() {
      this.dialogConfig.dialogVisible = false
      this.dialogConfig.row = {}
      this.formData = {}
    },
    commitInfo() {
      if (this.dialogConfig.dialogType === 'add') {
        console.log('add')
        addInfo(this.formData).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.cancel()
            this.$emit('updateList')
            this.$message.success({
              message: '新增成功'
            })
          } else {
            this.$message.error({
              message: '新增失败'
            })
          }
        }).catch(() => {
          this.$message.error({
            message: '服务请求失败'
          })
        })
      } else if (this.dialogConfig.dialogType === 'edit') {
        console.log('edit')
        editInfo(this.formData).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.cancel()
            this.$emit('updateList')
            this.$message.success({
              message: '编辑成功'
            })
          } else {
            this.$message.error({
              message: '编辑失败'
            })
          }
        }).catch(() => {
          this.$message.error({
            message: '服务请求失败'
          })
        })
      }
    },

    // 图片上传
    upLoad() {},
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    handlePictureCardPreview() {},
    handleDownload() {},
    handleRemove() {}

  }

}
</script>

<style scoped lang='scss'>
  .el-upload__text{
    position:absolute;
    bottom:25%;
    left:50%;
    transform:translateX(-50%);
    color:#A1A7AF;
    font-size:14px
  }
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
     border-top: 1px dashed rgba(85, 84, 84,0);
 }
</style>
