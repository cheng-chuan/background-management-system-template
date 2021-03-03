<template>
  <div class="app-container">
    <el-container>

      <el-header height="40px">
        <ZtGridSelect />
      </el-header>

      <el-main>

        <div class="search-info">
          <div class="search-info-title">学校管理列表</div>
          <div class="search-info-operator">
            <el-select v-model="searchWord.keyWord_1" size="mini" placeholder="全部" style="width:130px;margin-right:10px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="searchWord.keyWord_2" size="mini" placeholder="现在关注" style="width:100px;margin-right:10px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="searchWord.keyWord_2" size="mini" placeholder="关注程度" style="width:100px;margin-right:10px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input size="mini" placeholder="输入名称" style="width:150px;margin-right:5px"><el-button slot="append" size="mini">搜索</el-button></el-input>
            <el-button size="mini">高级搜索</el-button>
          </div>
        </div>

        <div class="operation-info">
          <div class="search-info-left">
            <el-button size="mini" icon="el-icon-plus" @click="addPopulation">新增场所</el-button>
            <el-button size="mini">批量删除</el-button>
            <el-button size="mini">设置状态</el-button>
            <el-button size="mini">数据认领</el-button>
            <el-button size="mini">绑定标准房屋</el-button>
            <el-button size="mini">周边管理</el-button>
            <el-button size="mini">案（事）件管理</el-button>
            <el-button size="mini">绑定地图</el-button>
            <el-button size="mini">服务管理</el-button>
          </div>
          <div class="search-info-right">
            <el-button size="mini" icon="el-icon-refresh-right">刷新</el-button>
          </div>
        </div>
        <!-- 列表 -->
        <ZtTable ref="mytable" :table-options="tableOptions" @edit="editPopulation" @changePage="initTableList" />
        <!-- 新增弹框 -->
        <Dialog
          :dialog-config="dialogConfig"
          @updateList="initTableList({ pageNo: 1, pageSize: 10 })"
        />
        <!-- 编辑弹框 -->
        <Dialog
          :dialog-config="editConfig"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ZtTable from './ZtTable'
import Dialog from './dialog'

// todo
import { getList } from '@/api/information-collection/population/real-population/registered-population'

export default {
  components: {
    ZtTable,
    Dialog
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
        title: '新增场所',
        dialogType: 'add',
        dialogVisible: false
      },
      editConfig: {
        title: '修改场所',
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
    // 新增残疾人
    addPopulation() {
      this.dialogConfig.dialogVisible = true
    },
    // 编辑残疾人
    editPopulation(row) {
      this.editConfig.formData = row
      this.editConfig.dialogVisible = true
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
