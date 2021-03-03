<template>
  <span class="zt-npsp" :style="`margin-right:${w}px`" />
</template>

<script>
export default {
  props: {
    w: {
      type: [String, Number],
      default: '5'
    }
  }
}
</script>
