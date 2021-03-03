<template>
  <div class="zt-label" :style="boxStyle">
    <span :style="style">
      <slot />
    </span>
  </div>
</template>

<script>
import { COLOR } from '@/utils/const'

export default {
  props: {
    b: {
      type: Boolean,
      default: false
    },
    s: {
      type: String,
      default: null
    },
    h: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    parsedColor() {
      return (this.color ? COLOR[this.color.toUpperCase()] : null) || this.color || '#606266'
    },
    boxStyle() {
      const style = {}
      if (this.h) style.height = this.h
      if (this.s) style['font-size'] = this.s
      if (this.b !== false) style['font-weight'] = 'bold'
      return style
    },
    style() {
      return {
        color: this.parsedColor
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.zt-label {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
