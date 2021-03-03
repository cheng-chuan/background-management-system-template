<template>
  <el-dialog
    :title="houseDialogConfig.title"
    :visible.sync="houseDialogConfig.houseDialogVisible"
    :close-on-click-modal="false"
    :modal="false"
    width="1400px"
    @before-close="closeDialog"
  >
    <zt-map ref="ztmap" @selectAddress="handleSelectAddress">
      <el-form ref="addHouseForm" :model="houseForm" label-width="120px">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="房屋地址属性绑定：" label-width="140px">
              <el-radio-group v-model="ryzflxdm">
                <el-radio label="1">绑定为户籍地址</el-radio>
                <el-radio label="2">绑定为常住地址</el-radio>
                <el-radio label="3">绑定为联系地址</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-form-item label="地址选择：">
            <el-col :span="8">
              <el-select v-model="houseForm.mlxz" size="small" placeholder="请选择" @change="jlxmcChange">
                <el-option
                  v-for="item in jlxmcList"
                  :key="item.mlxz"
                  :label="item.mlxz"
                  :value="item.mlxz"
                />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="houseForm.dzmc" size="small" placeholder="请选择" @change="ldhChange">
                <el-option
                  v-for="item in ldhList"
                  :key="item.dzmc"
                  :label="item.dzmc"
                  :value="item.dzmc"
                />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="houseForm.mlph" size="small" placeholder="请选择" @change="mlphChnage">
                <el-option
                  v-for="item in mlphList"
                  :key="item.mlph"
                  :label="item.mlph"
                  :value="item.mlph"
                />
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="24">
          <el-form-item label="现居详细地址：">
            <el-input v-model="houseForm.xjxxdz" size="small" />
          </el-form-item>
        </el-row>
        <el-row v-show="isShow" :gutter="24">
          <el-col :span="12">
            <el-form-item label="户号：">
              <el-input v-model="houseForm.hh" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="与户主关系：">
              <el-select v-model="houseForm.yhzgxdm" size="small" placeholder="请选择">
                <el-option
                  v-for="item in yhzgx_options"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isShow" :gutter="24">
          <el-col :span="12">
            <el-form-item label="户口类别：">
              <el-select v-model="houseForm.hklxdm" size="small" placeholder="请选择">
                <el-option
                  v-for="item in hklb_options"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户主姓名：">
              <el-input v-model="houseForm.xm" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isShow" :gutter="24">
          <el-col :span="12">
            <el-form-item label="户主身份证号：">
              <el-input v-model="houseForm.gmsfhm" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式：">
              <el-input v-model="houseForm.lxdh" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="迁入原因：">
              <el-select v-model="houseForm.qryydm" size="small" placeholder="请选择">
                <el-option
                  v-for="item in qryy_options"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="迁入时间：">
              <el-date-picker
                v-model="houseForm.qrsj"
                size="small"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </zt-map>
    <div slot="footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="commitHouseData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getHouseAddress, searchAllDropDownBox, addRegisteredPopulationZF, editRegisteredPopulationZF } from '@/api/information-collection/population/real-population/floating-population'

