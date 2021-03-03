<template>
  <div class="navbar">
    <hamburger v-if="module !== 'home'" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click" :hide-on-click="false">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <span class="user-nickname">
            {{ name }}
          </span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item @click="$store.dispatch('app/switchModule', 'home')">
              首页
            </el-dropdown-item>
          </router-link> -->
          <el-dropdown-item @click.native="backHomePage">
            首页
          </el-dropdown-item>
          <el-dropdown-item divided>
            <div class="user-info-item">
              <span>账号：</span>
              <span>{{ fchain(userInfo,'username') || '-' }}</span>
            </div>
            <div class="user-info-item">
              <span>昵称：</span>
              <span>{{ fchain(userInfo,'nickname') || '-' }}</span>
            </div>
            <div class="user-info-item">
              <span>所属：</span>
              <span>{{ fchain(userInfo,'regionname') || '-' }}</span>
            </div>
            <div class="user-info-item">
              <span>网格：</span>
              <span>{{ fchain(userInfo,'ouname') || '-' }}</span>
            </div>
            <div class="user-info-item">
              <span>邮箱：</span>
              <span>{{ fchain(userInfo,'email') || '-' }}</span>
            </div>
            <div class="user-info-item">
              <span>电话：</span>
              <span>{{ fchain(userInfo,'mobile') || '-' }}</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo',
      'name',
      'module'
    ])
  },
  methods: {
    backHomePage() {
      this.$router.push('/')
      this.$store.dispatch('app/switchModule', 'home')
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      location.href = process.env.VUE_APP_LOGIN_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        position: relative;
        align-items: center;

        .user-nickname {
          cursor: pointer;
          font-size: 20px;
          font-weight: 100;
          padding-left: 10px;
          padding-right: 5px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
}

.user-info-item {
  height: 24px;
  line-height: 24px;
}
</style>
