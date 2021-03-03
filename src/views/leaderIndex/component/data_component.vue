<template>
  <div class="data_info_list">
    <div class="data_info_img">
      <img src="../../../assets/icon_head.png">
    </div>
    <div class="data_info_content">
      <p class="data_info_content_title">
        <span>{{ title }}</span>
        <img v-if="Number(value1) - Number(value2) > 0" src="../../../assets/up.png">
        <img v-if="Number(value1) - Number(value2) < 0" src="../../../assets/down.png">
      </p>
      <p class="data_info_content_info">
        <span>{{ value1 }}件</span>
        <span> <span style="color:#999999">占比:</span> {{ value2 }}%</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value1: {
      type: String,
      default: ''
    },
    value2: {
      type: String,
      default: ''
    },
    value3: {
      type: String,
      default: ''
    }

  }
}
</script>
<style lang="less" scoped>
    .data_info_list{
     width: 100%;
     height: 100%;
      background-color: #f5f7fa;
      border-radius: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
        .data_info_img{
            width: 48px;
            height: 100%;
            padding-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 48px;
                height: 48px;
                border-radius: 10px;
                display: block;
            }
        }
        .data_info_content{
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
              color: #3e94ed;
            p{
                width: 100%;
                // flex: 1;
                line-height: 30px;
                font-size: 16px;
                margin: 0;
                padding:0;
            }
            .data_info_content_title{
                font-size: 16px;

                img{
                    width: 9px;
                    height: 12px;
                    margin-left: 10px;
                }
            }
            .data_info_content_info{
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