export default {
  props: {
    houseDialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ryzflxdm: null,
      isShow: false,
      jlxmcList: [],
      ldhList: [],
      mlphList: [],
      houseForm: {},
      yhzgx_options: [],
      hklb_options: [],
      qryy_options: []
    }
  },
  computed: {
    get_xjxxdz() {
      return `${this.houseForm.mlxz}${this.houseForm.dzmc}${this.houseForm.mlph}`
    }
  },
  watch: {
    ryzflxdm() {
      if (this.ryzflxdm === '1') {
        this.isShow = true
      } else {
        this.houseForm.hh = null
        this.houseForm.yhzgxdm = null
        this.houseForm.hklxdm = null
        this.houseForm.xm = null
        this.houseForm.gmsfhm = null
        this.houseForm.lxdh = null
        this.isShow = false
      }
    }
  },
  created() {
    this.getHouseAddress('1', '', '')
    this.getDropDownList('DM00332')
    this.getDropDownList('DM01075')
    this.getDropDownList('DM00043')
  },
  methods: {
    // 地图地址选择
    handleSelectAddress({ address, addressId, addressCode }) {
      this.$set(this.houseForm, 'xjxxdz', address)
    },
    // 获取下拉框
    getDropDownList(data) {
      const params = {}
      params.dictValue = data
      params.rowVersion = ''
      searchAllDropDownBox(params).then(res => {
        // console.log(res)
        switch (data) {
          case 'DM00332':
            this.hklb_options = res.data.datas
            break
          case 'DM01075':
            this.yhzgx_options = res.data.datas
            break
          case 'DM00043':
            this.qryy_options = res.data.datas
            break
          default:
            break
        }
      })
    },
    // 获取地址下拉框
    getHouseAddress(typeStr, mlxz, dzmc) {
      const params = { mlxz, dzmc, typeStr }
      getHouseAddress(params).then(res => {
        console.log(res)
        if (typeStr === '1') {
          this.jlxmcList = res.data.data
        } else if (typeStr === '2') {
          this.ldhList = res.data.data
        } else if (typeStr === '3') {
          this.mlphList = res.data.data
        }
      })
    },
    jlxmcChange(val) {
      this.getHouseAddress('2', val, '')
      this.houseForm.xjxxdz = this.get_xjxxdz
    },
    ldhChange(val) {
      this.getHouseAddress('3', this.houseForm.mlxz, val)
      this.houseForm.xjxxdz = this.get_xjxxdz
    },
    mlphChnage(val) {
      this.houseForm.xjxxdz = this.get_xjxxdz
    },
    commitHouseData() {
      this.$confirm('是否保存住房信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        if (this.houseDialogConfig.type === 'add') {
          this.houseForm.xxzjbh = ''
          this.houseForm.mzdm = this.houseDialogConfig.mzdm
          this.houseForm.csrq = this.houseDialogConfig.csrq
          this.houseForm.cyzjdm = this.houseDialogConfig.cyzjdm
          this.houseForm.xbdm = this.houseDialogConfig.xbdm
          this.houseForm.cyzjdm = '1'
          this.houseForm.yybh = this.houseDialogConfig.id
          this.houseForm.ryzflxdm = this.ryzflxdm
          console.log(this.houseForm)
          console.log('提交住房信息')
          addRegisteredPopulationZF(this.houseForm).then(res => {
            console.log(res)
            if (res.status === 200 && res.data.code === '000000') {
              this.houseForm.jzytdm = res.data.data.jzytdm
              this.houseForm.xxzjbh = res.data.data.xxzjbh
              this.houseForm.zfxxId = res.data.data.zfxxId
              this.houseForm.fwdzsxbd = this.fwdzsxbd

              this.$emit('showHouseList', this.houseForm)
              this.cancelDialog()
              this.$message.success({
                message: '住房信息新增成功'
              })
            } else {
              this.$message.error({
                message: '住房新增失败'
              })
            }
          }).catch(() => {
            this.$message.error({
              message: '新增住房信息失败'
            })
          })
          this.cancelDialog()
          this.$emit('sendHKData', this.houseForm)
        } else if (this.houseDialogConfig.type === 'edit') {
          this.cancelDialog()
          console.log(this.houseForm)
          this.ryzflxdm = this.houseForm.ryzflxdm
          this.houseForm.zfxxId = this.houseForm.xxzjbh
          editRegisteredPopulationZF(this.houseForm).then(res => {
            console.log(res)
            if (res.status === 200 && res.data.code === '000000') {
              this.$message.success({
                message: '住房信息编辑成功'
              })
            } else {
              this.$message.error({
                message: '住房信息编辑失败'
              })
            }
          }).catch(() => {
            this.$message.error({
              message: '服务请求失败'
            })
          })
        }
      }).catch(() => {
        this.$message.info({
          message: '已取消保存'
        })
      })
    },
    cancelDialog() {
      this.houseDialogConfig.houseDialogVisible = false
    },
    closeDialog() {
      this.$emit('closeHouseDialog')
      this.houseDialogConfig = {}
      this.fwdzsxbd = null
      this.ryzflxdm = null
      this.cancelDialog()
    }
  }
}
</script>

<style scoped lang='scss'>
.el-form-item{
    margin-bottom: 8px;
  }
.el-select{
    width: 100%;
}
</style>
