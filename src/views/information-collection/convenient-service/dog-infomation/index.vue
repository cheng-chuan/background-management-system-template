<template>
  <div class="app-container">

    <ZtViewLayout>

      <template #search-left>
        <h4>养犬信息列表</h4>
      </template>

      <template #search-right>
        <el-form :inline="true" :model="formInline">
          <el-form-item>
            <el-input v-model="formInline.user" size="mini" placeholder="搜索：标题" />
          </el-form-item>
          <el-form-item>
            <el-button type="mini" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #operate-left>
        <el-button size="mini" @click="addlist">新增信息</el-button>
        <el-button size="mini">批量删除</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini">刷新</el-button>

      </template>

      <template #main-content>
        <ZtTable ref="mytable" :table-options="tableOptions" @edit="editPopulation" @changePage="initTableList" />

      </template>

    </ZtViewLayout>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="55%"
      :before-close="handleClose"
    >
      <div style="height:500px;overflow:auto;padding:0 15px">
        <el-form ref="basicForm" :model="basicForm" :rules="rules" label-width="140px" class="demo-basicForm">
          <el-row :gutter="23">
            <el-col :span="24">
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="所属网格:">
                    <ZtGridLabel />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="养犬人姓名:">
                    <el-input v-model="basicForm.yqrXm" size="small" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="养犬人身份证:">
                    <el-input v-model="basicForm.yqrSfzh" size="small" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="养犬人联系电话:">
                    <el-input v-model="basicForm.yqrLxdh" size="small" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="养犬人微信账号:">
                    <el-input v-model="basicForm.yqrWxTxzh" size="small" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="23">
            <el-col :span="16">
              <el-form-item label="养犬人地址:">
                <el-input v-model="basicForm.xzzQhnxxdz" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="养犬人申办状态:">
                <ZtDicSelect v-model="basicForm.yqrSbztdm" code="LM10019" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="23">
            <el-col :span="24">
              <el-form-item label="不予受理理由:">
                <el-input v-model="basicForm.bysllyXxqk" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="23">
            <el-col :span="8">
              <el-form-item label="登记证号:">
                <el-input v-model="basicForm.djzh" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电子芯片号:">
                <el-input v-model="basicForm.dzxph" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="犬名称:">
                <el-input v-model="basicForm.qmc" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="23">
            <el-col :span="8">
              <el-form-item label="犬种:">
                <ZtDicSelect v-model="basicForm.qzdm" code="LM90120" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="犬种名称:">
                <el-input v-model="basicForm.qzMc" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毛色名称:">
                <el-input v-model="basicForm.msMc" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="犬性别:">
                <ZtDicSelect v-model="basicForm.qxbdm" code="LM90121" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="犬出生日期:">
                <el-date-picker v-model="basicForm.qcsrq" type="datetime" size="mini" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="养犬用途:">
                <ZtDicSelect v-model="basicForm.yqytdm" code="LM90122" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="养犬类别:">
                <ZtDicSelect v-model="basicForm.qxbdm" code="ZT00004" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="准养日期:">
                <el-date-picker v-model="basicForm.zyrqRq" type="datetime" size="mini" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下次审核日期:">
                <el-date-picker v-model="basicForm.xcshrqRq" type="datetime" size="mini" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="狂犬疫苗注释证号:">
                <el-input v-model="basicForm.kqymzszhZjhm" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纯种证书号:">
                <el-input v-model="basicForm.czzshZjhm" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="血统证书号:">
                <el-input v-model="basicForm.xtzshZjhm" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="绝育证明证书号码:">
                <el-input v-model="basicForm.jyzmZjhm" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="看护人姓名:">
                <el-input v-model="basicForm.khrXm" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="看护人身份证号:">
                <el-input v-model="basicForm.khrGmsfhm" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="看护人联系电话:">
                <el-input v-model="basicForm.khrLxdh" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="看护人培训证号:">
                <el-input v-model="basicForm.khrPxzh" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="看护人培训日期:">
                <el-date-picker v-model="basicForm.khrPxrqRq" type="datetime" size="mini" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="看护人培训单位名称:">
                <el-input v-model="basicForm.khrPxdw" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="被处理犬标识:">
                <ZtDicSelect v-model="basicForm.bclqbsPdbz" code="DM01117" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="被处理犬去向:">
                <ZtDicSelect v-model="basicForm.bclqqxdm" code="ZT00005" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="是否注销:">
                <ZtDicSelect v-model="basicForm.sfzxPdbz" code="DM01117" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注销时间:">
                <el-date-picker v-model="basicForm.cxsj" type="datetime" size="mini" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否办理犬类饲养证:">
                <ZtDicSelect v-model="basicForm.sfblqlsyzPdbz" code="DM01117" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="注销原因:">
                <el-input v-model="basicForm.zxyyYy" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subform">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import ZtTable from './ZtTable'
import * as api from '@/api/information-collection/dog-infomation/index'

export default {
  components: {
    ZtTable
  },
  data() {
    return {
      tableOptions: {
        showIndex: false,
        showSelection: true,
        total: null,
        tableDataList: []
      },
      allList: {
        sexyList: [],
        nationList: []
      },
      title: '',
      dialogType: '',
      dialogVisible: false,
      basicForm: {},
      rules: {
        dzmc: [
          { required: true, message: '请输入发生地点', trigger: 'blur' }
        ],
        bt: [
          { required: true, message: '请输入信息标题', trigger: 'blur' }
        ],
        wtlxdm: [
          { required: true, message: '请选择问题类型', trigger: 'change' }
        ],
        cjsj: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个来源类型', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  created() {
    this.initTableList({ pageNo: 1, pageSize: 10 })
  },
  methods: {
    handleClose(done) {
      done()
    },
    onSubmit() {
    },
    initTableList(params) {
      api.getList(params).then(res => {
        console.log(res.data)
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
    subform() {
      if (this.dialogType === 'add') {
        this.basicForm.lx = 1
        api.sqmyjqxxb(this.basicForm).then(res => {
          if (res.status === 200 && res.data.code === '000000') {
            this.dialogVisible = false
            this.initTableList({ pageNo: 1, pageSize: 10 })
            this.$message.success({
              message: '新增列表成功'
            })
          } else {
            this.$message.error({
              message: '新增列表失败'
            })
          }
        })
      } else if (this.dialogType === 'edit') {
        api.putsqmyjqxxb(this.basicForm).then(res => {
          if (res.status === 200 && res.data.code === '000000') {
            this.dialogVisible = false
            this.initTableList({ pageNo: 1, pageSize: 10 })
            this.$message.success({
              message: '修改列表成功'
            })
          } else {
            this.$message.error({
              message: '修改列表失败'
            })
          }
        })
      } else {
        this.$message.error({
          message: '获取列表失败'
        })
      }
    },
    addlist() {
      this.title = '新增养犬信息'
      this.dialogType = 'add'
      this.dialogVisible = true
      this.basicForm = {}
    },
    editPopulation(row) {
      this.title = '修改养犬信息'
      this.dialogType = 'edit'
      this.basicForm = row
      this.dialogVisible = true
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
}
.table-header {
  position: absolute;
}
 .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .el-icon-plus:hover{
      border-color: #409EFF;
  }
  .el-upload-list__item-thumbnail {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item{
    margin-bottom: 8px;
  }

</style>
