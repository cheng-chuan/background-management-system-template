<template>
  <div class="layer-container">

    <!-- 网格选择 -->
    <div v-if="showGridSelect && false" class="l-header" height="40px">
      <ZtGridSelect />
    </div>

    <div class="l-main">
      <!-- 搜索行 -->
      <div class="search-box">
        <div class="search-box-left">
          <!-- <slot name="search-left" /> -->
          <!-- <ZtGridSelect /> -->
        </div>
        <div class="search-box-right">
          <slot name="search-right" />
        </div>
      </div>
      <!-- 操作行 -->
      <div class="operate-box">
        <div class="operate-box-left">
          <slot name="operate-left" />
        </div>
        <div class="operate-box-right">
          <slot name="operate-right" />
        </div>
      </div>
      <!-- 主要内容 -->
      <div v-loading="!rerenderFlag" class="main-content">
        <slot v-if="rerenderFlag" name="main-content" />
      </div>
    </div>

  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    showGridSelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rerenderFlag: true
    }
  },
  created() {
    const thiz = this
    const rerend = debounce(() => {
      thiz.$nextTick(() => {
        this.rerenderFlag = true
      })
    }, 200)
    window.addEventListener('resize', () => {
      thiz.rerenderFlag = false
      rerend()
    })
  }
}
</script>

<style lang='scss' scoped>
@import "~@/styles/variables.scss";

::v-deep .el-button + .el-button {
  margin-left: 0;
  margin-right: 0;
}

.layer-container {
  height: 100%;
  box-shadow: 2px 2px 2px #dddddd;
  border: 1px solid lightgray;
  border-radius: 3px;
  // display: flex;
  // align-items: stretch;
}

.l-main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-basis: 100%;
}

.search-box,
.operate-box {
  background-color: #FAFAFA;
  padding: 5px 10px;
  padding-bottom: 0;
  display: flex;
  justify-content:space-between;
  border-bottom: 1px solid lightgray;
}

.search-box > div,
.operate-box > div {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
}

.search-box-left,
.operate-box-left {
  justify-content: flex-start;
}

.search-box-right,
.operate-box-right {
  justify-content: flex-end;
}

::v-deep .search-box-left > *,
::v-deep .operate-box-left > * {
  margin-right: 5px !important;
}

::v-deep .search-box-right > *,
::v-deep .operate-box-right > * {
  margin-left: 5px !important;
}

::v-deep .search-box > div > *,
::v-deep .operate-box > div > * {
  margin-bottom: 5px !important;
}

::v-deep .search-box-right>.el-input.el-input--mini {
  width: 150px;
}

.main-content {
  // height: calc(100% - 80px);
}

::v-deep .el-button-group .el-dropdown button {
  border-left: 1px solid #DCDFE6;
}

::v-deep .search-box .el-button i,
::v-deep .operate-box .el-button i {
  line-height: 10px;
}

</style>
