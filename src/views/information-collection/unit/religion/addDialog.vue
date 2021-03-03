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
          <el-form ref="addForm" :model="formData" label-width="120px">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="所属网格:">
                  <!-- <el-input v-model="formData.grid" size="small" disabled /> -->
                  <ZtGridLabel />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="宗教堂点名称:">
                  <el-input v-model="formData.zjtdMc" size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="宗教信仰:">
                  <ZtDicSelect v-model="formData.zjxydm" code="DM01053" width="100%" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="地址选择" class="no100">
                  <ZtDicSelect
                    v-model="assistFormData.level1"
                    label-key="mlxz"
                    value-key="mlxz"
                    :custom-options="levelOptions.level1"
                    placeholder="门楼详址"
                  />
                  <ZtNbsp />
                  <ZtDicSelect
                    v-model="assistFormData.level2"
                    label-key="dzmc"
                    value-key="dzmc"
                    :custom-options="levelOptions.level2"
                    :disabled="!assistFormData.level1"
                    placeholder="楼栋号"
                  />
                  <ZtNbsp />
                  <ZtDicSelect
                    v-model="assistFormData.level3"
                    label-key="mlph"
                    value-key="mlph"
                    :custom-options="levelOptions.level3"
                    :disabled="!assistFormData.level2"
                    placeholder="门楼牌号"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="房屋地址" prop="assistHouseAddress">
              <el-input v-model="assistHouseAddress" disabled />
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="地址编码" prop="dzbm">
                  <el-input v-model="formData.dzbm" v-loading="adcodeLoading" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="负责人身份证号:">
                  <el-input v-model="formData.fzrGmsfhm" size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人姓名:">
                  <el-input v-model="formData.fzrXm" size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-form-item label="联系方式:">
                  <el-select v-model="lxfs" placeholder="手机" size="small">
                    <el-option label="手机" value="1" />
                    <el-option label="座机" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="" label-width="0">
                  <el-input v-model="formData.fzrLxdh" size="small" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-divider />
    </div>
    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="commitInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addInfo, editInfo, searchAddressCode, searchAddress } from '@/api/information-collection/unit/religion'

export default {
  props: {
    dialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 辅助表单
      assistFormData: {
        level1: null,
        level2: null,
        level3: null
      },
      levelOptions: {
        level1: [],
        level2: [],
        level3: []
      },
      lxfs: null,
      dialogImageUrl: null,
      img_dialogVisible: null,
      adcodeLoading: false,
      formData: {}
    }
  },
  computed: {
    assistHouseAddress() {
      return [this.assistFormData.level1, this.assistFormData.level2, this.assistFormData.level3].filter(item => !!item).join('')
    }
  },
  watch: {
    'assistFormData.level1'(val) {
      this.assistFormData.level2 = null
      if (!val) {
        this.levelOptions.level2 = []
      } else {
        this.loadLevelAddress('2', val, '')
      }
    },
    'assistFormData.level2'(val) {
      this.assistFormData.level3 = null
      if (!val) {
        this.levelOptions.level3 = []
      } else {
        this.loadLevelAddress('3', this.assistFormData.level2, val)
      }
    },
    assistHouseAddress(val) {
      if (val) this.searchAddressCode(val)
    }
  },
  created() {
    this.loadLevelAddress('1', '', '')
  },
  methods: {
    // 地址编码
    searchAddressCode(addr) {
      this.adcodeLoading = true
      searchAddressCode(addr).then(res => {
        this.formData.dzbm = this.fchain(res, 'data.data')
        this.adcodeLoading = false
      })
    },
    // 加载地址选择
    loadLevelAddress(level, mlxz, dzmc) {
      const params = { mlxz, dzmc, typeStr: level }
      searchAddress(params).then(res => {
        this.levelOptions[`level${level}`] = res.data.data || []
      })
    },
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
      this.formData.qhnxxdz = this.assistHouseAddress
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
