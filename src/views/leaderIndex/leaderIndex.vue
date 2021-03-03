<template>
  <div class="leaderindex">
    <div style="height: 60px">
      <LeaderHeader />
    </div>

    <div class="index_classfy">
      <div class="index_classfy_item">
        <DirstritMap />
      </div>
      <div class="index_classfy_item">
        <DirstritData />
      </div>
      <div class="index_classfy_item">
        <DirstritList />
      </div>
    </div>
    <div class="leader_event">
      <TitleCom title="热点事件统计排名" />
      <div class="leader_event_items">
        <div v-for="(item,index) in hotsortreport" :key="index" ref="elstep" class="leader_event_items_list" @click="changeeventDataMethod(index)">
          <EvenItemCom :dataitem="item" />
        </div>
      </div>
    </div>
    <div class="leader_step">
      <div class="arrow" :style="{left:transX+'px'}" />
      <div class="arrow_cut" :style="{left:(transX-5)+'px'}" />
      <el-steps v-if="newdata !== null" :active="currenttab" align-center>
        <el-step :title="hotsortreport[currenttab].value2" :description="hotsortreport[currenttab].value3 + '个'" />
        <el-step :title="hotsortreport[currenttab].value4" :description="hotsortreport[currenttab].value5 + '个'" />
        <el-step :title="hotsortreport[currenttab].value6" :description="hotsortreport[currenttab].value7 + '个'" />
        <el-step :title="hotsortreport[currenttab].value8" :description="hotsortreport[currenttab].value9 + '个'" />
        <el-step :title="hotsortreport[currenttab].value10" :description="hotsortreport[currenttab].value11 + '个'" />
      </el-steps>
    </div>
  </div>
</template>
<script>
import LeaderHeader from './component/leaderHeader.vue'
import DirstritMap from './component/dirstrit_map.vue'
import DirstritData from './component/dirstrit_data.vue'
import DirstritList from './component/dirstrit_list.vue'
import TitleCom from './component/title.vue'
import EvenItemCom from './component/event_item_component.vue'
import {
  mapActions,
  mapGetters
} from 'vuex'
import moment from 'moment'
export default {
  components: {
    LeaderHeader,
    DirstritMap,
    DirstritData,
    DirstritList,
    TitleCom,
    EvenItemCom
  },
  data() {
    return {
      cuttentTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      transX: 0,
      currenttab: 0,
      newdata: null
    }
  },
  computed: {
    ...mapGetters(['hotsortreport'])
  },
  watch: {
    hotsortreport: {
      handler(newval, oldval) {
        this.newdata = newval
      },
      deep: true
    },
    currenttab(val) {
      this.transX = this.$refs.elstep[0].offsetWidth / 2 + ((this.$refs.elstep[0].offsetWidth + 20) * (this.currenttab))
    }
  },
  created() {
    this.reportdimensionalMethod({
      reportDay: this.cuttentTime,
      dimensional: '热点事件统计排名'
    })
  },
  mounted() {
    if (this.newdata !== null) {
      this.transX = this.$refs.elstep[0].offsetWidth / 2 + ((this.$refs.elstep[0].offsetWidth + 20) * (this.currenttab))
    }
  },
  methods: {
    ...mapActions([
      'reportdimensionalMethod'
    ]),
    changeeventDataMethod(index) {
      this.currenttab = index
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-step__title.is-finish {
    color: #333;
}

/deep/.el-step__title.is-process,
.el-step__head.is-process {
    color: #333 !important;
    font-weight: 400;
}

/deep/.el-step__title.is-wait,
.el-step__title.is-wait {
    color: #333;
}

/deep/.el-step {
    position: relative;
    height: 170px;
    padding-top: 130px;
    box-sizing: border-box;
}

/deep/.el-step__main {
    position: relative;
    bottom: 95px;
    left: 0;
}

/deep/.is-finish {
    color: #f4852e;
    border-color: #f4852e;
}

/deep/.el-step__description {
    color: #f4852e;
}

.leaderindex {
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: #eaeff4;
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
    box-sizing: border-box;
}

.index_classfy {
    width: 100%;
    display: flex;
    padding: 20px 0;
    box-sizing: border-box;

    .index_classfy_item {
        flex: 1;
        height: 620px;
        background-color: #fff;
        margin-right: 20px;
        box-shadow: 0px 4px 16px 0px #e7ecf1;
        border-radius: 4px;
        overflow: hidden;

        &:nth-last-of-type(1) {
            margin-right: 0;
        }
    }

}

.leader_event {
    width: 100%;
    height: 170px;
    box-sizing: border-box;
    box-shadow: 0px 4px 16px 0px #e7ecf1;
    border-radius: 4px;
    background-color: #ffffff;
    // display: flex;
    // flex-direction: column;
    padding: 0 20px;

    .leader_event_items {
        width: 100%;
        flex: 1;
        padding: 23px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .leader_event_items_list {
            margin-right: 20px;

            cursor: pointer;
            flex: 1;

            &:nth-last-of-type(1) {
                margin-right: 0;
            }
        }
    }

    //  background-color: red;
}

.leader_step {
    margin-top: 20px;
    background-color: #fff;
    // flex: 1;
    height: 170px;
    width: 100%;
    border-radius: 4px;
    padding: 0 200px;
    box-sizing: border-box;
    position: relative;

}

.arrow {
    position: absolute;
    transition: left 0.1s linear;
    top: -14px;
    // left: 45px;
    width: 26px;
    height: 26px;
    background: #fff;
    transform: rotate(135deg);
    box-shadow: 1px -2px 5px rgba(0, 0, 0, .2);
}

.arrow_cut {
    position: absolute;
    top: 0px;
    transition: left 0.1s linear;
    // left: 40px;
    width: 40px;
    height: 40px;
    background: #fff;
}
</style>
