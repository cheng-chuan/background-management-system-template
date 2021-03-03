<template>
  <el-container>
    <el-main>
      <el-table
        size="mini"
        :header-cell-style="{'background-color':'#FAFAFA',color:'black'}"
        :data="tableOptions.tableDataList"
        border
        style="width: 100%"
      >
        <el-table-column v-if="tableOptions.showSelection" type="selection" width="55" />
        <el-table-column v-if="tableOptions.showIndex" type="index" width="50" />
        <el-table-column label="操作" width="110">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            />
            <el-button
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="gzcd"
          label="关注程度"
          width="100"
        />
        <el-table-column
          prop="xxmc"
          label="学校名称"
          width="100"
        />
        <el-table-column
          prop="zyfzr"
          label="主要负责人"
        />
        <el-table-column
          prop="fgzbfzr"
          label="分管治保负责人"
        />
        <el-table-column
          prop="zbrs"
          label="治保人数"
        />
        <el-table-column
          prop="zxfwsj"
          label="最新服务时间"
        />
        <el-table-column
          prop="xxdz"
          label="学校地址"
        />
        <el-table-column
          prop="sfbdbzfw"
          label="是否绑定标准房屋"
        />
      </el-table>
      <el-pagination
        background
        :current-page="pageNum"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableOptions.total"
        style="text-align:right;margin:10px auto 0px auto"
        @size-change="sizeChange"
        @current-change="currentChange"
        @prev-click="prevChange"
        @next-click="nextChange"
      />
    </el-main>
  </el-container>
</template>

<script>
export default {
  props: {
    tableOptions: {
      type: Object,
      required: true
    }
    // showIndex: {
    //   type: Boolean,
    //   default: null
    // },
    // showSelection: {
    //   type: Boolean,
    //   default: true
    // },
    // total: {
    //   type: Number,
    //   required: true
    // },
    // tableDataList: {
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      pageSize: 10 || null,
      pageNum: 1
    }
  },
  watch: {
    pageSize() {
      this.pageNum = 1
      // console.log(`当前${this.pageNum}页,当页${this.pageSize}条`)
      this.$emit('changePage', { pageNo: this.pageNum, pageSize: this.pageSize })
      console.log(this.tableOptions)
    },
    pageNum() {
      // console.log(`当前${this.pageNum}页,当页${this.pageSize}条`)
      this.$emit('changePage', { pageNo: this.pageNum, pageSize: this.pageSize })
    }
  },
  methods: {
    sexy(row, column) {
      // console.log(row, column)
      switch (row.xbdm) {
        case '0':
          return '未知性别'
        case '1':
          return '男'
        case '2':
          return '女'
        case '9':
          return '未说明性别'
        default:
          break
      }
    },
    // 分页操作
    sizeChange(pageSize) {
      this.pageSize = pageSize
    },
    currentChange(pageNum) {
      this.pageNum = pageNum
    },
    prevChange(pageNum) {
      this.pageNum = pageNum
    },
    nextChange(pageNum) {
      this.pageNum = pageNum
    },
    // 编辑
    handleEdit(index, row) {
      // console.log(index, row)
      this.$emit('edit', row)
    },
    handleDelete(index, row) {}
  }
}
</script>

<style>

</style>
