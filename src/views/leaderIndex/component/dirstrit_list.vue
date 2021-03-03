<template>
  <div class="data_info">
    <TitleCom title="办理量排名">
      <div class="check_line_type">
        <div v-for="(item,index) in line_tabs" :key="index" class="check_line_type_item" :class="currentIndex == item.id ? 'active':''" @click="changeLineTabsMethod(item)">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </TitleCom>
    <div class="data_progress">
      <el-row class="data_progress_title">
        <el-col :span="3">
          <div class="grid-content">
            <span>排名</span>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content left">
            <span>名称</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content">
            <span>办理量</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content">
            <span>按期处置率</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content">
            <span>同比</span>
          </div>
        </el-col>
      </el-row>
      <div v-for="(item,index) in reportsortstrict" :key="index">
        <ProgressCom :dataitem="item" :sort=" index + 1" />
      </div>

    </div>
  </div>
</template>

<script>
import TitleCom from './title.vue'
import ProgressCom from './progress_component.vue'
import moment from 'moment'
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  components: {
    TitleCom,
    ProgressCom
  },
  data() {
    return {
      cuttentTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      currentIndex: 1,
      line_tabs: [{
        title: '街道园区',
        id: '1'
      }, {
        title: '部门',
        id: '2'
      }]
    }
  },
  computed: {
    ...mapGetters(['reportsortstrict'])
  },
  created() {
    this.reportdimensionalMethod({
      reportDay: this.cuttentTime,
      dimensional: '办理量排名-街道园区'
    })
  },
  methods: {
    ...mapActions([
      'reportdimensionalMethod'
    ]),
    changeLineTabsMethod(item) {
      this.currentIndex = item.id
      if (this.currentIndex === '1') {
        this.reportdimensionalMethod({
          reportDay: this.cuttentTime,
          dimensional: '办理量排名-街道园区'
        })
      } else {
        this.reportdimensionalMethod({
          reportDay: this.cuttentTime,
          dimensional: '办理量排名-部门'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.data_info {
    width: 100;
    height: 100;
    padding: 0 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .check_line_type {
        height: 30px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        // width: 210px;
        display: flex;
        justify-content: center;
        align-items: center;

        .check_line_type_item {
            width: 100px;
            height: 30px;
            background-color: #f5f5f5;
            color: #999999;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-right: 10px;

            &:nth-last-of-type(1) {
                margin-right: 0;
            }

            &.active {
                color: #4c95fd;
                background-color: #e2f6ff;
            }
        }
    }

    .data_progress_title {
        width: 100%;
        height: 30px;
        background-image: linear-gradient(0deg,
                #4c8cfd 0,
                #78b8ff 100%),
            linear-gradient(#4ca1fd,
                #4ca1fd);
        background-blend-mode: normal,
            normal;
        box-shadow: 0px 0px 4px 0px rgba(160, 170, 199, 0.13);
        border-radius: 4px;
    }

    .grid-content {
        width: 100%;
        height: 30px;
        font-size: 16px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;

        &.left {
            justify-content: flex-start;
        }

    }

}
</style>
