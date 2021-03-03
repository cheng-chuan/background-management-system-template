<template>
  <el-container>
    <el-main>
      <el-table
        size="mini"
        :header-cell-style="{'background-color':'#FAFAFA',color:'black'}"
        :data="tableOptions.tableDataList"
        border
        style="width: 100%"
        @select="selected"
        @select-all="selectedAll"
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
          prop="gzcddm"
          label="关注程度"
          width="100"
          :formatter="gzcddm"
        />
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
          prop="sfztdm"
          label="上访状态"
          :formatter="sfztdm"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="sfyyYy"
          label="上访原因"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="telephone"
          label="最新服务时间"
        />
        <el-table-column
          prop="jgzt"
          label="接管状态"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="jgf"
          label="接管方"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="jyxxmc"
          label="接管时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="qxgzyy"
          label="取消关注原因"
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
import { getBasicDetail } from '@/api/information-collection/population/special-population/important-young'
import { delVisitInfo } from '@/api/information-collection/population/special-population/important-visit'
import { getRegisteredPopulationZFList } from '@/api/information-collection/population/real-population/floating-population'

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
    gzcddm(row, column) {
      switch (row.gzcddm) {
        case '1':
          return '高'
        case '2':
          return '中'
        case '3':
          return '低'
        default:
          break
      }
    },
    sfztdm(row, column) {
      switch (row.sfztdm) {
        case '1':
          return '问题已解决'
        case '2':
          return '问题未解决'
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
    // 选中列表
    selected(val) {
      this.$emit('selectedDel', val)
    },
    // 全选列表
    selectedAll(val) {
      this.$emit('selectedDel', val)
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row)
      // getRegisteredPopulationZFList(row.xxzjbh).then(res => {
      //   row.houseList = res.data.datas
      //   getBasicDetail(row.gmsfhm).then(res => {
      //     this.$emit('edit', row, res.data.data)
      //   })
      // })

      getBasicDetail(row.gmsfhm).then(res => {
        if (!res.data.data) {
          console.log(res.data.data)
          this.$message.error('没有该特殊人员的基本信息')
        } else {
          const row2 = res.data.data
          getRegisteredPopulationZFList(row2.xxzjbh).then(res => {
            row2.houseList = res.data.datas
            this.$emit('edit', row, row2)
          })
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('是否删除信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delVisitInfo(row.xxzjbh).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.$emit('updateList')
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
      }).catch(() => {
        this.$message.info({
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>

</style>
