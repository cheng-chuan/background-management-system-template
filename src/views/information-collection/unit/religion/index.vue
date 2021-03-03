<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>宗教堂点信息管理列表</h4>
      </template>

      <template #search-right>
        <el-input placeholder="搜索" size="mini" />
        <el-button size="mini" placeholder="请输入宗教堂点名称" @click="loadList">搜索</el-button>
        <el-button size="mini" @click="$message.info('高级搜索')">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="addInfo">新增堂点</el-button>
        <el-button size="mini" icon="el-icon-minus" @click="delInfos">批量删除</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh" @click="$message.info('刷新')">刷新</el-button>
      </template>

      <!-- 主要内容 -->
      <template #main-content>
        <!-- 列表 -->
        <ZtTable ref="mytable" v-bind.sync="tableOptions" @selection-change="changeSelected" />
        <!-- 列表结束 -->
      </template>
      <!-- 主要内容结束 -->

    </ZtViewLayout>
    <AddDialog :dialog-config="dialogConfig" @updateList="loadList" />
  </div>
</template>

<script>
import { getPage, delInfo, delInfos } from '@/api/information-collection/unit/religion'

import AddDialog from './addDialog'

export default {
  components: {
    AddDialog
  },
  data() {
    return {
      mulSelectionIds: [],
      // 弹窗配置
      dialogConfig: {
        title: '',
        dialogVisible: false,
        dialogType: '',
        row: {}
      },
      // 表格配置
      tableOptions: {
        listPromiseApi: getPage,
        reqParser: (pageNumber, pageSize) => {
          return { pageNo: pageNumber, pageSize: pageSize }
        },
        resParser: (res) => {
          return {
            total: res.data.total,
            rows: res.data.datas
          }
        },
        showIndex: true,
        showSelection: true,
        operations: [{
          icon: 'el-icon-delete',
          danger: true,
          method: this.deleteRow,
          message: '此操作将删除当前宗教堂点记录'
        },
        {
          icon: 'el-icon-edit',
          danger: true,
          method: this.editRow,
          message: '此操作将修改当前宗教堂点记录'
        }],
        columns: [{
          prop: 'zjtdMc',
          label: '宗教堂点名称',
          width: '100'
        }, {
          prop: 'zjxydm',
          label: '宗教信仰',
          width: '100',
          dictCode: 'DM01053'
        }, {
          prop: 'qhnxxdz',
          label: '堂点地址',
          width: '80'
        }, {
          prop: 'fzrGmsfhm',
          label: '负责人身份证号'
        }, {
          prop: 'fzrXm',
          label: '负责人'
        }, {
          prop: 'fzrLxdh',
          label: '联系电话'
        }, {
          prop: 'cjr',
          label: '创建人'
        }, {
          prop: 'cjrxm',
          label: '创建人姓名'
        }, {
          prop: 'cjrdw',
          label: '创建人单位'
        }, {
          prop: 'cjsj',
          label: '创建时间'
        }, {
          prop: 'xgrXm',
          label: '修改人姓名'
        }, {
          prop: 'xgsj',
          label: '数据更新时间'
        }]
      }
    }
  },
  methods: {
    loadList() {
      this.$refs.mytable.reload()
    },
    addInfo() {
      this.dialogConfig.title = '新增宗教堂点信息'
      this.dialogConfig.dialogType = 'add'
      this.dialogConfig.dialogVisible = true
    },
    // 删除行
    deleteRow(row) {
      delInfo(row.xxzjbh).then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.loadList()
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
    },
    // 编辑行
    editRow(row) {
      console.log(row)
      this.dialogConfig.row = row
      this.dialogConfig.title = '编辑宗教堂点信息'
      this.dialogConfig.dialogType = 'edit'
      this.dialogConfig.dialogVisible = true
    },
    // 批量删除操作
    delInfos() {
      this.$confirm('是否删除所选信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delInfos(this.mulSelectionIds).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.loadList()
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
    },
    // row选择事件
    changeSelected(val) {
      this.mulSelectionIds = val instanceof Array ? val.map(item => {
        return item.xxzjbh
      }) : []
    }

  }
}
</script>

<style>

</style>
