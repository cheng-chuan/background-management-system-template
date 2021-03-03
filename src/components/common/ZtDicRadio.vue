<template>
  <el-radio-group v-model="selectValue" size="mini" :disabled="$attrs.disabled">
    <el-radio v-for="opt in options" :key="opt.value" :label="opt.value">{{ opt.label }}</el-radio>
  </el-radio-group>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    defaultValue: {
      type: [String, Number],
      default: null
    },
    disableDefault: {
      type: Boolean,
      default: false
    },
    customOptions: {
      type: Array,
      default: null
    },
    hasnull: {
      type: Boolean,
      default: false
    },
    nullLabel: {
      type: String,
      default: '全部'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Number],
      default: null
    },
    width: {
      type: String,
      default: '180px'
    },
    code: {
      type: String,
      default: null
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // v-model
    selectValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    // 从vuex 读取字典选项
    ...mapGetters([
      'dicoptions'
    ]),
    options() {
      if (this.customOptions) return this.customOptions
      return this.dicoptions[this.code] || []
    }
  },
  watch: {
    // 监听选项变化设置可能的默认值
    options(val) {
      this.setDefaultVal()
    }
  },
  created() {
    this.setDefaultVal()
    this.initOptions()
  },
  methods: {
    setDefaultVal() {
      if (this.defaultValue) {
        this.selectValue = this.defaultValue
      }
      if (
        this.disableDefault === false &&
        (!this.selectValue && this.selectValue !== 0) &&
        this.options &&
        this.options.length > 0
      ) {
        this.selectValue = this.options[0].value
      }
    },
    // 初始化选项
    initOptions() {
      if (this.customOptions) return
      if (this.code) {
        this.$store.dispatch('biz/loadOptionsByCode', this.code)
      } else {
        console.error('ZtDicSelect require code')
      }
    }
  }
}
</script>

<style scoped>
::v-deep .el-radio {
  margin-right: 10px;
}
</style>
