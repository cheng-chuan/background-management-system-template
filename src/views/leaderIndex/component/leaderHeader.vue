<template>
  <div class="leader_header">
    <div class="header_logo">
      <img src="../../../assets/logo.png">
      <span>智慧广陵-社会治理联动平台</span>
    </div>
    <div class="header_time">
      <div class="time">
        <span>{{ cuttentTime | datrfmt('HH:mm:ss') }}</span>
      </div>
      <div class="info">
        <span>{{ cuttentTime | weekrfmt('ddd') }}</span>
        <span>{{ cuttentTime | datrfmt('YYYY-MM-DD') }}</span>
      </div>
    </div>
    <div class="header_info">
      <el-avatar :size="40" :src="userInfo.avatar" @error="errorHandler">
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
      </el-avatar>
      <el-dropdown trigger="click" style="margin-left:15px;cursor:pointer;font-size:16px;color:white">
        <span class="el-dropdown-link">
          {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">

          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      cuttentTime: new Date().getTime()
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {

  },
  methods: {
    // 头像报错
    errorHandler() {
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.leader_header {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    background-image: linear-gradient(0deg,
            #4c8bfd 0%,
            #4ca3fd 100%),
        linear-gradient(#ffffff,
            #ffffff);
    background-blend-mode: normal,
        normal;
    box-shadow: 0px 4px 16px 0px #e7ecf1;

    .header_logo,
    .header_time,
    .header_info {
        flex: 1;
        display: flex;
        height: 100%;
    }

    .header_logo {
        font-size: 30px;
        color: #fffefe;
        display: flex;
        align-items: center;

        img {
            width: 36px;
            height: 36px;
            margin-right: 15px;
        }
    }

    .header_time {
        justify-content: center;
        color: #fff;

        .time {
            height: 100%;
            line-height: 60px;
            font-size: 40px;
        }

        .info {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-left: 15px;
            justify-content: center;
            font-size: 12px;
            line-height: 20px;

        }
    }

    .header_info {
        justify-content: flex-end;
        align-items: center;
    }

}
</style>
