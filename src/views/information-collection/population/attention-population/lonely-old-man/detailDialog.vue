<template>
  <el-dialog
    title="详情"
    :visible.sync="detailConfig.dialogVisible"
    width="width"
    :close-on-click-modal="false"
    @open="open"
    @closed="close"
  >
    <el-form :model="detailFrom">
      <el-row :gutter="23">
        <el-col :span="6">
          <div style="width:100%;height:200px;border:1px grey dashed;display:flex;justify-content:center;align-items:center">
            <div>照&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片</div>
          </div>
        </el-col>
        <el-col :span="17">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="所属网格:">
                <ZtGridLabel />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="9">
              <el-form-item label="身份证:" prop="gmsfhm">
                <span>{{ detailFrom.gmsfhm }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="姓名:" prop="xm">
                <span>{{ detailFrom.xm }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别:" label-width="60px" prop="xbdm">
                <span>{{ detailFrom.xbdm | sexy_chinese }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <hr style="width:99%">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="老人类别:" prop="lrlbdm" label-width="180px">
            <span><ZtDictLabel code="DM01458" :value="detailFrom.lrlbdm" /></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否独生子女家庭:" prop="sfdsznjtPdbz" label-width="180px">
            <span><ZtDictLabel code="DM01117" :value="detailFrom.sfdsznjtPdbz" /></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="离退休前单位_工作性质:" prop="ltxqdwGzxzdm" label-width="180px">
            <span><ZtDictLabel code="DM01476" :value="detailFrom.ltxqdwGzxzdm" /></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="离退休日期:" prop="tlxrqRq" label-width="180px">
            <span>{{ detailFrom.tlxrqRq }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="离退休前单位_职务:" prop="ltxqdwSfhzw" label-width="180px">
            <span>{{ detailFrom.ltxqdwSfhzw }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退休工资_金额:" prop="txgzJe" label-width="180px">
            <span>{{ detailFrom.txgzJe }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="生活照料情况:" prop="shzlqk" label-width="180px">
            <span><ZtDictLabel code="DM01492" :value="detailFrom.shzlqk" /></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="健康状况:" prop="jkzkdm" label-width="180px">
            <span><ZtDictLabel code="DM00146" :value="detailFrom.jkzkdm" /></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="生活自理能力:" prop="shzlnldm" label-width="180px">
            <span><ZtDictLabel code="DM01500" :value="detailFrom.shzlnldm" /></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="居住状况:" prop="jzzkdm" label-width="180px">
            <span><ZtDictLabel code="DM01504" :value="detailFrom.jzzkdm" /></span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="detailConfig.dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  filters: {
    sexy_chinese(val) {
      switch (val) {
        case 0:
          return '未知性别'
        case 1:
          return '男'
        case 2:
          return '女'
        case 9:
          return '未说明性别'
        default:
          break
      }
    }
  },
  props: {
    detailConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      detailFrom: {}
    }
  },
  methods: {
    open() {
      this.detailFrom = this.detailConfig.row ? this.detailConfig.row : {}
    },
    close() {
      this.detailFrom = {}
    }
  }

}
</script>

<style>

</style>
