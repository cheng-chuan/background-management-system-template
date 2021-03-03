<template>
  <div class="slabel-box">
    <div class="slabel" :style="style">
      <span>{{ lb }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lb: {
      type: String,
      default: '住'
    },
    hexColor: {
      type: String,
      default: '#FFC0CB'
    },
    fsize: {
      type: String,
      default: '16'
    }
  },
  computed: {
    style() {
      return {
        height: `${1 * this.fsize + 10}px`,
        width: `${1 * this.fsize + 10}px`,
        'font-size': `${this.fsize}px`,
        'line-height': `${this.fsize}px`,
        'border-color': `${this.hexColor}`,
        'background-color': `${this.hexColor.rgba(0.1)}`
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.slabel-box {
  display: inline-block;
}
.slabel {
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid pink;
}
</style>
