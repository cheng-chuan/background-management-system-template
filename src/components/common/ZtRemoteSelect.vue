<template>
  <el-select
    v-model="select"
    v-loading="compLoading"
    filterable
    remote
    :placeholder="placeholder"
    :remote-method="remoteSearch"
    :loading="loading"
    @change="handleChange"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item[labelKey]"
      :value="item[valueKey]"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    remoteInit: {
      type: Function,
      default: null
    },
    // 显示字段
    labelKey: {
      type: String,
      default: 'label'
    },
    // 值字段
    valueKey: {
      type: String,
      default: 'value'
    },
    // 请求解析器
    reqParser: {
      type: Function,
      default: null
    },
    // 响应解析器
    resParser: {
      type: Function,
      default: null
    },
    // 远程查询API
    searchApi: {
      type: Function,
      default: null
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请输入搜索'
    },
    // v-model
    value: {
      type: [String, Number],
      default: null

    }
  },
  data() {
    return {
      select: this.value,
      options: [],
      loading: false,
      compLoading: false
    }
  },
  watch: {
    value(val) {
      this.select = val
    },
    select(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.compLoading = true
        this.remoteInit && this.remoteInit(this.value, opts => {
          this.options = opts || []
          this.compLoading = false
        })
      })
    },
    handleChange(val) {
      const opt = this.options.find(item => item[this.valueKey] === val)
      if (opt) {
        this.$emit('change', opt)
      }
    },
    remoteSearch(query) {
      if (this.searchApi && this.resParser && this.reqParser) {
        this.loading = true
        this.searchApi(this.reqParser(query)).then(res => {
          this.options = this.resParser(res)
          this.loading = false
        })
      }
    }
  }
}
</script>

<style>

</style>
