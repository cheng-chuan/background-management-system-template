<template>
  <zt-map ref="ztmap" lnglat-only @selectLnglat="handleSelectLnglat">
    <el-form
      ref="myform"
      v-loading="loading"
      size="mini"
      label-width="110px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="所属网格" prop="sszdyjxzqyDzbm">
        <ZtGridLabel />
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="街路巷名称" prop="jlxmc" required>
            <el-input v-model="formData.jlxmc" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="组（队）名称" prop="zdmc">
            <el-input v-model="formData.zdmc" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0" prop="zdh">
            <el-input v-model="formData.zdh">
              <span slot="append">号</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <ZtLabel h="28px" color="danger">必填街路巷/组（队）名称；号数必填</ZtLabel>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="小区/建筑名称" prop="xqmc">
            <el-input v-model="formData.xqmc" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <ZtLabel h="28px" color="danger">未填组（队）名时必填</ZtLabel>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="楼栋号" prop="ldh">
            <el-input v-model="formData.ldh" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="经纬度">
            <el-input v-model="assistFormData.lng" placeholder="经度" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="0px">
            <el-input v-model="assistFormData.lat" placeholder="纬度" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <ZtLabel h="28px" color="danger">点击地图绑定经纬度</ZtLabel>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="单元数" prop="dys">
            <el-input-number
              v-model="formData.dys"
              controls-position="right"
              :min="0"
              :max="100"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label prop="dyhhsflxdm">
            <el-checkbox v-model="formData.dyhhsflxdm" true-label="1" false-label="0">单元间户号连续</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <ZtLabel h="28px" color="danger">选择单元数可自动生成楼栋单元布局</ZtLabel>
        </el-col>
      </el-row>

      <el-row v-if="formData.dys && formData.dys > 0 && ufrowRerender" v-loading="ufrowLoading">
        <div class="unit-floor-conf" :style="formData.dys > 5 ? {height:'241px'} : {}">
          <ZtTable v-bind="tableOptions" :column-edit="false" simple-page>
            <template #formatter-dylc="{row}">
              <el-input-number
                v-model="row.dylc"
                size="mini"
                controls-position="right"
                :min="0"
                :max="100"
              />
            </template>
            <template #formatter-mchs="{row}">
              <el-input-number
                v-model="row.mchs"
                size="mini"
                controls-position="right"
                :min="0"
                :max="100"
              />
            </template>
            <template #formatter-sfydxlc="{row}">
              <el-checkbox v-model="row.sfydxlc" true-label="1" false-label="0">{{ sfydxlc }}</el-checkbox>
            </template>
            <template #formatter-dxlc="{row}">
              <el-input-number
                v-model="row.dxlc"
                :disabled="row.sfydxlc === '0'"
                size="mini"
                controls-position="right"
                :min="0"
                :max="100"
              />
            </template>
            <template #formatter-dxmchs="{row}">
              <el-input-number
                v-model="row.dxmchs"
                :disabled="row.sfydxlc === '0'"
                size="mini"
                controls-position="right"
                :min="0"
                :max="100"
              />
            </template>
            <template #formatter-dxyt="{row}">
              <ZtDicSelect
                v-model="row.dxyt"
                :disabled="row.sfydxlc === '0'"
                width="100px"
                code="LM00017"
              />
            </template>
          </ZtTable>
        </div>
        <br>
      </el-row>

      <el-form-item label="建筑用途" prop="jzytdm">
        <ZtDicRadio v-model="formData.jzytdm" code="LM00017" />
      </el-form-item>

      <el-form-item label="是否地上" prop="sfdsdm">
        <ZtDicRadio v-model="formData.sfdsdm" :custom-options="isOnTheGroundOptions" />
      </el-form-item>

      <el-form-item label="房屋类别" prop="fwlbdm">
        <ZtDicRadio v-model="formData.fwlbdm" code="DM00025" />
      </el-form-item>
    </el-form>
  </zt-map>
</template>

<script>
import debounce from 'lodash/debounce'
import { YES_OR_NO_OPTS } from '@/api/common/dict'
import { getDetail } from '@/api/information-collection/standard-address/standard-address.js'

