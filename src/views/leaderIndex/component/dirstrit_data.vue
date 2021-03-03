<template>
  <div class="data_info">
    <TitleCom title="各渠道上报量" />
    <div class="data_info_wrap">
      <div class="wrap_width">
        <DataCom title="网格员上报总量" :value1="reportdatas.value1" :value2="reportdatas.value2" :value3="reportdatas.value3" />
      </div>
      <div class="wrap_width">
        <DataCom title="市级下派总量" :value1="reportdatas.value4" :value2="reportdatas.value5" :value3="reportdatas.value6" />
      </div>
      <div class="wrap_width">
        <DataCom title="区级交办总量" :value1="reportdatas.value7" :value2="reportdatas.value8" :value3="reportdatas.value9" />
      </div>
      <div class="wrap_width">
        <DataCom title="镇级上报总量" :value1="reportdatas.value10" :value2="reportdatas.value11" :value3="reportdatas.value12" />
      </div>
      <div class="wrap_width">
        <DataCom title="智能感知总量" :value1="reportdatas.value13" :value2="reportdatas.value14" :value3="reportdatas.value15" />
      </div>
      <div class="wrap_width">
        <DataCom title="公众上报总量" :value1="reportdatas.value16" :value2="reportdatas.value17" :value3="reportdatas.value18" />
      </div>
    </div>
    <div class="data_info_line">
      <LineDataCom />
    </div>

  </div>
</template>

<script>
import TitleCom from './title.vue'
import DataCom from './data_component.vue'
import moment from 'moment'
// 曲线图
import LineDataCom from './line-data-component.vue'
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  name: '',
  components: {
    DataCom,
    LineDataCom,
    TitleCom
  },
  data() {
    return {
      cuttentTime: moment(new Date().getTime()).format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapGetters(['reportdatas'])
  },
  created() {
    this.reportdimensionalMethod({
      reportDay: this.cuttentTime,
      dimensional: '各渠道上报量'
    })
  },
  methods: {
    ...mapActions([
      'reportdimensionalMethod'
    ])
  }
}
</script>

<style lang="less" scoped>
.data_info {
    width: 100%;
    height: 100%;
    padding: 0 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .data_info_wrap {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-top: 20px;
        box-sizing: border-box;
        .wrap_width{
            width: 48.5%;
            height: 80px;
            margin-bottom: 20px;
        }
    }
    .data_info_line{
        flex: 1;
        width: 100%;
    }
}
</style>
