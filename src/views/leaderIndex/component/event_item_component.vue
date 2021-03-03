<template>
  <div class="event_items">
    <div class="event_items_img">
      <img v-if="dataitem.dictName =='公共安全'" src="../../../assets/icon_ggaql.png">
      <img v-if="dataitem.dictName =='城市管理'" src="../../../assets/icon_csgl.png">
      <img v-if="dataitem.dictName =='环境保护'" src="../../../assets/icon_hjbh.png">
      <img v-if="dataitem.dictName =='社会治安'" src="../../../assets/icon_shza.png">
      <img v-if="dataitem.dictName =='纠纷调解'" src="../../../assets/icon_jftj.png">
      <img v-if="dataitem.dictName =='专项活动'" src="../../../assets/icon_last.png">
      <span>{{ dataitem.dictName }}</span>
    </div>
    <div class="event_items_num">
      <span>{{ dataitem.value1 }}</span>
      <span class="units">个</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataitem: {
      type: Object,
      default: () => {
        return {
          value1: 0
        }
      },
      required: true
    }
  },
  computed: {
    // imgsrcnew(){
    //     return require(dataitem.imgsrc)
    // }
  },
  mounted() {
    // console.log(dataitem)
  }
}
</script>

<style lang="less" scoped>
.event_items {
    width: 100%;
    background-color: #e2f6ff;
    border-radius: 10px;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;

    .event_items_img {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            display: block;
            width: 40px;
            height: auto;
            margin-right: 10px;
        }
    }

    .event_items_num {
        font-size: 24px;
        color: #2082ff;
        display: flex;
        justify-content: center;
        align-items: center;

        .units {
            font-size: 16px;
            color: #999999;
        }
    }
}
</style>
