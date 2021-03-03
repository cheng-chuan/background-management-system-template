<template>
  <ZtDetail v-loading="loading" :model="detailData" :label-width="[120]">

    <ZtLabel b s="15px">楼宇信息</ZtLabel>
    <hr>

    <el-row>
      <ZtDetailItem label="所属网格" span="24">
        <ZtGridLabel />
      </ZtDetailItem>
    </el-row>

    <el-row>
      <ZtDetailItem #default="{ model }" span="24" label="地址">
        {{ `${model.jlxmc || model.zdmc}${model.zdh}号` }}
      </ZtDetailItem>
    </el-row>

    <el-row>
      <ZtDetailItem label="街路巷名称" f="jlxmc" />
      <ZtDetailItem label="组队名称" f="zdmc" />
    </el-row>

    <el-row>
      <ZtDetailItem label="门牌号" f="mph" />
      <ZtDetailItem label="建筑用途" f="jzytdm" code="LM00017" />
    </el-row>

    <el-row>
      <ZtDetailItem label="小区名称" f="xqmc" />
      <ZtDetailItem label="楼栋号" f="ldh" />
    </el-row>

    <el-row>
      <ZtDetailItem label="单元数" f="dys" />
      <ZtDetailItem label="地上地下" fdefine="YES_OR_NO_OPTS" f="sfdsdm" />
    </el-row>

    <el-row>
      <ZtDetailItem label="房屋类别" f="fwlbdm" code="DM00025" />
    </el-row>
  </ZtDetail>
</template>

<script>
import { getDetail } from '@/api/information-collection/standard-address/standard-address.js'

export default {
  props: {
    detailId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      detailData: null,
      loading: false
    }
  },
  computed: {
    address() {
      if (!this.detailData) return
      const detail = this.detailData
      return `${detail.jlxmc || detail.zdmc}${detail.zdh}号`
    }
  },
  created() {
    this.initDetail()
  },
  methods: {
    initDetail() {
      if (!this.detailId) return
      this.loading = true
      getDetail(this.detailId).then(res => {
        this.detailData = res.data.data
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
