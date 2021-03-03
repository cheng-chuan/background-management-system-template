<template>
  <el-select v-model="selectValue" v-loading="loading || sloading" size="mini" :placeholder="placeholder" :style="`width:${width};`" :disabled="$attrs.disabled">
    <el-option v-if="hasnull !== false" value="null" :label="nullLabel" />
    <el-option v-for="opt in options" :key="opt[valueKey]" :value="opt[valueKey]" :label="opt[labelKey]" />
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'
import * as fDefOpt from '@/api/common/dict'

export default {
  props: {
    sloading: {
      type: Boolean,
      default: false
    },
    fdefine: {
      type: String,
      default: null
    },
    customOptions: {
      type: Array,
      default: null
    },
    hasnull: {
      type: Boolean,
      default: false
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
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
      loading: false
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
      // 外部自定义选项
      if (this.customOptions) return this.customOptions
      // 加载前端定义枚举
      if (this.loadFrontDefineDict()) return this.loadFrontDefineDict()
      // 接口加载
      return this.dicoptions[this.code] || fDefOpt[fDefOpt.FCODE_ENUM.DEMO]
    }
  },
  created() {
    this.initOptions()
  },
  methods: {
    // 从前端枚举加载字典项
    loadFrontDefineDict() {
      const fopts = fDefOpt[this.fdefine]
      if (this.fdefine && fopts && fopts.length > 0) return fDefOpt[this.fdefine]
      return null
    },
    // 初始化选项
    async initOptions() {
      // 外部自定义选项
      if (this.customOptions) return
      // 加载前端定义枚举
      if (this.loadFrontDefineDict()) return
      // 接口加载
      if (this.code) {
        this.loading = true
        await this.$store.dispatch('biz/loadOptionsByCode', this.code)
        this.loading = false
        return
      }
      console.warn('ZtDicSelect without porps: code|fdefine|customOptions, load default options')
    }
  }
}
</script>

<style>

</style>
