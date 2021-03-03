<template>
  <div class="global-grid-select">
    <el-cascader
      v-model="selectedGrid"
      size="mini"
      placeholder="按名称过滤"
      :props="cascaderProps"
      filterable
    />
  </div>
</template>

<script>
import { findGridByPid } from '@/api/common/grid'

export default {
  data() {
    const thiz = this
    return {
      cascaderProps: {
        value: 'ouguid',
        label: 'ouname',
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          findGridByPid(node.data ? node.data.ouguid : null).then(res => {
            resolve(res.data.datas)
            thiz.$store.commit('biz/STORE_GRID_INFO', res.data.datas)
          })
        }
      }
    }
  },
  computed: {
    selectedGrid: {
      get() {
        return this.$store.getters.grid
      },
      set(val) {
        this.$store.commit('biz/SWITCH_GRID', val)
      }
    }
  },
  created() {
    this.initOptions()
  },
  methods: {
    initOptions() {
      if (!this.selectedGrid || this.selectedGrid.length === 0) {
        // 默认值
        this.selectedGrid = ['d9cc42eb-aa03-46f6-ba14-42cec0b689c5', '01e4721a-b0d1-470f-8621-bb84a21e29fb', '7c74f667-1511-4671-be8c-c5b28ece3d1a', '23917e0d-7f61-47ef-b4fe-0047b9fe3da8', 'ce982ebc-11ca-4360-b332-693657f49084']
      }
    }
  }
}
</script>

<style lang="scss">
.global-grid-select {
  height: 28px;
  // box-shadow: 2px 2px 2px #dddddd;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 400px;
  .el-cascader {
    position: relative;
    width: 400px;
    top: -1px;
    left: -1px;
    .el-input__inner {
      // border-top-right-radius: 0;
      // border-bottom-right-radius: 0;
    }
  }
}
</style>
