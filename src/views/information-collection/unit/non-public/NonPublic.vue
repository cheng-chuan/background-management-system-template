<template>
  <zt-map ref="ztmap" @selectAddress="handleSelectAddress">
    <el-form ref="myform" v-loading="loading" size="mini" label-width="110px" :model="formData" :rules="formRules">
      <ZtLabel b s="15px">基本信息</ZtLabel>
      <hr>

      <el-row>
        <el-col :span="4">
          图片
        </el-col>

        <el-col :span="20">

          <el-form-item label="所属网格">
            <ZtGridLabel />
          </el-form-item>

          <el-form-item label="地址编码" prop="dwdzDzbm">
            <el-input v-model="formData.dwdzDzbm" disabled />
          </el-form-item>
          <el-form-item label="详细地址" prop="dwdzQhnxxdz">
            <el-input v-model="formData.dwdzQhnxxdz" disabled />
          </el-form-item>
          <el-form-item label="行政区划代码" prop="dwdzXzqhdm">
            <el-input v-model="formData.dwdzXzqhdm" disabled />
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item label="单位名称" prop="dwmc">
                <el-input v-model="formData.dwmc" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="社会信用代码" prop="tyxydm">
                <el-input v-model="formData.tyxydm" />
              </el-form-item>
            </el-col>
          </el-row>

        </el-col>
      </el-row>

      <br>
      <br>
      <ZtLabel b s="15px">单位信息</ZtLabel>
      <hr>

      <el-row>
        <el-col :span="8">
          <el-form-item label="单位简称" prop="dwjc">
            <el-input v-model="formData.dwjc" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位英文名称" prop="dwywmc">
            <el-input v-model="formData.dwywmc" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位英文缩写" prop="dwywsx">
            <el-input v-model="formData.dwywsx" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="单位类别" prop="qylbdm">
            <ZtDicSelect v-model="formData.qylbdm" code="DM00011" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位经济性质" prop="jjxzdm">
            <ZtDicSelect v-model="formData.jjxzdm" code="DM01513" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位经济类型" prop="jjlxdm">
            <ZtDicSelect v-model="formData.jjlxdm" code="DM00030" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="单位类型" prop="dwlbdm">
            <ZtDicSelect v-model="formData.dwlbdm" code="DM01509" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位联系电话" prop="dwLxdh">
            <el-input v-model="formData.dwLxdh" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位传真号码" prop="dwCzhm">
            <el-input v-model="formData.dwCzhm" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="单位邮箱" prop="dwDzyx">
            <el-input v-model="formData.dwDzyx" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位注册日期" prop="zcrq">
            <el-date-picker
              v-model="formData.zcrq"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择批准日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位发照日期" prop="fzsjRq">
            <el-date-picker
              v-model="formData.fzsjRq"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择批准日期"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="有效期" prop="validityDateRange">
            <el-date-picker
              v-model="validityDateRange"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              range-separator="至"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="面积" prop="mj">
            <el-input v-model="formData.mj">
              <template #append>
                ㎡
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="从业人数" prop="coyryRs">
            <el-input v-model="formData.coyryRs" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="所属行业" prop="hylbdm">
            <ZtDicSelect v-model="formData.hylbdm" code="DM01112" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主管部门名称" prop="zgbmmc">
            <el-input v-model="formData.zgbmmc" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织机构代码" prop="jgzzdm">
            <el-input v-model="formData.jgzzdm" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="经营范围" prop="jyfwzy">
        <el-input v-model="formData.jyfwzy" type="textarea" rows="3" />
      </el-form-item>
      <el-form-item label="简介" prop="jj">
        <el-input v-model="formData.jj" type="textarea" rows="3" />
      </el-form-item>
      <el-form-item label="荣誉" prop="ry">
        <el-input v-model="formData.ry" type="textarea" rows="3" />
      </el-form-item>
      <el-form-item label="备注" prop="bz">
        <el-input v-model="formData.bz" type="textarea" rows="3" />
      </el-form-item>

      <br>
      <br>
      <ZtLabel b s="15px">单位信息</ZtLabel>
      <hr>

      <el-row>
        <el-col :span="12">
          <el-form-item label="安全隐患类型" prop="aqyhlxdm">
            <ZtDicSelect v-model="formData.aqyhlxdm" code="DM01460" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关注程度" prop="gzcddm">
            <ZtDicSelect v-model="formData.gzcddm" code="DM01474" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <el-form-item prop="sfzddwPdbz">
            <el-checkbox v-model="formData.sfzddwPdbz" true-label="1" false-label="0">是否重点单位</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="sfgsqydm">
            <el-checkbox v-model="formData.sfgsqydm" true-label="1" false-label="0">是否规上企业</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="sfwhqyPdbz">
            <el-checkbox v-model="formData.sfwhqyPdbz" true-label="1" false-label="0">是否危化企业</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sfjbjlzgdzztjPdbz">
            <el-checkbox v-model="formData.sfjbjlzgdzztjPdbz" true-label="1" false-label="0">具备建立党组织条件</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item prop="sfyzgdzzPdbz">
            <el-checkbox v-model="formData.sfyzgdzzPdbz" true-label="1" false-label="0">有党组织</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0px" prop="dangyRs">
            <el-input v-model="formData.dangyRs" placeholder="党员数" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="40px" prop="sfyghPdbz">
            <el-checkbox v-model="formData.sfyghPdbz" true-label="1" false-label="0">有工会</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0px" prop="ghryRs">
            <el-input v-model="formData.ghryRs" placeholder="工会会员数" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item prop="sfygqdzzPdbz">
            <el-checkbox v-model="formData.sfygqdzzPdbz" true-label="1" false-label="0">有团组织</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0px" prop="gqttyRs">
            <el-input v-model="formData.gqttyRs" placeholder="团员数量" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="40px" prop="sfyflzzPdbz">
            <el-checkbox v-model="formData.sfyflzzPdbz" true-label="1" false-label="0">有妇联</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0px" prop="fnryRs">
            <el-input v-model="formData.fnryRs" placeholder="妇联成员数" />
          </el-form-item>
        </el-col>
      </el-row>

      <br>
      <ZtLabel b s="15px">人员信息</ZtLabel>
      <hr>

      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="董事长姓名" prop="dszXm">
            <el-input v-model="formData.dszXm" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" label-width="90px" prop="dszLxdh">
            <el-input v-model="formData.dszLxdh" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号" label-width="90px" prop="dszGmsfhm">
            <el-input v-model="formData.dszGmsfhm" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="总经理姓名" prop="zjlXm">
            <el-input v-model="formData.zjlXm" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" label-width="90px" prop="zjlLxdh">
            <el-input v-model="formData.zjlLxdh" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号" label-width="90px" prop="zjlGmsfhm">
            <el-input v-model="formData.zjlGmsfhm" />
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="保卫负责人姓名" prop="bwfzrXm">
            <el-input v-model="formData.bwfzrXm" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" label-width="90px" prop="bwfzrLxdh">
            <el-input v-model="formData.bwfzrLxdh" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号" label-width="90px" prop="bwfzrGmsfhm">
            <el-input v-model="formData.bwfzrGmsfhm" />
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="法人姓名" prop="fddbrXm">
            <el-input v-model="formData.fddbrXm" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="fddbrlxdh">
            <el-input v-model="formData.fddbrlxdh" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="证件类型" prop="fddbrCyzjdm">
            <ZtDicSelect v-model="formData.fddbrCyzjdm" code="DM01096" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码" prop="fddbrZjhm">
            <el-input v-model="formData.fddbrZjhm" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </zt-map>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { getDetail, updateItem, addItem } from '@/api/information-collection/unit/non-public.js'
import dataModel from './model.js'

const model = {
  ...cloneDeep(dataModel)
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
  computed: {
    validityDateRange: {
      get() {
        return [this.formData.yxqksrq, this.formData.yxqjsrq].filter(item => !!item)
      },
      set(val) {
        if (val && val.length > 0) {
          if (val[0]) this.formData.yxqksrq = val[0] || null
          if (val[1]) this.formData.yxqjsrq = val[1] || null
        }
      }
    }
  },
  created() {
    this.initFormData()
  },
  methods: {
    handleSelectAddress({ address, addressId, addressCode }) {
      this.formData.dwdzDzbm = addressId
      this.formData.dwdzQhnxxdz = address
      this.formData.dwdzXzqhdm = addressCode
    },
    // 提交表单
    submitForm() {
      this.validate((valid, data) => {
        if (valid) {
          const sdata = cloneDeep(data)
          const dataPatch = {
            // 地址编码 临时
            dzbm: '1'
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
          this.$refs.ztmap.searchAddressAndLocate(this.formData.dwdzQhnxxdz)
          this.loading = false
        })
      }
    }
  }
}
</script>

<style>

</style>
