<template>
  <div class="line_com">
    <div class="line_com_title">
      <span class="line_com_title_text">辖区业务概况</span>
      <el-divider />
    </div>
    <div class="check_tabs">
      <div v-for="(item,index) in checkedTabs" :key="index" class="check_tabs_items" :class="activeTab == item.id ? 'active' :''" @click="checkTabsMethod(item)">
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div v-show="activeTab === 1" id="line_com_echert" ref="line_com_echert" />
    <div v-show="activeTab === 2" id="line_com_echert_street" />
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import {
  Chart
} from '@antv/g2'
import moment from 'moment'

export default {
  data() {
    return {
      width: 0,
      cuttentTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      activeTab: 1,
      flag1: null,
      flag2: null,
      checkedTabs: [{
        name: '月度',
        id: 1
      }, {
        name: '地区',
        id: 2
      }]
    }
  },
  computed: {
    ...mapGetters(['reportdirstrict', 'reportdirstrictmonth', 'reportdirstrictfelend', 'reportdirstrictfelendstreet'])
  },
  watch: {
    reportdirstrictmonth: {
      handler(newval, oldval) {
        console.log(oldval)
        if (oldval.length === 0) {
          this.initLineMonthChart()
        }

        this.flag1 = newval
      },
      deep: true
    },
    reportdirstrict: {
      handler(newval, oldval) {
        if (oldval.length === 0) {
          this.initstreetChart()
        }

        this.flag2 = newval
      },
      deep: true
    }
  },
  created() {
    this.reportdimensionalMethod({
      reportDay: this.cuttentTime,
      dimensional: '辖区业务概况-月度'
    })
    this.reportdimensionalMethod({
      reportDay: this.cuttentTime,
      dimensional: '辖区业务概况-地区'
    })
  },
  mounted() {
    this.width = this.$refs.line_com_echert.offsetWidth
    if (this.flag1 !== null) {
      this.initLineMonthChart()
      // console.log(this.$refs)
    }
    if (this.flag2 !== null) {
      this.initstreetChart()
    }
  },
  methods: {
    ...mapActions([
      'reportdimensionalMethod'
    ]),
    checkTabsMethod(item) {
      this.activeTab = item.id
    },
    initstreetChart() {
      const chart = new Chart({
        container: 'line_com_echert_street',
        // autoFit: true,
        height: 170,
        width: this.width,
        zIndex: -1
      })
      chart.source(this.reportdirstrict, {
        area: {
          type: 'linear'
        }
      })
      chart.axis(true)
      chart.legend({
        position: 'top',
        custom: true,
        items: this.reportdirstrictfelendstreet
      })
      chart.scale('value2', {
        min: 0,
        max: 30,
        tickCount: 5
      })
      chart.animate(true)
      chart.line().position('value1*value2').color('name')
      chart.removeInteraction('legend-filter') // 自定义图例，移除默认的分类图例筛选交互
      chart.render()
    },
    initLineMonthChart() {
      const chart = new Chart({
        container: 'line_com_echert',
        autoFit: true,
        height: 170,
        // width: this.width,
        zIndex: -1
      })
      chart.axis(true)
      chart.animate(true)
      // chart.data(this.reportdirstrictmonth)
      chart.data(this.reportdirstrictmonth)
      chart.legend({
        position: 'top',
        custom: true,
        items: this.reportdirstrictfelend
      })
      chart.scale('value2', {
        min: 0,
        max: 30,
        tickCount: 5
      })
      chart.line().position('value1*value2').color('name')
      chart.removeInteraction('legend-filter') // 自定义图例，移除默认的分类图例筛选交互
      chart.render()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-divider--horizontal {
    margin: 0;
    color: #e7ebf2;
    margin-top: 10px;
}

.line_com {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .line_com_title {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 16px;
        color: #4f556e;
        height: 20px;
        border-left: 2px solid #4c8bfd;

        .line_com_title_text {
            display: block;
            width: 150px;
            line-height: 20px;
            padding-left: 14px;
            box-sizing: border-box;

        }
    }

    #line_com_echert,
    #line_com_echert_street {
        height: 100%;
        width: 100%;
        padding-top: 20px;
        box-sizing: border-box;
    }

    .check_tabs {
        position: absolute;
        right: 0;
        top: 20px;
        width: 90px;
        height: 30px;
        display: flex;
        z-index: 999;

        .check_tabs_items {
            flex: 1;
            cursor: pointer;
            height: 100%;
            border-radius: 0px 4px 4px 0px;
            border: solid 1px #cccccc;
            color: #999999;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;

            &:nth-of-type(1) {
                border-radius: 4px 0px 0px 4px;
                border-right: 0;
            }

            &.active {
                background-color: #f1f9ff;
                color: #48aaff;
            }
        }
    }
}
</style>
