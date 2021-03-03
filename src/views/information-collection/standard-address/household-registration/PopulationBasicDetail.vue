<template>
  <ZtDetail v-loading="loading" :model="detailData" :label-width="[120]">
    <ZtLabel b s="15px">基本信息</ZtLabel>
    <hr>
    <el-row>
      <ZtDetailItem label="所属网格" span="24">所属网格</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="姓名">{{ fchain(detailData,'xm') }}</ZtDetailItem>
      <ZtDetailItem w80 label="身份证">{{ fchain(detailData, 'gmsfhm') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="曾用名/别名">{{ fchain(detailData, 'cym') }}</ZtDetailItem>
      <ZtDetailItem w80 label="性别"><ZtDictLabel code="DM01058" :value="fchain(detailData, 'xbdm')" /></ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="出生日期">{{ fchain(detailData, 'csrq') }}</ZtDetailItem>
      <ZtDetailItem w80 label="民族"><ZtDictLabel code="DM00039" :value="fchain(detailData, 'mzdm')" /></ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="是否为租户">{{ fchain(detailData, 'xx') }}</ZtDetailItem>
      <ZtDetailItem w80 />
    </el-row>
    <el-row>
      <ZtDetailItem label="返乡来源地">{{ fchain(detailData, 'xx') }}</ZtDetailItem>
      <ZtDetailItem w80 label="接触情况">{{ fchain(detailData, 'xx') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="联系方式" span="24">{{ fchain(detailData, 'lxdh') }}</ZtDetailItem>
    </el-row>
    <br>
    <br>
    <ZtLabel b s="15px">扩展信息</ZtLabel>
    <hr>
    <el-row>
      <ZtDetailItem label="政治面貌"><ZtDictLabel code="DM01106" :value="fchain(detailData, 'zzmmdm')" /></ZtDetailItem>
      <ZtDetailItem label="文化程度">{{ fchain(detailData, 'xx') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="婚姻状况"><ZtDictLabel code="DM01102" :value="fchain(detailData, 'hyzkdm')" /></ZtDetailItem>
      <ZtDetailItem label="宗教信仰"><ZtDictLabel code="DM01053" :value="fchain(detailData, 'zjxydm')" /></ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="职业">{{ fchain(detailData, 'zy') }}</ZtDetailItem>
      <ZtDetailItem label="工作单位">{{ fchain(detailData, 'xx') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="籍贯">{{ fchain(detailData, 'jgssxdm') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="是否死亡" span="24">{{ fchain(detailData, 'xx') }}</ZtDetailItem>
    </el-row>
    <el-row>
      <ZtDetailItem label="名下机动车辆" span="24">{{ fchain(detailData, 'xx') }}</ZtDetailItem>
    </el-row>
  </ZtDetail>
</template>

<script>
import { getDetailPopulationBasicByIdNumber } from '@/api/information-collection/population/real-population/registered-population'

export default {
  props: {
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
    return {
      loading: false,
      detailData: this.detail
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
        getDetailPopulationBasicByIdNumber(this.detailId).then(res => {
          this.detailData = res.data.data
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

<style>

</style>
