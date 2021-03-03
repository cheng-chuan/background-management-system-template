<template>
  <el-col :span="span * 1">
    <div class="detail-item-box">

      <div class="detail-label-box" :style="itemLabelStyle">
        <span class="detail-label">{{ label }}</span>
      </div>

      <div class="detail-value-box" :style="itemValueStyle">
        <span v-if="!$scopedSlots.default && f" class="detail-value">
          <ZtDictLabel v-if="code || fdefine" :code="code" :fdefine="fdefine" :value="fchain(model, f)" />
          <span v-else>
            {{ fchain(model, f) || '-' }}
          </span>
        </span>
        <span v-else class="detail-value">
          <slot :model="model" />
        </span>
      </div>

    </div>
  </el-col>
</template>

<script>
const DEFAULT_LABEL_WIDTH = '120px'

export default {
  props: {
    fdefine: {
      type: String,
      default: null
    },
    code: {
      type: String,
      default: null
    },
    f: {
      type: String,
      default: null
    },
    span: {
      type: [String, Number],
      default: '12'
    },
    label: {
      type: String,
      default: null
    },
    lw: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    model() {
      return this.prow && this.prow.model || {}
    },
    itemLabelStyle() {
      return {
        width: this.caculatedLabelWidth + 'px'
      }
    },
    itemValueStyle() {
      return {
        width: `calc(100% - ${this.caculatedLabelWidth}px)`
      }
    },
    caculatedLabelWidth() {
      // 当前组件获取
      if (this.lw) return this.lw
      // 当前组件获取 w80
      const attrs = this.$attrs
      const wkey = Object.keys(attrs).find(att => {
        return /^w[0-9]{2,3}$/.test(att)
      })
      if (wkey) return wkey.replace('w', '')

      // 父组件获取 且指定宽度序号
      const plws = this.prow.labelWidth
      if (plws && plws.length > 0) {
        let currLw = plws.find((ele, index) => {
          return Object.prototype.hasOwnProperty.call(this.$attrs, `lw${index + 1}`)
        })
        if (!currLw) currLw = plws[0]
        return currLw
      }
      // 默认值
      return DEFAULT_LABEL_WIDTH
    },
    prow() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'ZtDetail') {
        parent = parent.$parent
        if (!parent) {
          console.warn("ZtDetailItem can't font parent node 'ZtDetail', use default label-width")
          return {}
        }
        parentName = parent.$options.componentName
      }
      return parent
    }
  }
}
</script>

<style lang='scss' scoped>
.detail-item-box {
  height: 100%;
  display: flex;
  align-items: stretch;
}
.detail-label-box {
  display: inline-block;
  height: 100%;
  align-items: center;
  font-size: 15px !important;
  text-align: right;
  padding-right: 6px;
  border-right: 1px solid lightgray;
}
.detail-value-box {
  display: inline-block;
  height: 100%;
  width: calc(100% - 120px);
  font-size: 15px !important;
  padding-left: 6px;
  border-left: 1px solid lightgray;
  margin-left: -1px;
}
.detail-label,
.detail-value {
  display: inline-block;
  padding: 4px 0;
}
</style>
