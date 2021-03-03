<template>
  <ZtLabel v-loading="loading" color="#606266">{{ dictLabel }}</ZtLabel>
</template>

<script>
import ZtLabel from './ZtLabel'
import { mapGetters } from 'vuex'
import * as fDefOpt from '@/api/common/dict'

export default {
  components: {
    ZtLabel
  },
  props: {
    // 前端定义枚举
    fdefine: {
      type: String,
      default: null
    },
    // 自定义选项
    customOptions: {
      type: Array,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    },
    // 后端加载字典
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
    // 字典值转换
    dictLabel() {
      if (this.value === null || this.value === undefined || this.value === '') return '-'
      // 自定义选项
      if (this.customOptions) {
        const copt = this.customOptions.find(item => item.value === this.value)
        return copt ? copt.label : `未知自定义字典:${this.value}`
      }
      // 加载前端定义枚举
      if (this.hasFrontEnum()) {
        return this.loadFrontDefineDict() ? this.loadFrontDefineDict().label : `未定义项:${this.fdefine}:${this.value}`
      }
      // 后端加载选项
      const option = (this.dicoptions[this.code] || []).find(item => item.value === this.value)
      return option ? option.label : `未知字典:${this.code}:${this.value}`
    },
    // 从vuex 读取字典选项
    ...mapGetters([
      'dicoptions'
    ])
  },
  created() {
    this.initOptions()
  },
  methods: {
    hasFrontEnum() {
      return this.fdefine && this.value !== null && this.value !== undefined && fDefOpt[this.fdefine]
    },
    // 从前端枚举加载字典项
    loadFrontDefineDict() {
      const fcode = this.fdefine
      if (this.value === null || this.value === undefined) return null
      if (fcode === null || fcode === undefined) return null
      const fopts = fDefOpt[fcode]
      if (this.fdefine && fopts && fopts.length > 0) {
        const aaa = fopts.find(item => item.value === this.value)
        return aaa
      }
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
      console.warn('ZtDictLabel without porps: code|fdefine|customOptions, wait data or show default')
    }
  }
}
</script>

<style>

</style>
