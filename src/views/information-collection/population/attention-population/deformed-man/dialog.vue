<template>
  <el-dialog
    :title="dialogConfig.title"
    :visible.sync="dialogConfig.dialogVisible"
    width="60%"
    :close-on-click-modal="false"
    @open="open"
    @close="cancelDialog"
  >
    <el-steps :active="currentStep" finish-status="success">
      <el-step title="基本信息" />
      <el-step title="住房信息" />
      <el-step title="业务信息" />
    </el-steps>
    <div style="height:500px;overflow:auto;padding:0 15px">
      <el-row :gutter="23">
        <el-col :span="6">
          <el-upload
            class="avatar-uploader"
            action="#"
            style="bborder: 1px dashed #d9d9d9;border-radius: 6px"
            :http-request="upLoad"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i slot="default" class="el-icon-plus" />
            <div class="el-upload__text">点击上传图片</div>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download" />
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
        <el-col :span="17">
          <el-form ref="basicForm" :model="basicForm" label-width="100px" :rules="rules_1">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="所属网格:">
                  <!-- <el-input v-model="basicForm.grid" size="small" disabled /> -->
                  <ZtGridLabel />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="9">
                <el-form-item label="身份证:" prop="gmsfhm">
                  <el-input v-model="basicForm.gmsfhm" size="small" :disabled="stepOneShow" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="姓名:" prop="xm">
                  <el-input v-model="basicForm.xm" size="small" :disabled="stepOneShow" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别" label-width="60px" prop="xbdm">
                  <el-select v-model="basicForm.xbdm" size="small" placeholder="请选择性别" :disabled="stepOneShow">
                    <el-option
                      v-for="item in allList.sexyList"
                      :key="item.dictDetailValue"
                      :label="item.dictDetailName"
                      :value="item.dictDetailValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="9">
                <el-form-item label="曾用名/别名:" label-width="100px">
                  <el-input v-model="basicForm.cym" size="small" :disabled="stepOneShow" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="出生日期:">
                  <el-date-picker
                    v-model="basicForm.csrq"
                    size="small"
                    type="datetime"
                    placeholder="选择日期时间"
                    style="width:100%"
                    :disabled="stepOneShow"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                  <!-- <el-input v-model="basicForm.csrq" size="small" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="民族:" label-width="60px">
                  <el-select v-model="basicForm.mzdm" size="small" placeholder="请选择民族" :disabled="stepOneShow">
                    <el-option
                      v-for="item in allList.nationList"
                      :key="item.dictDetailValue"
                      :label="item.dictDetailName"
                      :value="item.dictDetailValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="9">
                <el-form-item label="手机:">
                  <el-input v-model="basicForm.lxdh" size="small" :disabled="stepOneShow" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="固定电话:">
                  <el-input v-model="basicForm.gddh" size="small" :disabled="stepOneShow" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <hr style="width:99%">
      <!-- 步骤一表单 -->
      <el-form v-if="currentStep === 0" ref="stepOneForm" :model="basicForm" label-width="80px">
        <el-row :gutter="23">
          <el-col :span="6">
            <el-form-item label="籍贯:">
              <el-input v-model="basicForm.jgssxdm" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="政治面貌:">
              <el-select v-model="basicForm.zzmmdm" size="small" placeholder="请选择政治面貌">
                <el-option
                  v-for="item in allList.politicalLandscapeList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="文化程度:">
              <el-select v-model="basicForm.xldm" size="small" placeholder="请选择文化程度">
                <el-option
                  v-for="item in allList.cultureList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="婚姻状况:">
              <el-select v-model="basicForm.hyzkdm" size="small" placeholder="请选择婚姻状况">
                <el-option
                  v-for="item in allList.maritalStatusList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="23">
          <el-col :span="7">
            <el-form-item label="宗教信仰:">
              <el-select v-model="basicForm.zjxydm" size="small" placeholder="请选择宗教信仰">
                <el-option
                  v-for="item in allList.religiousBeliefsList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="职业:">
              <el-select v-model="basicForm.zylbdm" filterable size="small" placeholder="请选择职业">
                <el-option
                  v-for="item in allList.jobList"
                  :key="item.id"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="工作单位:">
              <!-- <el-select v-model="basicForm.fwcs" size="small" placeholder="请选择工作单位">
                <el-option
                  v-for="item in allList.jobPlaceList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select> -->
              <el-input v-model="basicForm.fwcs" size="small" placeholder="请填写工作单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="10">
          <el-form-item label="名下机动车辆:" label-width="120px">
            <el-radio-group v-model="basicForm.car">
              <el-radio label="有" value="1" />
              <el-radio label="无" value="2" />
            </el-radio-group>
          </el-form-item>
        </el-row> -->
        <el-row :gutter="23">
          <el-form-item label="备注:">
            <el-input v-model="basicForm.bz" size="small" type="textarea" rows="5" placeholder="" />
          </el-form-item>
        </el-row>
      </el-form>
      <!-- 步骤二表单 -->
      <el-form v-else-if="currentStep === 1" ref="stepTwoForm" :model="stepTwoForm" label-width="120px">
        <el-row :gutter="23">
          <el-col :span="11">
            <el-form-item label="户号:">
              <el-input v-model="stepTwoForm.hh" size="small" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="与户主关系:" label-width="120px">
              <el-select v-model="stepTwoForm.yhzgxdm" size="small" placeholder="请选择关系" disabled>
                <el-option
                  v-for="item in allList.relationshipList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="23">
          <el-col :span="11">
            <el-form-item label="户口类别:">
              <el-select v-model="stepTwoForm.hklxdm" size="small" placeholder="请选择关系" disabled>
                <el-option
                  v-for="item in allList.doorCategoryList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户主姓名:">
              <el-input v-model="stepTwoForm.xm" size="small" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="23">
          <el-col :span="11">
            <el-form-item label="户主身份证号:" label-width="120px">
              <el-input v-model="stepTwoForm.gmsfhm" size="small" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式:">
              <el-input v-model="stepTwoForm.lxdh" size="small" placeholder="" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="23">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addHouseForm">新增住房信息</el-button>
          <el-table
            border
            :data="houseTableList"
            style="width: 100%"
          >
            <el-table-column align="center" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                />
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="xjxxdz"
              label="房屋地址"
            />
            <el-table-column
              align="center"
              prop="ryzflxdm"
              label="地址状态"
              :formatter="getRYZFLX"
            />
            <el-table-column
              align="center"
              prop="jzytdm"
              label="建筑用途"
              :formatter="getJZYT"
            />
          </el-table>
        </el-row>
      </el-form>
      <!-- 步骤三 -->
      <el-form v-else ref="stepThreeForm" :model="stepThreeForm" :rules="rules" label-width="120px">
        <el-row :gutter="23">
          <el-form-item label="残疾人：" label-width="80px" />
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="关注程度：" prop="gzcd">
              <el-select v-model="stepThreeForm.gzcd" placeholder="请选择" size="medium">
                <el-option
                  v-for="item in allList.gzcdList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="残疾原因:">
              <el-input v-model="stepThreeForm.cjyy" size="small" label-width="100px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="残疾时间:">
              <el-date-picker
                v-model="stepThreeForm.cjsj"
                size="small"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="残疾类别:">
              <el-select v-model="stepThreeForm.cjlbdm" placeholder="请选择" size="medium" label-width="100px">
                <el-option label="一级" value="1" />
                <el-option label="二级" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="残疾等级:" label-position="right">
              <el-select v-model="stepThreeForm.cjdjdm" placeholder="请选择" size="medium">
                <el-option label="一级" value="1" />
                <el-option label="二级" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有残疾证:">
              <el-select v-model="stepThreeForm.sfycjz" placeholder="请选择" size="medium">
                <el-option label="有" value="1" />
                <el-option label="无" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="残疾证号:" label-position="right">
              <el-input v-model="stepThreeForm.cjzh" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="技能特长:">
              <ZtDicSelect v-model="stepThreeForm.jntcdm" code="DM01451" width="100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="劳动能力:" label-position="right">
              <ZtDicSelect v-model="stepThreeForm.ldnldm" code="DM94701" width="100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监护人:">
              <el-input v-model="stepThreeForm.jhrXm" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer">
      <hr>
      <el-button v-show="currentStep>0&&currentStep<=maxStep" @click="preStep">上一步</el-button>
      <el-button :disabled="currentStep>=maxStep" @click="nextStep">下一步</el-button>
      <el-button type="primary" :disabled="currentStep!==maxStep" @click="lastCommittPopulationInfo">确 定</el-button>
    </div>
    <AddHouseDialog
      ref="addHouse"
      :house-dialog-config="houseDialogConfig"
      @closeHouseDialog="closeHouseDialog"
      @sendHKData="sendHKData"
      @showHouseList="showHouseList"
    />
  </el-dialog>
