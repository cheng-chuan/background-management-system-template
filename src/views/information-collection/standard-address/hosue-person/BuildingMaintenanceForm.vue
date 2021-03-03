<template>
  <el-form ref="myform" v-loading="loading" size="mini" label-width="110px" :model="formData" :rules="formRules">

    <el-row>
      <el-col :span="12">
        <el-form-item label="房屋结构" prop="xcdxlxdm">
          <ZtDicSelect v-model="formData.xcdxlxdm" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="建成年份" prop="jcqklbdm">
          <el-input v-model="formData.lxdh" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="楼栋长" prop="xcdxlxdm">
          <el-input v-model="formData.lxdh" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="楼栋长身份证" prop="jcqklbdm">
          <el-input v-model="formData.lxdh" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="楼栋长电话" prop="xcdxlxdm">
          <el-input v-model="formData.lxdh" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="物管名称" prop="jcqklbdm">
          <el-input v-model="formData.lxdh" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="经度" prop="xcdxlxdm">
          <el-input v-model="formData.lxdh" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="纬度" prop="jcqklbdm">
          <el-input v-model="formData.lxdh">
            <el-button slot="append" icon="el-icon-search" @click="$message.info('绑定地图')">绑定地图</el-button>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { getDetail, updateItem, addItem } from '@/api/safety-and-stability/fire-safety/fire-safety-inspection.js'

const model = {
  // 检查对象
  // 对象名称
  xcdxDxmc: null,
  // 对象类型
  xcdxlxdm: null,
  // 检查情况类别
  jcqklbdm: null,
  // 联系电话
  lxdh: null,
  // 场所名称
  shcsmc: null,
  // 公共场所类别
  ggcslbdm: null,
  // 负责人
  // 负责人姓名
  fzrXm: null,
  // 负责人手机号
  fzrSjhm: null,
  // 负责人身份证
  fzrGmsfhm: null,
  // 巡查信息、
  // 警示级别
  jsjb: null,
  // 挂牌级别
  gbjb: null,
  // 关注程度
  gzcddm: null,
  // 是否存在隐患
  sfczyhPdbz: null,
  // 整改详细情况
  zgyhXxqk: null,
  // 隐患类别
  yhlbdm: null,
  // 隐患内容
  yhnrXxqk: null,
  // 是否短信通知
  sfdxtzPdbz: null,
  // 短信内容
  dxnrXxqk: null,
  // 处理结果
  cljgdm: null,
  // 培训人数
  pxryRs: null,
  // 宣发资料册数
  ffxczlSl: null,
  // 消防演习参与人数
  xfyxcyyRs: null
}

export default {
  props: {
    dataId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      // 表单字段
      formData: { ...model },
      formRules: {
        xm: [{ required: true, message: '请输入姓名', trigger: 'bulr' }],
        dzbm: [{ required: true, message: '请选择地址', trigger: 'blur' }]
      },
      // 表单加载
      loading: false,
      adcodeLoading: false
    }
  },
  created() {
    this.initFormData()
  },
  methods: {
    // 提交表单
    submitForm() {
      this.validate((valid, data) => {
        if (valid) {
          const sdata = cloneDeep(data)
          const dataPatch = {
            dzbm: '1', // 地址编码 临时
            chzrGmsfhm: sdata.chzrZjhm,
            czurGmsfhm: sdata.czurZjhm
          }
          if (this.dataId) {
            updateItem(Object.assign(dataPatch, sdata)).then(res => {
              this.$message.success('更新成功！')
              this.$emit('submitSuccess')
            })
          } else {
            addItem(Object.assign(dataPatch, sdata)).then(res => {
              this.$message.success('添加成功！')
              this.$emit('submitSuccess')
            })
          }
        } else {
          this.$message.warning('表单校验失败，请检查表单是否正确填写！')
        }
      })
    },
    // 校验表单并返回值
    validate(valiFunc) {
      this.$refs['myform'].validate((valid) => {
        if (valid) {
          valiFunc(true, this.formData)
        } else {
          valiFunc(false, this.formData)
        }
      })
    },
    // 加载数据
    initFormData() {
      if (this.dataId) {
        // 接口加载
        this.loading = true
        getDetail(this.dataId).then(res => {
          Object.assign(this.formData, res.data.data)
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-input__inner[disabled=disabled] {
  color: #606266;
}
</style>
