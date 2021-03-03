<template>
  <div class="detail-box">
    <slot v-if="model" />
    <div v-else class="no-data-box">
      <span>暂无数据……</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZtDetail',
  componentName: 'ZtDetail',
  props: {
    model: {
      type: Object,
      default: null
    },
    labelWidth: {
      type: Array,
      default: () => [120]
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep {
  .el-row {
    display: flex;
    align-items: stretch;
  }
}
.bottom-line {
  border-bottom: 1px solid lightgray;
}
.top-line {
  border-top: 1px solid lightgray;
}

.no-data-box {
  height: 100px;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.detail-box {
  padding-bottom: 20px;
}
</style>