</template>

<script>
import { addRegisteredPopulation, editRegisteredPopulation, searchAllDropDownBox, addRegisteredPopulationHK, deleteRegisteredPopulationZF } from '@/api/information-collection/population/real-population/registered-population'
import { addCJRInfo, editCJRInfo } from '@/api/information-collection/population/attention-population/deformed-man'
import AddHouseDialog from '../../real-population/registered-population/addHouseDialog'

export default {
  components: { AddHouseDialog },
  props: {
    dialogConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 房屋信息
      houseDialogConfig: {
        title: '新增房屋信息',
        type: 'add',
        houseDialogVisible: false,
        id: null,
        csrq: null,
        cyzjdm: null,
        mzdm: null,
        xbdm: null
      },
      houseTableList: [],
      // 步骤条
      currentStep: 0,
      maxStep: 2,
      stepOneShow: false,
      // 表单
      basicForm: {},
      stepOneForm: {},
      stepTwoForm: {},
      stepThreeForm: {},
      rules_1: {
        gmsfhm: [
          { required: true, message: '公民身份证号必填', trigger: 'blur' }
        ],
        xm: [
          { required: true, message: '姓名必填', trigger: 'blur' }
        ],
        xbdm: [
          { required: true, message: '性别必选', trigger: 'change' }
        ]
      },
      // 业务信息
      importantPersonList: [],
      careObjectList: [],
      drugForm: {}, // 吸毒表信息
      yzszhForm: {}, // 易肇事表信息
      zdsfryForm: { sflx: [] }, // 重点上访人员表信息
      zdqsnForm: { rylx: [] }, // 重点青少年表信息
      xmsfryForm: {}, // 刑满释放人员表信息
      ywffzxwdazbbdgrzForm: {}, // 有违法犯罪行为的艾滋病病毒感染者表信息
      //   所有下拉信息
      allList: {
        sexyList: [],
        nationList: [],
        politicalLandscapeList: [],
        cultureList: [],
        maritalStatusList: [],
        religiousBeliefsList: [],
        jobList: [],
        jobPlaceList: [],
        relationshipList: [],
        doorCategoryList: [],
        gzcdList: [],
        fzlxdmList: [],
        bfsdList: [],
        jyxxmcList: [],
        rylxdmList: [],
        jtqkdmList: [],
        yjhrgxList: []
      },
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules: {}
    }
  },
  watch: {
    currentStep() {
      if (this.currentStep === 0) {
        this.stepOneShow = false
      } else {
        this.stepOneShow = true
      }
    }
  },
  created() {
    // console.log(this.dialogConfig)
    this.getDropDownList('DM00039')
    this.getDropDownList('DM01058')
    this.getDropDownList('DM01106')
    this.getDropDownList('DM01083')
    this.getDropDownList('DM01053')
    this.getDropDownList('DM01102')
    this.getDropDownList('DM01101')
    this.getDropDownList('DM01153')
    this.getDropDownList('DM00332')
    this.getDropDownList('LM90025')
    this.getDropDownList('LM10100')
    this.getDropDownList('DM01474')
    this.getDropDownList('LM00043')
    this.getDropDownList('DM01479')
    this.getDropDownList('LM00041')
    this.getDropDownList('LM00042')
    this.getDropDownList('LM10039')
  },
  methods: {
    getRYZFLX(row, column) {
      switch (row.ryzflxdm) {
        case '1':
          return '绑定为户籍地址'
        case '2':
          return '绑定为常住地址'
        case '3':
          return '绑定为联系地址'
        default:
          break
      }
    },
    getJZYT(row, column) {
      switch (row.jzytdm) {
        case '1':
          return '居住'
        case '2':
          return '出租'
        default:
          break
      }
    },
    open() {
      // console.log(this.dialogConfig)
      this.houseDialogConfig.id = this.dialogConfig.formData.xxzjbh
      if (this.dialogConfig.dialogType === 'edit') {
        this.basicForm = this.dialogConfig.formData
        this.stepThreeForm = this.dialogConfig.youngData
        console.log('520', this.stepThreeForm)
        this.stepTwoForm = this.dialogConfig.formData
        this.houseTableList = this.dialogConfig.formData.houseList.length ? this.dialogConfig.formData.houseList.map(item => {
          item.xjxxdz = `${item.mlxz},${item.dzmc},${item.mlph}`
          return item
        }) : []
      }
      // console.log(this.basicForm)
    },
    // 业务信息
    // 多选框change
    // checkGroupChange(val) {
    //   if (val.length > 1) {
    //     val.splice(0, 1)
    //   }
    //   console.log(val, this.stepThreeForm.importantPerson)
    // },
    // 获取下拉框
    getDropDownList(data) {
      const params = {}
      params.dictValue = data
      params.rowVersion = ''
      searchAllDropDownBox(params).then(res => {
        // console.log(res)
        switch (data) {
          case 'DM00039':
            this.allList.nationList = res.data.datas
            break
          case 'DM01058':
            this.allList.sexyList = res.data.datas
            break
          case 'DM01106':
            this.allList.politicalLandscapeList = res.data.datas
            break
          case 'DM01083':
            this.allList.jobList = res.data.datas
            break
          case 'DM01053':
            this.allList.religiousBeliefsList = res.data.datas
            break
          case 'DM01102':
            this.allList.maritalStatusList = res.data.datas
            break
          case 'DM01101':
            this.allList.cultureList = res.data.datas
            break
          case 'DM01153':
            this.allList.relationshipList = res.data.datas
            break
          case 'DM00332':
            this.allList.doorCategoryList = res.data.datas
            break
          case 'LM90025':
            this.importantPersonList = res.data.datas
            break
          case 'LM10100':
            this.allList.fzlxdmList = res.data.datas
            break
          case 'DM01474':
            this.allList.gzcdList = res.data.datas
            break
          case 'LM00043':
            this.allList.bfsdList = res.data.datas
            break
          case 'DM01479':
            this.allList.jyxxmcList = res.data.datas
            break
          case 'LM00041':
            this.allList.rylxdmList = res.data.datas
            break
          case 'LM00042':
            this.allList.jtqkdmList = res.data.datas
            break
          case 'LM10039':
            this.allList.yjhrgxList = res.data.datas
            break
          default:
            break
        }
      })
    },
    // 提交数据
    commitPopulationInfo() {
      if (this.dialogConfig.dialogType === 'add') { // 新增
        console.log('add')
        if (this.currentStep === 1) {
          this.$confirm('是否保存基础信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            console.log(this.basicForm)
            console.log('提交基本信息')
            this.addPopulationInfo(this.basicForm)
          }).catch(() => {
            this.$message.info({
              message: '已取消保存'
            })
          })
        }
      } else if (this.dialogConfig.dialogType === 'edit') { // 编辑
        console.log('edit')
        if (this.currentStep === 1) {
          this.$confirm('是否修改基础信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            console.log(this.basicForm)
            console.log('修改基本信息')
            this.editPopulationInfo(this.basicForm)
          }).catch(() => {
            this.$message.info({
              message: '已取消保存'
            })
          })
        }
      }
    },
    // 最后一步提交数据
    lastCommittPopulationInfo() {
      this.$refs.stepThreeForm.validate((valid) => {
        if (valid) {
          this.stepThreeForm.xm = this.basicForm.xm
          this.stepThreeForm.gmsfhm = this.basicForm.gmsfhm
          this.stepThreeForm.xbdm = this.basicForm.xbdm
          this.stepThreeForm.sqrLxdh = this.basicForm.lxdh
          console.log(this.stepThreeForm)
          if (this.dialogConfig.dialogType === 'add') {
            console.log('提交最后一次数据')
            this.$confirm('是否保存业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.stepThreeForm)
              this.addCJRInfo(this.stepThreeForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消保存'
              })
            })
          } else if (this.dialogConfig.dialogType === 'edit') {
            console.log('修改最后一次数据')
            this.$confirm('是否修改业务信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              console.log(this.stepThreeForm)
              this.editCJRInfo(this.stepThreeForm)
            }).catch(() => {
              this.$message.info({
                message: '已取消修改'
              })
            })
          }
        } else {
          this.$message.warning({
            message: '注意必填选项'
          })
          return false
        }
      })
    },
    // 新增基本信息操作
    addPopulationInfo(params) {
      addRegisteredPopulation(params).then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.houseDialogConfig.id = res.data.data
          this.houseDialogConfig.csrq = params.csrq
          this.houseDialogConfig.cyzjdm = params.cyzjdm
          this.houseDialogConfig.mzdm = params.mzdm
          this.houseDialogConfig.xbdm = params.xbdm
          this.$message.success({
            message: '基础信息保存成功'
          })
        } else {
          this.$message.warning({
            message: '基础数据保存失败'
          })
        }
      }).catch(() => {
        this.$message.error({
          message: '服务请求失败'
        })
      })
    },
    // 编辑基本信息操作
    editPopulationInfo(params) {
      editRegisteredPopulation(params).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          // this.houseDialogConfig.id = params.xxzjbh
          // this.houseDialogConfig.csrq = params.csrq
          // this.houseDialogConfig.cyzjdm = params.cyzjdm
          // this.houseDialogConfig.mzdm = params.mzdm
          // this.houseDialogConfig.xbdm = params.xbdm
          this.$message.success({
            message: '基本数据编辑成功'
          })
        } else {
          this.$message.warning({
            message: '基本数据编辑失败'
          })
        }
      }).catch(() => {
        this.$message.error({
          message: '服务请求失败'
        })
      })
    },
    // 新增户口信息操作
    addPopulationInfoHK(params) {
      addRegisteredPopulationHK(params).then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.$message.success({
            message: '户口信息保存成功'
          })
        } else {
          this.$message.warning({
            message: '户口数据保存失败'
          })
        }
      }).catch(() => {
        this.$message.error({
          message: '服务请求失败'
        })
      })
    },
    // 编辑户口信息操作
    editPopulationInfoHK(params) {
      editRegisteredPopulation(params).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.$message.success({
            message: '基本数据编辑成功'
          })
        } else {
          this.$message.warning({
            message: '基本数据编辑失败'
          })
        }
      }).catch(() => {
        this.$message.error({
          message: '服务请求失败'
        })
      })
    },
    // 新增业务信息操作
    addCJRInfo(params) {
      addCJRInfo(params).then(res => {
        console.log(res)
        if (res.status === 200 && res.data.code === '000000') {
          this.cancelDialog()
          this.$message.success({
            message: '业务信息保存成功'
          })
        } else {
          this.$message.warning({
            message: '业务信息保存失败'
          })
        }
      }).catch(() => {
        this.$message.error({
          message: '服务请求失败'
        })
      })
    },
    // 编辑业务信息操作
    editCJRInfo(params) {
      editCJRInfo(params).then(res => {
        if (res.status === 200 && res.data.code === '000000') {
          this.cancelDialog()
          this.$message.success({
            message: '业务数据编辑成功'
          })
        } else {
          this.$message.warning({
            message: '业务数据编辑失败'
          })
        }
      }).catch(() => {
        this.$message.error({
          message: '服务请求失败'
        })
      })
    },
    // 关闭弹窗
    cancelDialog() {
      this.dialogConfig.dialogVisible = false
      this.basicForm = {}
      this.stepOneForm = {}
      this.stepTwoForm = {}
      this.stepThreeForm = {}
      this.$emit('updateList')
      this.currentStep = 0
      this.houseTableList = []
      if (this.dialogConfig.row) {
        console.log(this.dialogConfig.row)
      }
    },
    // 步骤条
    preStep() {
      if (this.currentStep >= 0) {
        this.currentStep--
      } else {
        this.currentStep = 0
      }
    },
    nextStep() {
      if (this.currentStep <= this.maxStep) {
        this.$refs.basicForm.validate((valid) => {
          if (valid) {
            this.currentStep++
            this.commitPopulationInfo()
          } else {
            this.$message.info('注意必填项')
            return false
          }
        })
      } else {
        this.currentStep = this.maxStep
      }
    },
    // 弹出房屋信息弹窗
    addHouseForm() {
      this.$refs.addHouse.houseForm = {}
      this.houseDialogConfig.houseDialogVisible = true
      this.houseDialogConfig.title = '新增房屋信息'
      this.houseDialogConfig.type = 'add'
    },
    closeHouseDialog() {
      this.houseDialogConfig.houseDialogVisible = false
    },
    // 展示住房列表
    showHouseList(houseObj) {
      const arr = this.houseTableList.length ? this.houseTableList.map(item => item.zfxxId) : []
      if (arr.indexOf(houseObj.zfxxId) === -1) {
        this.houseTableList.push(houseObj)
      } else {
        this.houseTableList.splice(arr.indexOf(houseObj.zfxxId), 1, houseObj)
      }
    },
    // 编辑住房信息
    handleEdit(index, row) {
      console.log(row)
      this.houseDialogConfig.title = '编辑住房信息'
      this.houseDialogConfig.type = 'edit'
      if (this.dialogConfig.dialogType === 'add') {
        this.$refs.addHouse.houseForm = row
        this.$refs.addHouse.ryzflxdm = row.ryzflxdm
      } else if (this.dialogConfig.dialogType === 'edit') {
        // row.xjxxdz = `${row.jlxmc},${row.ldh},${row.mlph}`
        this.$refs.addHouse.houseForm = {}
        this.$refs.addHouse.houseForm = row
        this.$refs.addHouse.ryzflxdm = row.ryzflxdm
      }
      this.houseDialogConfig.houseDialogVisible = true
    },
    // 删除住房信息
    handleDelete(index, row) {
      this.$confirm('是否删除信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteRegisteredPopulationZF(row.zfxxId, row.ryzflxdm).then(res => {
          console.log(res)
          if (res.status === 200 && res.data.code === '000000') {
            const arr = this.houseTableList.length ? this.houseTableList.map(item => item.zfxxId) : []
            this.houseTableList.splice(arr.indexOf(row.zfxxId), 1)
            this.stepTwoForm = this.houseTableList.length ? this.houseTableList[0] : {}
            console.log(this.stepTwoForm)
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
            message: '请求服务失败'
          })
        })
      }).catch(() => {
        this.$message.info({
          message: '已取消删除'
        })
      })
    },
    // 展示户口信息
    sendHKData(houseForm) {
      console.log(houseForm)
      this.stepTwoForm = houseForm
    },
    // 上传图片相关处理
    upLoad() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    }

  }

}
</script>

<style scoped lang='scss'>
  .el-upload__text{
    position:absolute;
    bottom:25%;
    left:50%;
    transform:translateX(-50%);
    color:#A1A7AF;
    font-size:14px
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
    margin-bottom: 12px;
  }
  .el-select{
    width: 100%;
  }
</style>
