/* eslint-disable vue/require-prop-types */
/* eslint-disable no-unreachable */
<template>
  <el-row class="data_progress_list">
    <el-col :span="3">
      <div class="grid-content">
        <img :src="imgscr" class="sort_img">
        <span v-if="sort > 3" class="sort_num">{{ sort }}</span>
      </div>
    </el-col>
    <el-col :span="21">
      <div class="grid-content-left">
        <span>{{ dataitem.dictName }}</span>
        <el-progress :text-inside="false" :stroke-width="4" :percentage="Number(dataitem.value2)" :show-text="true" />
      </div>
    </el-col>

  </el-row>
</template>

<script>
export default {
  props: {
    dataitem: {
      type: Object,
      default: function() {
        return {}
      },
      required: false

    },
    sort: {
      type: Number,
      default: 1
    }
  },
  computed: {
    imgscr() {
      switch (this.sort) {
        case 1:
          return require('../../../assets/icon_pm_red.png')
        case 2:
          return require('../../../assets/icon_pm_yellow.png')
        case 3:
          return require('../../../assets/icon_pm_blue.png')
        default:
          return require('../../../assets/icon_pm_grey.png')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.data_progress_list {
    width: 100%;
    .grid-content-left{
         width: 100%;
        height: 52px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        span{
            margin: 6px 0 16px;
        }
    }

    .grid-content {
        width: 100%;
        height: 52px;
        font-size: 16px;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .sort_img{
           display: block;
           width: 32px;
           height: 41px;
        }
        .sort_num{
            position: absolute;
            left: 50%;
            top: 44%;
            transform: translate(-50%,-50%);
            font-size: 16px;
            color: #fff;
        }

    }
}
</style>
