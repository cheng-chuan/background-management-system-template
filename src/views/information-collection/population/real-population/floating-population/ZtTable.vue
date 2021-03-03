<template>
  <el-container>
    <el-main>
      <el-table
        size="mini"
        :header-cell-style="{'background-color':'#FAFAFA',color:'black'}"
        :data="tableOptions.tableDataList"
        border
        style="width: 100%"
        @selection-change="selectedChange"
      >
        <el-table-column v-if="tableOptions.showSelection" type="selection" width="55" />
        <el-table-column v-if="tableOptions.showIndex" type="index" width="50" />
        <el-table-column label="操作" width="120">
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
          prop="xm"
          label="姓名"
          width="100"
        />
        <el-table-column
          prop="xbdm"
          label="性别"
          width="80"
          :formatter="sexy"
        />
        <el-table-column
          label="身份证号"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.gmsfhm | IdFormate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lxdh"
          label="联系方式"
        />
        <el-table-column
          prop="telephone"
          label="最新服务时间"
        />
        <el-table-column
          prop="xgsj"
          label="数据更新时间"
          :show-overflow-tooltip="true"
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
import { deleteRegisteredPopulation, getRegisteredPopulationZFList } from '@/api/information-collection/population/real-population/floating-population'

export default {
  props: {
    tableOptions: {
      type: Object,
      required: true
    }
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
      getRegisteredPopulationZFList(row.xxzjbh).then(res => {
        row.houseList = res.data.datas
        this.$emit('edit', row)
      })
    },
    // 单行删除操作
    handleDelete(index, row) {
      this.$confirm('是否删除信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.delByIds([row.xxzjbh])
      }).catch(() => {
        this.$message.info({
          message: '已取消删除'
        })
      })
    },
    // row选择操作
    selectedChange(val) {
      this.mulSelectionIds = val instanceof Array ? val.map(item => {
        return item.xxzjbh
      }) : []
    },
    // 批量删除
    delInfos() {
      this.$confirm('是否删除所选信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.delByIds(this.mulSelectionIds)
      }).catch(() => {
        this.$message.info({
          message: '已取消删除'
        })
      })
    },
    // 删除方法
    delByIds(arr) {
      deleteRegisteredPopulation(arr).then(res => {
        this.$emit('updateList')
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.$message.success({
            message: '删除成功'
          })
        } else {
          this.$message.error({
            message: '删除失败'
          })
        }
      }).catch(() => {
        this.$message.error({
          message: '服务请求失败'
        })
      })
    }

  }
}
</script>

<style>

</style>
