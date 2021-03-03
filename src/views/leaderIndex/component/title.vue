<template>
  <div class="data_info_title">
    <span>{{ title }}</span>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }

}
</script>
<style lang="less" scoped>
     .data_info_title {
         width: 100%;
        height: 56px;
        line-height: 56px;
        font-size: 18px;
        color: #4f556e;
        border-bottom: 1px solid #4c8bfd;
        position: relative;
    }
</style>