const model = {
  // 街路巷名称
  jlxmc: null,
  // ** 组队名称
  zdmc: null,
  // 号
  zdh: null,
  // ** 小区/建筑名称
  xqmc: null,
  // 楼栋号
  ldh: null,
  // 经纬度
  jwd: null,
  // 单元数
  dys: 0,
  // 单元间户号连续
  dyhhsflxdm: null,
  // 建筑用途
  jzytdm: null,
  // 是否地上
  sfdsdm: '1',
  // 房屋类别
  fwlbdm: null,
  // 所属最低一级网格
  sszdyjxzqyDzbm: null,
  // 单元楼层数据
  dybs: []
}
export default {
  props: {
    dataId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    // 参数校验器 街路巷
    var validateJlxmc = (rule, value, callback) => {
      if (!this.formData.jlxmc && !this.formData.zdmc) {
        callback(new Error('必填街路巷/组（队）名称'))
      } else {
        callback()
      }
    }
    // 组（队）名称
    var validateZdmc = (rule, value, callback) => {
      if (!this.formData.jlxmc && !this.formData.zdmc) {
        callback(new Error('必填街路巷/组（队）名称'))
      } else {
        callback()
      }
    }
    // 小区建筑物
    var validateXqjzmc = (rule, value, callback) => {
      if (!this.formData.zdmc && !this.formData.xqmc) {
        callback(new Error('未填组（队）名称时必填'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      ufrowLoading: false,
      // 单元楼层重渲染标记
      ufrowRerender: true,
      isOnTheGroundOptions: YES_OR_NO_OPTS,
      formData: { ...model },
      formRules: {
        sszdyjxzqyDzbm: [{ required: true, message: '请选择网格', trigger: 'change' }],
        fwlbdm: [{ required: true, message: '请选择房屋类别', trigger: 'change' }],
        sfdsdm: [{ required: true, message: '请选择是否地上', trigger: 'change' }],
        jzytdm: [{ required: true, message: '请选择建筑用途', trigger: 'change' }],
        ldh: [{ required: true, message: '请输入楼栋号', trigger: 'blur' }],
        zdh: [{ required: true, message: '请输入号', trigger: 'blur' }],
        jlxmc: [
          { validator: validateJlxmc, trigger: 'blur' }
        ],
        xqmc: [
          { validator: validateXqjzmc, trigger: 'blur' }
        ],
        zdmc: [
          { validator: validateZdmc, trigger: 'blur' }
        ]
      },
      assistFormData: {
        lng: null,
        lat: null
      },
      tableOptions: {
        listData: null,
        columnEdit: true,
        showIndex: true,
        showSelection: false,
        operations: [],
        columns: [{
          prop: 'dylc',
          label: '楼层数',
          width: 100
        }, {
          prop: 'mchs',
          label: '每层户数',
          width: 100
        }, {
          prop: 'sfydxlc',
          label: '地下室',
          width: 60,
          align: 'right'
        }, {
          prop: 'dxlc',
          label: '地下楼层数',
          width: 100
        }, {
          prop: 'dxmchs',
          label: '地下每层户数',
          width: 100
        }, {
          prop: 'dxyt',
          label: '地下用途'
        }]
      }
    }
  },
  watch: {
    // 监听辅助表单设置原表单经纬度
    assistFormData: {
      deep: true,
      handler(nval) {
        if (nval.lng || nval.lat) {
          this.formData.jwd = `${nval.lng || ''},${nval.lat || ''}`
        } else {
          this.formData.jwd = null
        }
      }
    },
    // 监听单元楼层配置变化，注入到到列表显示
    'formData.dybs'(nval) {
      this.tableOptions.listData = nval
    },
    // 监听单元数 生成单元配置列表
    'formData.dys'(nval) {
      this.ufrowLoading = true
      this.reGenerateUfrowConf()
    }
  },
  created() {
    this.loadUnitFloorData()
    this.setAddressGrid()
    this.initFormData()
  },
  methods: {
    handleSelectLnglat({ lng, lat }) {
      this.assistFormData.lng = lng
      this.assistFormData.lat = lat
    },
    // 加载数据
    initFormData() {
      if (this.dataId) {
        // 接口加载
        this.loading = true
        getDetail(this.dataId).then(res => {
          Object.assign(this.formData, res.data.data)
          const jwd = this.formData.jwd
          if (jwd) {
            const jwds = jwd.split(',').filter(item => !!item)
            this.assistFormData.lng = jwds[0] || null
            this.assistFormData.lat = jwds[1] || null
          }
          this.$refs.ztmap.drawAndLocate(this.assistFormData.lng, this.assistFormData.lat)
          this.loading = false
        })
      }
    },
    // 设置当前地址网格值
    setAddressGrid() {
      const gridInfos = this.$store.state.biz.gridInfos
      const selectGrids = this.$store.state.biz.grid
      if (selectGrids && selectGrids.length > 0) {
        const ginfo = gridInfos[selectGrids[selectGrids.length - 1]]
        if (ginfo) {
          this.formData.sszdyjxzqyDzbm = ginfo.oucode
        } else {
          this.formData.sszdyjxzqyDzbm = null
        }
      } else {
        this.formData.sszdyjxzqyDzbm = null
      }
    },
    // 绑定地图
    bindMap() {
      this.$message.info('绑定地图：尚在施工')
    },
    // 校验表单
    validate(valiFunc) {
      this.$refs['myform'].validate((valid) => {
        if (valid) {
          valiFunc(true, this.formData)
        } else {
          valiFunc(false, this.formData)
        }
      })
    },
    // 生成单元楼层配置信息
    reGenerateUfrowConf: debounce(function() {
      this.loadUnitFloorData()
      this.doUfrowRerender()
      this.ufrowLoading = false
    }, 400),
    // 重渲染解决列表高度问题
    doUfrowRerender() {
      this.ufrowRerender = false
      this.$nextTick(() => {
        this.ufrowRerender = true
      })
    },
    // 生成单元楼层数据
    loadUnitFloorData() {
      if (!this.formData.dybs || this.formData.dybs.length === 0) {
        // 新生成
        const ufData = new Array(this.formData.dys).fill(null).map(i => ({
          dylc: 0,
          mchs: 0,
          sfydxlc: '0',
          dxlc: 0,
          dxmchs: 0,
          dxyt: '1'
        }))
        this.$set(this.formData, 'dybs', ufData)
      } else {
        // 已有列表则在原基础上增删 避免重新生成数组导致数据初始化
        const olen = this.formData.dybs.length
        const nlen = this.formData.dys
        if (nlen > olen) {
          new Array(nlen - olen).fill(null).forEach(i => this.formData.dybs.push({
            dylc: 0,
            mchs: 0,
            sfydxlc: '0',
            dxlc: 0,
            dxmchs: 0,
            dxyt: '1'
          }))
        } else if (nlen < olen) {
          new Array(olen - nlen).fill(null).forEach(i => this.formData.dybs.pop())
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-input-group__append {
  padding: 0 8px;
}
.danger-span {
  height: 100%;
  color: #f56c6c;
  display: flex;
}
::v-deep .unit-floor-conf .el-input-number {
  width: 80px;
}
</style>
