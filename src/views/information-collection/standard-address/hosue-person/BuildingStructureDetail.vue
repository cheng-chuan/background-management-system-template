<template>
  <div>

    <ZtDetail v-loading="loading" :model="detailData" :label-width="[120]">

      <ZtLabel b s="15px">楼宇信息</ZtLabel>
      <hr>

      <el-row>
        <ZtDetailItem label="所属网格" span="24">
          <ZtGridLabel />
        </ZtDetailItem>
      </el-row>

      <el-row>
        <ZtDetailItem label="类型" f="jlxmc" />
      </el-row>
      <el-row>
        <ZtDetailItem label="入住信息" f="zdmc" />
      </el-row>

      <br>
      <br>
      <ZtLabel b s="15px">房屋信息</ZtLabel>
      <hr>
      <ZtTable ref="mytable" v-bind.sync="tableOptions" simple-page>
        <template #formatter-tags="{row}">
          <span v-for="(tag, index) in row.tags" :key="index">
            <SquareLabel :hex-color="colorSeq(index)" :lb="tag" />
            <ZtNbsp />
          </span>
        </template>
      </ZtTable>

    </ZtDetail>

    <el-dialog append-to-body v-bind="detailDialog" :visible.sync="detailDialog.visible">
      <el-tabs v-model="actab">
        <el-tab-pane label="基本信息" name="p1">
          <HouseDetail v-if="detailDialog.visible" :detail-id="houseDetail.detailId" />
        </el-tab-pane>
        <el-tab-pane label="出租房信息" name="p2">
          <ZtDetail />
        </el-tab-pane>
        <el-tab-pane label="住户信息" name="p3">
          <ZtDetail />
        </el-tab-pane>
        <el-tab-pane label="服务情况" name="p4">
          <ZtDetail />
        </el-tab-pane>
        <el-tab-pane label="管理质保负责人" name="p5">
          <ZtDetail />
        </el-tab-pane>
      </el-tabs>

    </el-dialog>
  </div>
</template>

<script>
import SquareLabel from './SquareLabel'
import HouseDetail from './HouseDetail'

export default {
  components: {
    SquareLabel,
    HouseDetail
  },
  data() {
    return {
      actab: 'p1',
      houseDetail: {
        detailId: null
      },
      detailDialog: {
        visible: false,
        title: '',
        width: '800px',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: true
      },
      detailData: {},
      tableOptions: {
        listData: [{
          id: '1',
          house: '101室',
          ruzhu: '入住 1人 1户',
          tags: ['住', '房', '刑', '住', '房', '刑', '住', '房', '刑', '住', '房', '刑']
        }],
        showIndex: false,
        showSelection: false,
        columnEdit: false,
        columns: [{
          prop: 'house',
          label: '房屋',
          width: '150',
          handleLink: (row) => {
            this.showHouseDetailDialog(row.id)
          }
        }, {
          prop: 'ruzhu',
          label: '入住',
          width: '150'
        }, {
          prop: 'tags',
          label: '标签'
        }]
      }
    }
  },
  methods: {
    colorSeq(index) {
      return ['#FC97AF', '#0098D9', '#EA7E53', '#72CCFF', '#F7C5A0', '#CDA819', '#2B821D', '#76F2F2'][index % 8]
    },
    showHouseDetailDialog(houseId) {
      this.houseDetail.detailId = houseId
      this.detailDialog.title = '查看房屋'
      this.detailDialog.ctag = 'buildingDetail'
      this.detailDialog.visible = true
    }
  }

}
</script>

<style>

</style>
