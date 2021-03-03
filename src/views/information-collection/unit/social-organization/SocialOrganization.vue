<template>
  <zt-map ref="ztmap" @selectAddress="handleSelectAddress">
    <el-form ref="myform" v-loading="loading" size="mini" label-width="100px" :model="formData" :rules="formRules">

      <ZtLabel b s="15px">基本信息</ZtLabel>
      <hr>

      <el-row>
        <el-col :span="4">
          <ZtImgSelect />
        </el-col>

        <el-col :span="20">

          <el-form-item label="所属网格">
            <ZtGridLabel />
          </el-form-item>

          <el-form-item label="组织名称" prop="dwmc">
            <el-input v-model="formData.dwmc" />
          </el-form-item>

          <el-row>
            <el-col :span="10">
              <el-form-item label="组织类别" prop="shzzlxdm">
                <ZtDicSelect v-model="formData.shzzlxdm" code="DM01563" />
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="统一社会信用代码" label-width="140px" prop="tyxydm">
                <el-input v-model="formData.tyxydm" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="法定代表人" prop="fddbrXm">
                <el-input v-model="formData.fddbrXm" />
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="法定代表人证件" label-width="140px" prop="fddbrZjhm" class="no100">
                <el-input v-model="formData.fddbrZjhm">
                  <ZtDicSelect slot="prepend" v-model="formData.fddbrCyzjdm" width="120px" code="DM01096" />
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="业务主管单位" prop="ywzgdw">
                <el-input v-model="formData.ywzgdw" />
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="关注程度" label-width="140px" prop="gzcddm">
                <ZtDicSelect v-model="formData.gzcddm" code="DM01474" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="办公地址" prop="zzdzQhnxxdz">
            <el-input v-model="formData.zzdzQhnxxdz" />
          </el-form-item>

          <el-form-item label="资金来源" prop="zjlyJyqk">
            <el-input v-model="formData.zjlyJyqk" />
          </el-form-item>
          <el-row>
            <el-col :span="18">
              <el-form-item label="联系方式" prop="frlxdh">
                <el-input v-model="formData.frlxdh" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="20px" prop="sfyjwbjPdbz">
                <el-checkbox v-model="formData.sfyjwbjPdbz" true-label="1" false-label="0">有境外背景</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

        </el-col>
      </el-row>

      <br>
      <br>
      <ZtLabel b s="15px">其他信息</ZtLabel>
      <hr>

      <el-row>
        <el-col :span="12">
          <el-form-item label="成立日期" prop="clrqRq">
            <el-date-picker
              v-model="formData.clrqRq"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择成立日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="140px" label="登记证号" prop="djzh">
            <el-input v-model="formData.djzh" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="批准日期" prop="pzrqRq">
            <el-date-picker
              v-model="formData.pzrqRq"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择批准日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="140px" label="登记管理机关代码" prop="djgljgdm">
            <el-input v-model="formData.djgljgdm" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="成员数" prop="成员数">
            <el-input v-model="formData.cys" placeholder="成员数" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
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

      <el-form-item label="业务范围" prop="业务范围">
        <el-input v-model="formData.ywfw" />
      </el-form-item>

      <el-form-item label="备注" prop="bz">
        <el-input v-model="formData.bz" />
      </el-form-item>

      <br>
      <br>
      <ZtLabel b s="15px">保卫负责人</ZtLabel>
      <hr>

      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="bwfzrXm">
            <el-input v-model="formData.bwfzrXm" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="bwfzrGmsfhm">
            <el-input v-model="formData.bwfzrGmsfhm" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="bwfzrLxdh">
            <el-input v-model="formData.bwfzrLxdh" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </zt-map>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { getDetail, updateItem, addItem } from '@/api/information-collection/unit/social-organization.js'

const model = {
  // 单位名称 组织名称
  dwmc: null,
  // 组织类别
  shzzlxdm: null,
  // 统一社会信用代码
  tyxydm: null,
  // 地址编码
  zzdzDzbm: null,
  // 区划内详细地址
  zzdzQhnxxdz: null,
  // 地址行政区划代码
  zzdzXzqhdm: null,
  // 法人代表姓名
  fddbrXm: null,
  // 法人代表证件类别
  fddbrCyzjdm: null,
  // 法人代身份证号
  fddbrGmsfhm: null,
  // 法人代表证件号码
  fddbrZjhm: null,
  // 资金来源
  zjlyJyqk: null,
  // 业务主管单位
  ywzgdw: null,
  // 关注程度
  gzcddm: null,
  // 联系方式类别
  frlxdh: null,
  // 联系方式
  // 联系方式内容: null,
  // 是否有境外背景
  sfyjwbjPdbz: null,

  // 成立日期
  clrqRq: null,
  // 登记证号
  djzh: null,
  // 登记管理机关代码
  djgljgdm: null,
  // 批准日期
  pzrqRq: null,
  // 是否具备建立党组织条件
  sfjbjlzgdzztjPdbz: null,
  // 是否有党组织
  sfyzgdzzPdbz: null,
  // 是否有工会
  sfyghPdbz: null,
  // 是否有团组织
  sfygqdzzPdbz: null,
  // 是否有妇联
  sfyflzzPdbz: null,
  // 成员数
  cys: null,
  // 妇女人员人数
  fnryRs: null,
  // 工会会人员数
  ghryRs: null,
  // 共青团员数
  gqttyRs: null,
  // 党员人数
  dangyRs: null,
  // 保卫负责人姓名
  bwfzrXm: null,
  // 保卫负责人身份证号
  bwfzrGmsfhm: null,
  // 保卫负责人联系电话
  bwfzrLxdh: null,
  // 业务范围
  ywfw: null,
  // 备注
  bz: null
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
    // 地图地址选择
    handleSelectAddress({ address, addressId, addressCode }) {
      this.formData.zzdzDzbm = addressId
      this.formData.zzdzQhnxxdz = address
      this.formData.zzdzXzqhdm = addressCode
    },
    // 提交表单
    submitForm() {
      this.validate((valid, data) => {
        if (valid) {
          const sdata = cloneDeep(data)
          console.log(sdata)
          // sdata.cys = sdata.cys ? sdata.cys.toNumber() : ''
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
          this.$refs.ztmap.searchAddressAndLocate(this.formData.zzdzQhnxxdz)
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-form-item:not(.no100) .el-select {
  width: 100% !important;
}

::v-deep .el-input__inner[disabled=disabled] {
  color: #606266;
}
</style>
