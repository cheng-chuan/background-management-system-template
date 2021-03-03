<template>
  <div class="app-container">

    <ZtViewLayout>

      <template #search-left>
        <h4>未落户人口管理列表</h4>
      </template>

      <template #search-right>
        <el-select v-model="searchWord.keyWord_2" size="mini" placeholder="2" style="width:100px;margin-right:10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input size="mini" placeholder="搜索：姓名、身份证号" style="width:150px;margin-right:5px"><el-button slot="append" size="mini">搜索</el-button></el-input>
        <el-button size="mini">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="addPopulation">新增人口</el-button>
        <el-button size="mini" @click="delInfoByIds">批量删除</el-button>
        <el-button size="mini">设置状态</el-button>
        <el-button size="mini">落户</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh-right">刷新</el-button>

      </template>

      <template #main-content>
        <ZtTable
          ref="mytable"
          :table-options="tableOptions"
          @edit="editPopulation"
          @changePage="initTableList"
          @updateList="initTableList({ pageNo: 1, pageSize: 10 })"
        />
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
      @updateList="initTableList({ pageNo: 1, pageSize: 10 })"
    />

  </div>
</template>

<script>
import Dialog from './dialog'
import ZtTable from './ZtTable'
import { getList } from '@/api/information-collection/population/real-population/registered-population'

export default {
  components: {
    Dialog,
    ZtTable
  },
  data() {
    return {
      // 搜索关键词
      searchWord: {},
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
        title: '新增未落户人口',
        dialogType: 'add',
        dialogVisible: false
      },
      editConfig: {
        title: '修改未落户人口',
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
          this.tableOptions.total = res.data.total
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
    editPopulation(row) {
      console.log(row)
      this.editConfig.formData = row
      this.editConfig.dialogVisible = true
    },
    // 批量删除
    delInfoByIds() {
      this.$refs.mytable.delInfos()
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
