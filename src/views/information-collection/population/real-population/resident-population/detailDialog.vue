<template>
  <el-dialog
    :title="detailDialogConfig.title"
    :visible.sync="detailDialogConfig.dialogVisible"
    width="width"
    style="padding:0"
    :close-on-click-modal="false"
    @open="open"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form ref="detailForm" :model="detailDialogConfig.detailForm" label-width="100px">
          <el-row :gutter="24">
            <el-col :span="18">
              <el-row :gutter="24">
                <el-col :span="24" style="height:40px">
                  <el-form-item label="所属网格：">
                    {{ detailDialogConfig.detailForm.sswg }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12" style="height:40px">
                  <el-form-item label="姓名：">
                    {{ detailDialogConfig.detailForm.xm }}
                  </el-form-item>
                </el-col>
                <el-col :span="12" style="height:40px">
                  <el-form-item label="身份证号：">
                    {{ detailDialogConfig.detailForm.gmsfhm }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12" style="height:40px">
                  <el-form-item label="曾用名/别名：">
                    {{ detailDialogConfig.detailForm.cym }}
                  </el-form-item>
                </el-col>
                <el-col :span="12" style="height:40px">
                  <el-form-item label="性别：">
                    {{ getCodeToChinese('DM01058',detailDialogConfig.detailForm.xbdm) }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12" style="height:40px">
                  <el-form-item label="出生日期：">
                    {{ detailDialogConfig.detailForm.csrq }}
                  </el-form-item>
                </el-col>
                <el-col :span="12" style="height:40px">
                  <el-form-item label="民族：">
                    {{ getCodeToChinese('DM00039',detailDialogConfig.detailForm.mzdm) +'族' }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12" style="height:40px">
                  <el-form-item label="联系方式：">
                    {{ detailDialogConfig.detailForm.lxdh }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" style="height:40px">
              <div style="width:100px;height:150px;border:1px solid black;">
                <img src="" alt="">
              </div>
            </el-col>
          </el-row>
          <hr>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="政治面貌：">
                {{ getCodeToChinese('DM01106',detailDialogConfig.detailForm.zzmmdm) }}
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height:40px">
              <el-form-item label="文化程度：">
                {{ getCodeToChinese("DM01101",detailDialogConfig.detailForm.xldm) }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="婚姻状况：">
                {{ getCodeToChinese("DM01102",detailDialogConfig.detailForm.hyzkdm) }}
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height:40px">
              <el-form-item label="宗教信仰：">
                {{ getCodeToChinese("DM01053",detailDialogConfig.detailForm.zjxydm) }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="职业：">
                {{ getCodeToChinese('DM01083',detailDialogConfig.detailForm.zy) }}
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height:40px">
              <el-form-item label="工作单位：">
                {{ detailDialogConfig.detailForm.zylbdm }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="户籍地：">
                {{ detailDialogConfig.detailForm.hzd }}
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height:40px">
              <el-form-item label="籍贯：">
                {{ detailDialogConfig.detailForm.jgssxdm }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="数据来源：">
                {{ detailDialogConfig.detailForm.sjly }}
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height:40px">
              <el-form-item label="是否死亡：">
                {{ detailDialogConfig.detailForm.sfswdm }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="户籍地详址：">
                {{ detailDialogConfig.detailForm.hzdxz }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="现居详址：">
                {{ detailDialogConfig.detailForm.xjxxdz }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="名下机动车辆：" label-width="110px">
                {{ detailDialogConfig.detailForm.mxjdzl }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12" style="height:40px">
              <el-form-item label="备注：">
                {{ detailDialogConfig.detailForm.bz }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="轨迹信息">
        <el-table
          :data="detailDialogConfig.detailForm.tableList"
          style="width: 100%"
        >
          <el-table-column
            prop="prop"
            label="时间"
            width="width"
          />
          <el-table-column
            prop="prop"
            label="操作账号"
            width="width"
          />
          <el-table-column
            prop="prop"
            label="操作详情"
            width="width"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" style="padding-top:0">
      <el-button type="normal" @click="detailDialogConfig.dialogVisible = false">关闭</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    detailDialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['dicoptions'])

  },
  methods: {
    getCodeToChinese(code, str) {
      // console.log(this.dicoptions[code] instanceof Array)
      for (const i in this.dicoptions[code]) {
        if (this.dicoptions[code][i].value === str) {
          return this.dicoptions[code][i].label
        }
      }
    },
    open() {
      console.log(this.detailDialogConfig.detailForm)
      console.log(this.dicoptions)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
