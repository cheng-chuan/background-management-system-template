<template>
  <div>
    <app-main v-if="!layoutType" />
    <div v-else class="app-main">
      <div class="app-header">
        <div class="app-header-item app-header-icon" @click="titleClick">
          <span class="platform-title">扬州市广陵区12345平台</span>
        </div>
        <div
          v-if="hasAnyPermissions([`/${MODULE.INDEX}`])"
          :class="`${
            module === MODULE.HOME ? 'active-item' : ''
          } app-header-item app-header-module`"
          @click="openLeaderPage"
        >
          <span class="module-icon">
            <svg-icon icon-class="home-page" />
          </span>
        </div>
        <div v-else style="margin-left: 40px" />

        <div class="model-items-box">
          <div
            v-for="(item, index) in permittedModules"
            :key="index"
            :class="`${
              module === item.module ? 'active-item' : ''
            } app-header-item app-header-module`"
            @click="handleSelectModule(item.module)"
          >
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div :class="classObj" class="app-wrapper">
        <div
          v-if="device === 'mobile' && sidebar.opened"
          class="drawer-bg"
          @click="handleClickOutside"
        />
        <sidebar v-if="module !== MODULE.HOME" class="sidebar-container" />
        <div :class="`main-container ${module === MODULE.HOME ? 'home' : ''}`">
          <div :class="{ 'fixed-header': fixedHeader }">
            <navbar />
          </div>
          <app-main />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { MODULE, hasModule, hasAnyPermissions } from '@/router/module'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      MODULE: {
        ...MODULE
      },
      modules: [
        {
          module: MODULE.INFORMATION_COLLECTION,
          title: '信息采集'
        },
        {
          module: MODULE.ORGANIZATION_TEAM,
          title: '机构队伍'
        },
        {
          module: MODULE.SYSTEM_MAINTENANCE,
          title: '系统维护'
        }
      ]
    }
  },
  computed: {
    permittedModules() {
      // return this.modules.filter((item) =>
      //   hasAnyPermissions([`/${item.module}`])
      // )
      return this.modules
    },
    ...mapGetters(['module', 'layoutType']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    // 解决刷新页面，左侧菜单栏消失的bug
    // console.log(this.$route.path.split('/')[1], this.module)
    if (this.$route.path.split('/')[1] !== MODULE.HOME) {
      this.$store.dispatch('app/switchModule', this.$route.path.split('/')[1])
    }
  },
  methods: {
    titleClick() {
      this.$router.push('/home/dashboard')
      this.$store.dispatch('app/switchModule', 'home')
    },
    hasAnyPermissions: hasAnyPermissions,
    openLeaderPage() {
      window.open(process.env.BASE_URL + 'index', '_blank')
    },
    handleSelectModule(module, jump = true) {
      // if (!hasModule(module)) {
      //   throw new Error("route dosen't exist")
      // }
      // 点击模块仅切换菜单
      this.$store.dispatch('app/switchModule', module)
      if (jump) {
        this.$router.push({
          path: `/${module}`
        })
      }
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', {
        withoutAnimation: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

$headerIconWidth: 280px;

.app-main {
  width: 100%;
}

.app-header {
  height: $headerh;
  display: flex;
  widows: 100;
  background-color: #1f5bac;
}

.app-header-icon {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  padding-left: 40px;
  align-items: center;
  color: white;
  height: $headerh;
  width: $headerIconWidth;
  cursor: pointer;

  .platform-title {
    font-size: 22px;
  }
}

.model-items-box {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  width: calc(100% - #{$headerIconWidth});
  height: calc(20px + #{$headerh});
}

.app-header-module {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: $headerh;
  width: 100px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 10px;
  text-align: center;
  border-left: 1px solid #1f5bac;
  border-right: 1px solid #1f5bac;

  &:hover {
    color: white;
    cursor: pointer;
    background-color: #1f5bac;
  }

  &.active-item {
    color: white;
    // border-color: white;
  }

  .module-icon {
    &:hover {
      background-color: #5e82b4;
    }

    background-color: #3168b6;
    border-radius: 3px;
    color: white;
    font-size: 20px;
    padding: 5px;
    width: 30px;
  }
}

.sidebar-container {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.2);
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: calc(100% - #{$headerh});
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
