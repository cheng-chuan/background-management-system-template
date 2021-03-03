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
          prop="qmc"
          label="犬名称"
        />
        <el-table-column
          prop="qzdm"
          label="犬种"
        />
        <el-table-column
          prop="msMc"
          label="毛色"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="qxbdm"
          label="性别"
        />
        <el-table-column
          prop="yqrXm"
          label="养犬人姓名"
        />
        <el-table-column
          prop="yqrSbztdm"
          label="养犬人申办状态"
        />
        <el-table-column
          prop="xcshrqRq"
          label="下次审核日期"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="xzzQhnxxdz"
          label="养犬地址"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="khrXm"
          label="看护人姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="glydh"
          label="检查人"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="glydh"
          label="检查单位"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="glydh"
          label="检查时间"
          :show-overflow-tooltip="true"
        />
      </el-table>
      <el-pagination
        background
        :current-page="pageNo"
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
import { deletesqmyjqxxb } from '@/api/information-collection/dog-infomation/index'

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
      activeName: 'first',
      dialogVisible: false,
      datainsta: {},
      datainstas: {},
      pageSize: 10 || null,
      pageNo: 1
    }
  },
  watch: {
    pageSize() {
      this.pageNo = 1
      // console.log(`当前${this.pageNo}页,当页${this.pageSize}条`)
      this.$emit('changePage', { pageNo: this.pageNo, pageSize: this.pageSize })
      console.log(this.tableOptions)
    },
    pageNo() {
      // console.log(`当前${this.pageNo}页,当页${this.pageSize}条`)
      this.$emit('changePage', { pageNo: this.pageNo, pageSize: this.pageSize })
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
    currentChange(pageNo) {
      this.pageNo = pageNo
    },
    prevChange(pageNo) {
      this.pageNo = pageNo
    },
    nextChange(pageNo) {
      this.pageNo = pageNo
    },
    // 编辑
    handleEdit(index, row) {
      // console.log(index, row)
      this.$emit('edit', row)
    },
    // 查看
    insatlllist(index, row) {
      this.dialogVisible = true
      this.datainsta = row
    },
    handleDelete(index, row) {
      deletesqmyjqxxb(row.xxzjbh).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.$emit('changePage', { pageNo: this.pageNo, pageSize: this.pageSize })
          this.$message.success({
            message: '删除信息成功'
          })
        } else {
          this.$message.error({
            message: '删除信息失败'
          })
        }
      })
    }
  }
}
</script>

<style>
.addres{
  width: 50%;
  float: left;
}

.dialogspan{
  width: 80%;
  margin-left: 10%;
  width: 100%;
  margin-top: 10px;
  height: 20px;
}
</style>
