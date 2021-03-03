<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>学校管理列表</h4>
      </template>

      <template #search-right>
        <el-input v-model="searchName" placeholder="搜索" size="mini" />
        <el-button size="mini" @click="loadList">搜索</el-button>
        <el-button size="mini" @click="$message.info('高级搜索')">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="addInfo">新增</el-button>
        <el-button size="mini" icon="el-icon-minus" @click="delInfos">批量删除</el-button>
        <el-button size="mini" disabled>设置状态</el-button>
        <el-button size="mini" disabled>数据认领</el-button>
        <el-button size="mini" disabled>绑定标准房屋</el-button>
        <el-button size="mini" disabled>周边管理</el-button>
        <el-button size="mini" disabled>案（事）件管理</el-button>
        <el-button size="mini" disabled>绑定地图</el-button>
        <el-button size="mini" disabled>服务管理</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh" @click="$message.info('刷新')">刷新</el-button>
      </template>

      <!-- 主要内容 -->
      <template #main-content>
        <!-- 列表 -->
        <ZtTable ref="mytable" v-bind.sync="tableOptions" @selection-change="changeSelected">
          <template #formatter-shzldm="{row}">
            <ZtDictLabel code="DM01492" :value="row.shzldm" />
          </template>
          <template #formatter-jkzkdm="{row}">
            <ZtDictLabel code="LM10006" :value="row.jkzkdm" />
          </template>
          <template #formatter-shzlnldm="{row}">
            <ZtDictLabel code="DM01500" :value="row.shzlnldm" />
          </template>
          <template #formatter-jzzkdm="{row}">
            <ZtDictLabel code="DM01504" :value="row.jzzkdm" />
          </template>
          <template #formatter-xcjgdm="{row}">
            <ZtDictLabel code="LM00019" :value="row.xcjgdm" />
          </template>
        </ZtTable>
        <!-- 列表结束 -->
      </template>
      <!-- 主要内容结束 -->

    </ZtViewLayout>
    <AddDialog :dialog-config="dialogConfig" @updateList="loadList" />
  </div>
</template>

<script>
import { getPage, delInfo, delInfos } from '@/api/information-collection/unit/school'

import AddDialog from './addDialog'

export default {
  components: {
    AddDialog
  },
  data() {
    return {
      searchName: null,
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
          return { pageNo: pageNumber, pageSize: pageSize, searchName: this.searchName }
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
          message: '此操作将删除当前学校记录'
        },
        {
          icon: 'el-icon-edit',
          danger: true,
          method: this.editRow,
          message: '此操作将修改当前学校记录'
        }],
        columns: [{
          prop: 'gzcddm',
          label: '关注程度',
          width: '150',
          dictCode: 'DM01474'
        }, {
          prop: 'xuxDwmc',
          label: '学校名称',
          width: '150'
        }, {
          prop: 'xzXm',
          label: '主要负责人',
          width: '150'
        }, {
          prop: 'fgabzrrXm',
          label: '分管治保负责人',
          width: '150'
        }, {
          prop: 'zbrs',
          label: '治保人数',
          width: '150'
        }, {
          prop: 'xgsj',
          label: '最新服务时间',
          width: '150'
        }, {
          prop: 'xuxQhnxxdz',
          label: '学校地址',
          width: '150'
        }, {
          prop: '',
          label: '是否绑定标准房屋',
          width: '150'
        }]
      }
    }
  },
  methods: {
    loadList() {
      this.$refs.mytable.reload()
    },
    addInfo() {
      this.dialogConfig.title = '新增场所'
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
      this.dialogConfig.title = '编辑场所'
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
