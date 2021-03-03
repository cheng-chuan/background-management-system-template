<template>
  <ZtDetail v-loading="loading" :model="detailData" :label-width="[120]">

    <ZtLabel b s="15px">基本信息</ZtLabel>
    <hr>

    <el-row>
      <ZtDetailItem label="所属网格" span="24">
        <ZtGridLabel />
      </ZtDetailItem>
    </el-row>

    <el-row>
      <ZtDetailItem span="24" label="小区" f="xq" />
    </el-row>

    <el-row>
      <ZtDetailItem label="单元" f="dy" />
      <ZtDetailItem label="室" f="sh" />
    </el-row>
    <el-row>
      <ZtDetailItem label="是否出租房" f="sfczwPdbz" code="DM01117" />
      <ZtDetailItem />
    </el-row>

    <el-row>
      <ZtDetailItem label="户型" f="hx" />
      <ZtDetailItem label="房屋面积(㎡)" f="fwmjMj" />
    </el-row>

    <el-row>
      <ZtDetailItem label="建筑用途" f="jzytdm" code="LM90107" />
      <ZtDetailItem label="房屋来源" f="fwly" />
    </el-row>

    <el-row>
      <ZtDetailItem label="隐患类型" f="yhlxdm" code="LM90108" />
      <ZtDetailItem />
    </el-row>

    <el-row>
      <ZtDetailItem label="证件类型" f="fzCyzjdm" code="DM01096" />
      <ZtDetailItem label="证件号码" f="fzZjhm" />
    </el-row>

    <el-row>
      <ZtDetailItem label="产权人名称" f="fzXm" />
      <ZtDetailItem label="产权人电话" f="fzLxdh" />
    </el-row>

    <el-row>
      <ZtDetailItem label="房屋性质" f="fwcqxzdm" code="DM00023" />
      <ZtDetailItem label="房屋间数" f="fwjs" />
    </el-row>

    <el-row>
      <ZtDetailItem span="24" label="备注" f="bz" />
    </el-row>

  </ZtDetail>
</template>

<script>
import { getHouseDetail } from '@/api/information-collection/standard-address/hosue-person.js'

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
  created() {
    this.initDetail()
  },
  methods: {
    initDetail() {
      if (!this.detailId) return
      this.loading = true
      getHouseDetail(this.detailId).then(res => {
        this.detailData = res.data.data
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
