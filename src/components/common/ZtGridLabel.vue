<template>
  <span>{{ belongingGrid }}</span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },
  computed: {
    belongingGrid() {
      const gridInfos = this.$store.state.biz.gridInfos
      const selectGrids = this.$store.state.biz.grid
      if (gridInfos && selectGrids && selectGrids.length > 0) {
        return selectGrids.map(item => this.fchain(gridInfos[item], 'ouname', '未知网格')).join(' / ')
      } else {
        return ''
      }
    }
  },
  methods: {
    getGridCode() {
      return this.$store.getters.getGridCode
    }
  }
}
</script>

<style>

</style>
