<template>
  <ZtDetail v-loading="loading" :model="detailData" :label-width="[120]" class="household-registration-detail">
    <ZtLabel b s="15px">基本信息</ZtLabel>
    <hr>
    <el-row>
      <ZtDetailItem label="所属网格" span="24">所属网格</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="户号">{{ fchain(detailData,'hh') }}</ZtDetailItem>
      <ZtDetailItem label="身份证">{{ fchain(detailData, 'gmsfhm') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="户主姓名">{{ fchain(detailData, 'xm') }}</ZtDetailItem>
      <ZtDetailItem label="户籍地">{{ fchain(detailData, 'hzd') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="联系手机">{{ fchain(detailData, 'lxdh') }}</ZtDetailItem>
      <ZtDetailItem label="固定电话">{{ fchain(detailData, 'gddh') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="家庭称号">{{ fchain(detailData, 'jtch') }}</ZtDetailItem>
      <ZtDetailItem label="家庭电话">{{ fchain(detailData, 'jtdh') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="户主地址" span="24">{{ fchain(detailData, 'address') }}</ZtDetailItem>
    </el-row>
    <br>
    <br>
    <ZtLabel b s="15px">现有成员</ZtLabel>
    <hr>
    <el-row>
      <ZtTable height="240px" v-bind="tableOptions" simple-page />
    </el-row>
  </ZtDetail>
</template>

<script>
import { getDetail } from '@/api/information-collection/standard-address/household-registration.js'

export default {
  props: {
    nolink: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: null
    },
    detailId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    const thiz = this
    return {
      loading: false,
      detailData: this.detail,
      tableOptions: {
        listData: [],
        columnEdit: false,
        showIndex: false,
        showSelection: false,
        columns: [{
          prop: 'xm',
          label: '姓名',
          width: 80,
          link: thiz.nolink === false,
          handleLink: (row) => {
            console.log(111, thiz.showLink)
            this.$message.info('xm handleLink')
          }
        }, {
          prop: 'xbdm',
          label: '性别',
          width: 120,
          // dictFdefine: 'DEMO'
          dictCode: 'DM01058'
        }, {
          prop: 'gmsfhm',
          label: '身份证号',
          width: 150
        }, {
          prop: 'yhzgxdm',
          label: '与户主关系',
          dictCode: 'DM01075'
          // dictOptions: [{
          //   label: 'dddd',
          //   value: '100'
          // }]
        }]
      }
    }
  },
  watch: {
    detail(val) {
      this.detailData = val
    },
    detailId(val) {
      this.loadDetail()
    }
  },
  created() {
    this.loadDetail()
  },
  methods: {
    loadDetail() {
      if (this.detailData) return
      if (this.detailId) {
        this.loading = true
        getDetail(this.detailId).then(res => {
          this.detailData = res.data.data
          if (res.data.data && res.data.data.hjrkxxbs) {
            this.tableOptions.listData = res.data.data.hjrkxxbs
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
        return
      }
      console.warn("can't load detail detail|detailId dosen't exist current moment, detail|detailId is dynamic may change")
    }
  }
}
</script>

<style lang='scss' scoped>
.household-registration-detail {
  // width: 600px;
  // margin: auto;
}
</style>
