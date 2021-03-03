<template>
  <div v-loading="loading || tableLoading" class="zt-table" :style="height?`height:${height}`:''">
    <!-- 列管理器 -->
    <el-popover v-if="columnEdit" class="column-selector" placement="bottom" trigger="click">
      <div class="column-selector-list">
        <div class="col-sec-item">
          <el-link @click="selectAllColumns">全选</el-link> |
          <el-link @click="selectInvertColumns">反选</el-link> |
          <el-link @click="selectNoneColumns">全不选</el-link>
        </div>
        <hr>
        <div v-for="(col, index) in tableColumns" :key="index" class="col-sec-item">
          <el-checkbox v-model="col.visible">{{ col.label }}</el-checkbox>
        </div>
      </div>
      <el-button slot="reference" class="column-selector-btn" type="text" icon="el-icon-plus" />
    </el-popover>

    <!-- 列表 -->
    <el-table
      ref="mytable"
      class="zt-table-list"
      size="mini"
      height="calc(100% - 42px)"
      :header-cell-style="{'background-color':'#FAFAFA',color:'black'}"
      :data="pagedLIst"
      style="width: 100%"
      v-on="$listeners"
    >
      <!-- 通用列 -->
      <el-table-column v-if="showSelection" type="selection" width="42" align="center" fixed />
      <el-table-column v-if="showIndex" type="index" width="50" label="序号" align="center" fixed />

      <!-- 操作列 -->
      <el-table-column v-if="operations && operations.length > 0" label="操作" :width="operationsColWidth" fixed>
        <template #default="scope">
          <el-tooltip
            v-for="(item, index) in operations"
            v-show="isShow(item,scope.row)"
            :key="index"
            placement="top"
            effect="dark"
            :content="item.tooltip"
            :disabled="!item.tooltip"
          >
            <el-button
              :class="`operate-text-btn${item.hasOwnProperty('danger') && item.danger?' danger':''}`"
              :icon="item.icon"
              size="mini"
              type="text"
              @click="excuRowOperate(item, scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>

      <!-- 字段列 -->
      <el-table-column v-for="(col, index) in visibleColumn" :key="index" v-bind="col" :show-overflow-tooltip="showOverflowTooltip">
        <!-- 自定义 tamplate 插槽 允许使用者自定义单元格所有内容 -->
        <template v-if="$slots[`formatter-${col.prop}`] || $scopedSlots[`formatter-${col.prop}`]" #default="scope">
          <slot :row="scope.row" :name="`formatter-${col.prop}`">
            {{ scope.row[col.prop] }}
          </slot>
        </template>
        <!-- 链接样式的内容 -->
        <template v-else-if="col.link !== false && col.handleLink" #default="{row}">
          <el-link type="primary" @click="col.handleLink && col.handleLink(row)">{{ col.formatter ? col.formatter(row) : row[col.prop] }}</el-link>
        </template>
        <!-- 字典内容 -->
        <template v-else-if="col.dictOptions" #default="{row}">
          <ZtDictLabel :custom-options="col.dictOptions" :value="row[col.prop]" />
        </template>
        <template v-else-if="col.dictFdefine" #default="{row}">
          <ZtDictLabel :fdefine="col.dictFdefine" :value="row[col.prop]" />
        </template>
        <template v-else-if="col.dictCode" #default="{row}">
          <ZtDictLabel :code="col.dictCode" :value="row[col.prop]" />
        </template>
      </el-table-column>

      <!-- 空白填充列 -->
      <el-table-column min-width="5" />
    </el-table>

    <div class="page-box">
      <el-pagination
        :background="simplePage === false"
        :current-page="tablePageNumber"
        :page-sizes="[10, 40, 200, 500]"
        :page-size="tablePageSize"
        :layout="simplePage === false ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'"
        :total="tableTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 单元格内容超出 #样式控制
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    // 高度 #样式控制
    height: {
      type: String,
      default: null
    },
    // 分页样式 #样式控制
    simplePage: {
      type: Boolean,
      default: false
    },
    // 列表数据 promise 请求 #内部加载数据
    listPromiseApi: {
      type: Function,
      default: null
    },
    // 请求参数解析器 #内部加载数据
    reqParser: {
      type: Function,
      default: null
    },
    // 响应参数解析器 #内部加载数据
    resParser: {
      type: Function,
      default: null
    },
    // 加载动画 #外部加载数据
    loading: {
      type: Boolean,
      default: false
    },
    // 调用外部方法重新加载列 #外部加载数据
    reloadListData: {
      type: Function,
      default: null
    },
    // 总条数 #外部加载数据
    total: {
      type: Number,
      default: 100
    },
    // 页码 #外部加载数据
    pageNumber: {
      type: Number,
      default: 1
    },
    // 每页条数 #外部加载数据
    pageSize: {
      type: Number,
      default: 10
    },
    // 是否可列显隐 #样式控制
    columnEdit: {
      type: Boolean,
      default: true
    },
    // 列表数据 #外部加载数据 #前端分页
    listData: {
      type: Array,
      default: () => ([])
    },
    // 列表数据 #前端分页
    fpage: {
      type: Boolean,
      default: false
    },
    // 字段列 #样式控制
    columns: {
      type: Array,
      default: () => ([])
    },
    // 显示多选框 #样式控制
    showSelection: {
      type: Boolean,
      default: true
    },
    // 显示序号 #样式控制
    showIndex: {
      type: Boolean,
      default: true
    },
    // 操作列按钮 #样式控制
    operations: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      tableColumns: this.columns.map(item => ({
        ...item,
        visible: item.visible !== false
      })),
      tableData: this.listData,
      tablePageNumber: this.pageNumber,
      tablePageSize: this.pageSize,
      tableTotal: this.total,
      tableLoading: false
    }
  },
  computed: {

    // 分页的列表
    pagedLIst() {
      if (!this.tableData || this.tableData.length === 0) return
      if (this.requireFrontPage()) {
        const page = this.tablePageNumber
        const size = this.tablePageSize
        return this.tableData.slice((page - 1) * size, page * size)
      } else {
        return this.tableData
      }
    },
    // 计算操作列宽度
    operationsColWidth() {
      let width
      if (!this.operations || this.operations.length === 0) {
        width = 0
      } else if (this.operations.length === 1) {
        width = 16 + 20
      } else {
        width = (16 + 5) * (this.operations.length - 1) + 16 + 20
      }
      width = Math.max(width, 44)
      // 5个像素余量，避免某些浏览器样式解析差别导致换行
      return width + 5
    },
    visibleColumn() {
      return this.tableColumns.filter(item => item.visible !== false)
    }
  },
  watch: {
    // 监听外部数据列表，设置到内部列表
    listData(nval) {
      this.tableData = nval
    },
    // 监听外部分页，设置到内部
    pageNumber(nval) {
      this.tablePageNumber = nval
    },
    // 监听外部分页，设置到内部
    pageSize(nval) {
      this.tablePageSize = nval
    },
    // 监听外部分页，设置到内部
    total(nval) {
      this.tableTotal = nval
    },
    // 重新渲染 el-table 解决添加列后表格错位的问题
    visibleColumn(nval) {
      this.rerender()
    }
  },
  created() {
    this.loadList()
  },
  methods: {
    // 是否需要前端分页
    requireFrontPage() {
      // 指定需要前端分页
      // 无数据加载方式需要前端分页
      if (this.fpage !== false || (!this.reloadListData && !this.listPromiseApi)) {
        this.tableTotal = this.tableData.length
        return true
      }
      // 通过外部或者内部加载
      return false
    },
    // 重新加载数据
    reload() {
      this.loadList()
    },
    // 判断是否需要显示
    isShow(operateConf, row) {
      if (!operateConf.isShow) {
        return true
      } else if (operateConf.isShow(row)) {
        return true
      } else if (!operateConf.isShow(row)) {
        return false
      }
    },
    // 执行列表按钮操作
    excuRowOperate(operateConf, row) {
      if (operateConf.danger) {
        const messageConf = operateConf.message
        let messageText
        if (typeof messageConf === 'function') {
          messageText = messageConf(row)
        } else if (typeof messageConf === 'string') {
          messageText = messageConf
        } else {
          messageText = '危险操作'
        }
        this.$confirm(`${messageText} , 是否继续?`, '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          operateConf.method && operateConf.method(row)
        })
      } else {
        operateConf.method && operateConf.method(row)
      }
    },
    // 加载列表
    loadList() {
      // 优先调用外部加载
      if (this.reloadListData) {
        this.reloadListData && this.reloadListData()
      } else if (this.listPromiseApi && this.reqParser && this.resParser) {
        // 其次使用内部加载
        this.tableLoading = true
        this.listPromiseApi(this.reqParser(this.tablePageNumber, this.tablePageSize)).then(res => {
          const resInfo = this.resParser(res)
          if (resInfo && Object.prototype.hasOwnProperty.call(resInfo, 'total') && Object.prototype.hasOwnProperty.call(resInfo, 'rows')) {
            this.tableTotal = resInfo.total || 0
            this.tableData = resInfo.rows || []
          } else {
            this.$message.info('未解析的参数 [rows,total]')
          }
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = true
        })
      } else if (this.tableData && this.tableData.length > 0) {
        // 仅直接展示 listData
      } else {
        console.warn('ZtTable without porps: reloadListData | [listPromiseApi & reqParser & resParser] | listData, wait data update')
      }
    },
    // 每一页条数变化
    handleSizeChange(val) {
      this.tablePageSize = val
      this.$emit('update:pageSize', val)
      this.loadList()
    },
    // 页数变化
    handleCurrentChange(val) {
      this.tablePageNumber = val
      this.$emit('update:pageNumber', val)
      this.loadList()
    },
    // 重新渲染
    rerender() {
      this.$nextTick(() => {
        if (this.$refs.mytable) {
          this.$refs.mytable.doLayout()
        }
      })
    },
    // 全选
    selectAllColumns() {
      this.tableColumns.forEach(ele => {
        ele.visible = true
      })
    },
    // 全不选
    selectNoneColumns() {
      this.tableColumns.forEach(ele => {
        ele.visible = false
      })
    },
    // 反选
    selectInvertColumns() {
      this.tableColumns.forEach(ele => {
        ele.visible = !ele.visible
      })
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .operate-text-btn {
  padding: 0;
  font-size: 16px;
  line-height: 20px;
  border-width: 0;
  &.danger {
    color: #F78989;
  }
}

.zt-table {
  position: relative;
  height: 100%;
  width: 100%;
}
.page-box {
  padding: 5px;
  text-align: right;
}

.column-selector {
  .column-selector-btn {
    width: 17px;
    position: absolute;
    right: 0;
    padding: 10px 0px;
    z-index: 10;
    color: black;
    background-color: #f1f1f1;
    border-radius: 0;
    &:hover {
      background-color: #dfdfdf;
    }
  }
}
::v-deep .gutter{
  background-color: #FAFAFA;
}
.column-selector-list {
  .col-sec-item {
    height: 26px;
    line-height: 26px;
  }
}

// el-link 样式配置
::v-deep .el-link--inner {
  font-size: 12px;
}
::v-deep .el-link.is-underline:after {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	height: 0;
	bottom: 0;
	border-bottom: 1px solid #409EFF
}
::v-deep .el-link.el-link--primary.is-underline:after {
	border-color: #409EFF
}
::v-deep .el-link.el-link--danger.is-underline:after {
	border-color: #F56C6C
}
::v-deep .el-link.el-link--success.is-underline:after {
	border-color: #67C23A
}
::v-deep .el-link.el-link--warning.is-underline:after {
	border-color: #E6A23C
}
::v-deep .el-link.el-link--info.is-underline:after {
	border-color: #909399
}
// el-link 样式配置 结束

.col-sec-item {
  .el-link.is-underline:after {
    border-width: 0;
  }
}
</style>
