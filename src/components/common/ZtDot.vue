<template>
  <div class="color-cot-component">
    <div class="color-dot" :style="dotStyle" />
    <span v-if="$slots.default" class="color-label" :style="labelStyle">
      <slot />
    </span>
  </div>
</template>

<script>
import { COLOR } from '@/utils/const'

export default {
  props: {
    circle: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: '10px'
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    labelStyle() {
      return {
        'color': this.parsedColor
      }
    },
    dotStyle() {
      const style = {
        'height': this.size,
        'width': this.size,
        'background-color': this.parsedColor
      }
      if (this.circle !== null) {
        style['border-radius'] = this.size
      }
      return style
    },
    parsedColor() {
      return (this.color ? COLOR[this.color.toUpperCase()] : null) || this.color || COLOR.PRIMARY
    }
  }
}
</script>

<style scoped>
.color-dot,
.color-cot-component {
    display: inline-block;
}
.color-label {
    padding-left: 5px;
}
</style>
