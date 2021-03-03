<template>
  <div class="app-container">
    <!-- <ZtViewLayout> -->

    <!-- <template #search-left>
        <h4>用户列表</h4>
      </template> -->

    <!-- <template #search-right>
        <el-input placeholder="搜索" size="mini" />
        <el-button size="mini" placeholder="请输入宗教堂点名称" @click="loadList">搜索</el-button>
        <el-button size="mini" @click="$message.info('高级搜索')">高级搜索</el-button>
      </template>

      <template #operate-left>
        <el-button size="mini" icon="el-icon-plus" @click="addInfo">新增用户</el-button>
        <el-button size="mini" icon="el-icon-minus" @click="delInfos">批量删除</el-button>
        <el-button size="mini" icon="el-icon-user" @click="addRoleInfo">配置角色</el-button>
      </template>

      <template #operate-right>
        <el-button size="mini" icon="el-icon-refresh" @click="$message.info('刷新')">刷新</el-button>
      </template> -->

    <!-- 主要内容 -->
    <!-- <template #main-content> -->
    <div class="panel-container">
      <div class="panel-left">
        <div class="panel-content">
          <el-scrollbar>
            <el-row class="tree-header">
              <el-button-group class="tree-header-group">
                <el-button class="tree-header-group-btns" size="big" type="normal" icon="el-icon-folder-add" @click="createRootNode">新增根级分类</el-button>
              </el-button-group>
            </el-row>
            <el-tree
              highlight-current
              :data="ModuleData"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :props="defaultProps"
            >
              <span slot-scope="{ node, data }" class="data-element-tree-node">
                <span style="width:145px" @click="handleNodeClick(node,data)"><i :class="data.icon" />&nbsp;&nbsp;{{ data.name }}</span>
                <span>
                  <el-button-group>
                    <el-tooltip effect="dark" content="追加" placement="top-end">
                      <el-button type="text" @click="append(data)"><i class="el-icon el-icon-folder-add" /></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="删除" placement="top-start">
                      <el-button type="text" @click="remove(data,node)"><i class="el-icon el-icon-delete" /></el-button>
                    </el-tooltip>
                  </el-button-group>
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </div>
      </div>

      <div class="panel-main">
        <div class="panel-content">
          <el-scrollbar>
            <el-form v-show="rightShow" ref="form" class="menuform" :model="form" label-width="120px" :rules="rules">
              <el-form-item label="菜单名称" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="上级菜单：">
                <el-input v-model="form.parentName" :disabled="true" />
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="form.menuType" placeholder="请选择类型">
                  <el-option label="菜单" value="1" />
                  <el-option label="按钮" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="权限标识" prop="permission">
                <el-input v-model="form.permission" disabled />
              </el-form-item>
              <el-form-item v-if="form.menuType !=='2'" label="页面组件" prop="component">
                <el-input v-model="form.component" />
              </el-form-item>
              <el-form-item v-if="form.menuType !=='2'" label="路由地址" prop="url">
                <el-input v-model="form.url" />
              </el-form-item>
              <el-form-item label="icon">
                <el-select v-model="form.icon" placeholder="请选择图标">
                  <el-option
                    v-for="item in iconList"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    <span style="float: left"><i :class="item" /></span>
                    <span style="float:right; width:135px">{{ item }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remark" type="textarea" />
              </el-form-item>
              <el-form-item label="排序">
                <el-input v-model="form.sortNum" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">{{ btnName }}</el-button>
                <el-button type="primary" @click="clearForm">清空</el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <!-- </template> -->
    <!-- 主要内容结束 -->

    <!-- </ZtViewLayout> -->
  </div>
</template>

<script>
import { getModule, deleteMenu, addMenu, modify, getModuleById } from '@/api/system-maintenance/menu-maintenance'

export default {
  data() {
    return {
      changeMenuType: null,
      btnName: '提交',
      iconList: [
        'el-icon-platform-eleme',
        'el-icon-eleme',
        'el-icon-delete-solid',
        'el-icon-delete',
        'el-icon-s-tools',
        'el-icon-setting',
        'el-icon-user-solid',
        'el-icon-user',
        'el-icon-phone',
        'el-icon-phone-outline',
        'el-icon-more',
        'el-icon-more-outline',
        'el-icon-star-on',
        'el-icon-star-off',
        'el-icon-s-goods',
        'el-icon-goods',
        'el-icon-warning',
        'el-icon-warning-outline',
        'el-icon-question',
        'el-icon-info',
        'el-icon-remove',
        'el-icon-circle-plus',
        'el-icon-success',
        'el-icon-error',
        'el-icon-zoom-in',
        'el-icon-zoom-out',
        'el-icon-remove-outline',
        'el-icon-circle-plus-outline',
        'el-icon-circle-check',
        'el-icon-circle-close',
        'el-icon-s-help',
        'el-icon-help',
        'el-icon-minus',
        'el-icon-plus',
        'el-icon-check',
        'el-icon-close',
        'el-icon-picture',
        'el-icon-picture-outline',
        'el-icon-picture-outline-round',
        'el-icon-upload',
        'el-icon-upload2',
        'el-icon-download',
        'el-icon-camera-solid',
        'el-icon-camera',
        'el-icon-video-camera-solid',
        'el-icon-video-camera',
        'el-icon-message-solid',
        'el-icon-bell',
        'el-icon-s-cooperation',
        'el-icon-s-order',
        'el-icon-s-platform',
        'el-icon-s-fold',
        'el-icon-s-unfold',
        'el-icon-s-operation',
        'el-icon-s-promotion',
        'el-icon-s-home',
        'el-icon-s-release',
        'el-icon-s-ticket',
        'el-icon-s-management',
        'el-icon-s-open',
        'el-icon-s-shop',
        'el-icon-s-marketing',
        'el-icon-s-flag',
        'el-icon-s-comment',
        'el-icon-s-finance',
        'el-icon-s-claim',
        'el-icon-s-custom',
        'el-icon-s-opportunity',
        'el-icon-s-data',
        'el-icon-s-check',
        'el-icon-s-grid',
        'el-icon-menu',
        'el-icon-share',
        'el-icon-d-caret',
        'el-icon-caret-left',
        'el-icon-caret-right',
        'el-icon-caret-bottom',
        'el-icon-caret-top',
        'el-icon-bottom-left',
        'el-icon-bottom-right',
        'el-icon-back',
        'el-icon-right',
        'el-icon-bottom',
        'el-icon-top',
        'el-icon-top-left',
        'el-icon-top-right',
        'el-icon-arrow-left',
        'el-icon-arrow-right',
        'el-icon-arrow-down',
        'el-icon-arrow-up',
        'el-icon-d-arrow-left',
        'el-icon-d-arrow-right',
        'el-icon-video-pause',
        'el-icon-video-play',
        'el-icon-refresh',
        'el-icon-refresh-right',
        'el-icon-refresh-left',
        'el-icon-finished',
        'el-icon-sort',
        'el-icon-sort-up',
        'el-icon-sort-down',
        'el-icon-rank',
        'el-icon-loading',
        'el-icon-view',
        'el-icon-c-scale-to-original',
        'el-icon-date',
        'el-icon-edit',
        'el-icon-edit-outline'
      ],
      ModuleData: [],
      menuVisible: false,
      defaultProps: {
        children: 'sonBeanList',
        label: 'name',
        value: 'id'
      },
      // enable: false,
      rightShow: false,
      selectData: null,
      module: '',
      parentName: '',
      form: {},
      oldform: {},
      tableData: [],
      rules: {
        name: [
          { required: true, message: '请填写菜单名称', trigger: 'blur' }
        ],
        component: [
          // { required: true, message: '请输入组件路径', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请填写路由', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.getMenuPage()
  },
  methods: {
    // 获取菜单树结构
    getMenuPage() {
      var _this = this
      getModule().then((result) => {
        console.log(result)
        const r = result.data.data ? result.data.data : []
        _this.ModuleData = r
      })
    },
    handleNodeClick(a, b) {
      var _this = this
      console.log(a, b)
      _this.rightShow = true
      _this.btnName = '编辑'
      _this.changeMenuType = 'edit'
      this.selectData = {
        node: a,
        data: b
      }
      this.form = {}
      this.form = b
      this.form.menuType = b.menuType ? b.menuType.toString() : null
      this.oldform = Object.assign({}, b)
      if (b.parentId) {
        this.form.parentName = a.parent.name
        // if (a.sort === 2) {
        //   /* eslint-disable no-global-assign, no-native-reassign */
        //   parent = ''
        // }
        getModuleById(b.parentId).then((result) => {
          const r = result.data.data
          console.log(r)
          _this.rightShow = false
          this.form.parentName = r.name
          _this.rightShow = true
        })
        // getAllButton(b.id).then((result) => {
        //   const r = result.data.data
        //   this.tableData = r instanceof Array && r[0].permissionItemList ? r[0].permissionItemList : []
        // })
      }
    },
    // 新增根级分类
    createRootNode() {
      this.form = {}
      this.rightShow = false
      this.rightShow = true
      this.changeMenuType = 'add'
      this.btnName = '新增'
      this.form.menuLevel = 1
    },
    // 新增下级分类
    append(data) {
      console.log(data)
      this.rightShow = false
      this.form = {}
      this.form.parentName = data.name
      this.form.parentId = data.id
      this.form.menuLevel = data.menuLevel + 1
      this.rightShow = true
      this.changeMenuType = 'add'
      this.btnName = '新增'
    },
    // 删除分类
    remove(data, node) {
      console.log(data)
      if (data.parentId && data.parentId !== '0') {
        this.$confirm('删除 [' + data.name + '] 菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // const params = {}
            // params.ids = [data.id]
            deleteMenu(data.id).then((res) => {
              if (res.status === 200 && res.data.code === '000000') {
                this.getMenuPage()
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.rightShow = false
              } else {
                this.$message.warning({
                  message: '删除失败'
                })
              }
            }).catch(() => {
              this.$message.error({
                message: '请求服务失败'
              })
            })
          })
          .catch(() => {})
      } else {
        this.$message.warning('根菜单无法删除')
      }
    },
    // 修改菜单属性
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.changeMenuType === 'add') {
            this.menuAdd()
          } else if (this.changeMenuType === 'edit') {
            this.menuModify()
          }
        } else {
          this.$message.info('请填写必填项')
          return false
        }
      })
    },
    clearForm() {
      this.form = {}
    },
    onCancel() {
      this.form = Object.assign({}, this.oldform)
      this.refreshPer()
    },
    refreshPer() {
      this.handleNodeClick(this.selectData.node, this.selectData.data)
    },
    // 新增菜单
    menuAdd() {
      delete this.form.parentName
      console.log(this.form)
      addMenu(this.form).then((result) => {
        console.log(result)
        if (result.status === 200 && result.data.code === '000000') {
          this.getMenuPage()
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          this.$message.warning({
            message: '添加失败'
          })
        }
      }).catch(() => {
        this.$message.console.error({
          message: '请求服务失败'
        })
      })
    },
    // 修改菜单
    menuModify() {
      delete this.form.parentName
      console.log(this.form)
      // const id = this.form.id
      // const params = {}
      // params.component = this.form.component
      // params.url = this.form.url
      // params.name = this.form.name
      // params.icon = this.form.icon ? this.form.icon : null
      // params.parentId = this.form.parentId ? this.form.parentId : null
      // params.sort = this.form.sort ? this.form.sort : null
      // params.menuType = this.form.menuType ? this.form.menuType : null
      // params.remark = this.form.remark ? this.form.remark : null
      modify(this.form).then((res) => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.getMenuPage()
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        } else {
          this.$message.warning({
            message: '编辑失败'
          })
        }
        // this.refreshPer()
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .panel-common {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 6px;
  }
  .panel-container {
    display: flex;
    width: 100%;
    // height: calc(100% - 50px);
    height: 100%;
    min-height: 500px;
    // padding: 15px;
    box-sizing: border-box;
    &.container-height {
      height: 100%;
    }
    .panel-content {
      height: 100%;
      width: 100%;
      overflow: auto;
      font-size: 14px;
      color: #606266;
    }
    .panel-left {
      width: 360px;
      padding: 10px 5px 10px 10px;
      @extend .panel-common;
    }
    .panel-main {
      @extend .panel-common;
      padding: 15px 10px;
      margin-left: 15px;
      width: calc(100% - 375px);
    }
  }
  .menuform {
        width: 600px;
        margin: 0 auto;
    }

    #rightClickMenu {
        border: 1px solid #f2f2f2;
        .el-menu-item,
        .el-submenu__title {
            height: 34px;
            line-height: 34px;
        }
    }
    .data-element-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .el-icon{
        font-size: 16px;
        padding-left: 5px;
        color: black;
    }
    .tree-header{
        margin-bottom: 5px;
    }
    .tree-header-group{
        width: 100%;
    }
    .tree-header-group-btns{
        padding: 5px;
        width: 100%;
    }
// }
</style>
