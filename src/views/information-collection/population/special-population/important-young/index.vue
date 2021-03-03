<template>
  <div class="app-container">

    <ZtViewLayout>

      <template #search-left>
        <h4>重点青少年管理列表</h4>
      </template>

      <template #search-right>
        <el-select v-model="searchWord.keyWord_1" size="mini" placeholder="1" style="width:130px;margin-right:10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div style="width:70px;font-size:14px">人员类型：</div>
        <el-input size="mini" placeholder="" style="width:100px;margin-right:10px" />
        <el-select v-model="searchWord.keyWord_2" size="mini" placeholder="2" style="width:100px;margin-right:10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input size="mini" placeholder="搜索：姓名、身份证号..." style="width:220px;margin-right:5px"><el-button slot="append" size="mini">搜索</el-button></el-input>
        <el-button size="mini">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="addPopulation">新增人口</el-button>
        <el-button size="mini" @click="delByIds">批量删除</el-button>
        <el-button size="mini" disabled>设置状态</el-button>
        <el-button size="mini" disabled>数据认领</el-button>
        <el-button size="mini" disabled>转化</el-button>
        <el-button size="mini" disabled>服务管理</el-button>
        <el-button size="mini" disabled>人员接管</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh-right">刷新</el-button>

      </template>

      <template #main-content>
        <ZtTable ref="mytable" :table-options="tableOptions" @selectedDel="getDelSelected" @edit="editPopulation" @changePage="initTableList" @updateList="initTableList({ pageNo: 1, pageSize: 10 })" />

      </template>

    </ZtViewLayout>

    <!-- 新增弹框 -->
    <Dialog
      :dialog-config="dialogConfig"
      @updateList="initTableList({ pageNo: 1, pageSize: 10 })"
    />
    <!-- 编辑弹框 -->
    <Dialog
      :dialog-config="editConfig"
    />
  </div>
</template>

<script>
import ZtTable from './ZtTable'
import Dialog from './dialog'

import { getList, delYoungInfos } from '@/api/information-collection/population/special-population/important-young'

export default {
  components: {
    ZtTable,
    Dialog
  },
  data() {
    return {
      // 搜索关键词
      searchWord: {},
      mulSelectedIds: [],
      options: [
        {
          label: '1',
          value: '1'
        }
      ],
      tableOptions: {
        showIndex: false,
        showSelection: true,
        total: null,
        tableDataList: []
      },
      dialogConfig: {
        title: '新增重点青少年',
        dialogType: 'add',
        dialogVisible: false
      },
      editConfig: {
        title: '修改重点青少年',
        dialogType: 'edit',
        dialogVisible: false,
        formData: null
      }
    }
  },
  created() {
    this.initTableList({ pageNo: 1, pageSize: 10 })
  },
  methods: {
    initTableList(params) {
      getList(params).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.tableOptions.tableDataList = res.data.datas
          this.total = res.data.total
        } else {
          this.$message.error({
            message: '获取列表失败'
          })
        }
      }).catch(err => {
        console.error('rental-housing-list', err)
      })
    },
    // 新增人口
    addPopulation() {
      this.dialogConfig.dialogVisible = true
    },
    // 编辑人口
    editPopulation(row, row2) {
      this.editConfig.formData = row2
      this.editConfig.youngData = row
      this.editConfig.dialogVisible = true
    },
    // 删除选中列表
    getDelSelected(val) {
      this.mulSelectedIds = val.map(item => item.xxzjbh)
    },
    delByIds() {
      this.delOption(this.mulSelectedIds)
    },
    // 批量删除操作
    delOption(ids) {
      this.$confirm('确定删除选中信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delYoungInfos(ids).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            this.initTableList({ pageNo: 1, pageSize: 10 })
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

<style lang='scss' scoped>
.search-info,
.operation-info  {
  background-color: #FAFAFA;
  height: 40px;
  padding: 5px 10px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
}

.search-info {
  .search-info-title{
    font-size: 16px;
  }
  .search-info-operator{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.table-header {
  position: absolute;
}

</style>
