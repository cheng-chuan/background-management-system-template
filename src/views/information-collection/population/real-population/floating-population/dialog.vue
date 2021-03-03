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
          <el-form ref="basicForm" :model="basicForm" label-width="100px" :rules="rules">
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
              <!-- <el-select v-model="basicForm.cyzkDwbm" size="small" placeholder="请选择工作单位">
                <el-option
                  v-for="item in allList.jobPlaceList"
                  :key="item.dictDetailName"
                  :label="item.dictDetailName"
                  :value="item.dictDetailValue"
                />
              </el-select> -->
              <el-input v-model="basicForm.cyzkDwbm" size="small" placeholder="请填写工作单位" />
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
        <!-- <el-row :gutter="23">
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
        </el-row> -->
        <el-row :gutter="24">
          <el-form-item label="户籍地:" label-width="100px">
            <el-col :span="7" style="padding:0">
              <el-select v-model="stepTwoForm.jlxmc" size="small" placeholder="请选择所属省" style="width:100%">
                <el-option
                  v-for="item in allList.provinceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="1" style="padding:0"><span>省</span></el-col>
            <el-col :span="7" style="padding:0">
              <el-select v-model="stepTwoForm.ldh" size="small" placeholder="请选择所属市" style="width:100%">
                <el-option
                  v-for="item in allList.cityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="1" style="padding:0"><span>市</span></el-col>
            <el-col :span="7" style="padding:0">
              <el-select v-model="stepTwoForm.mlph" size="small" placeholder="请选择所属县" style="width:100%">
                <el-option
                  v-for="item in allList.countyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="1" style="padding:0"><span>县</span></el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="现居详址：" label-width="90px">
              <el-input v-model="stepTwoForm.xjxxdz" size="small" />
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
      <el-form v-else ref="stepThreeForm" :model="stepThreeForm" label-width="80px">
        <el-form-item label="重点人员:" />
        <el-row :gutter="24">
          <el-form-item label="">
            <el-checkbox-group v-model="stepThreeForm.importantPerson" @change="checkGroupChange">
              <el-checkbox
                v-for="item in importantPersonList"
                :key="item.dictDetailValue"
                :label="item.dictDetailValue"
              >{{ item.dictDetailName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <!-- 吸毒人员表 -->
        <SDRY v-if="stepThreeForm.importantPerson.indexOf('9')!==-1" ref="drugform" :dialog-config="dialogConfig" :basic-form="basicForm" @cancelForm="clearCheck_2" @confirmImportPopulation="confirmImportPopulation" />
        <!-- 易肇事肇祸表 -->
        <ZSZH v-if="stepThreeForm.importantPerson.indexOf('5')!==-1" ref="yzszhForm" :dialog-config="dialogConfig" :basic-form="basicForm" @cancelForm="clearCheck_2" @confirmImportPopulation="confirmImportPopulation" />
        <!-- 重点上访人员 -->
        <ZDSF v-if="stepThreeForm.importantPerson.indexOf('12')!==-1" ref="zdsfryForm" :dialog-config="dialogConfig" :basic-form="basicForm" @cancelForm="clearCheck_2" @confirmImportPopulation="confirmImportPopulation" />
        <!-- 重点青少年 -->
        <ZDQSN v-if="stepThreeForm.importantPerson.indexOf('11')!==-1" ref="zdqsnForm" :dialog-config="dialogConfig" :basic-form="basicForm" @cancelForm="clearCheck_2" @confirmImportPopulation="confirmImportPopulation" />
        <!-- 刑满释放人员 -->
        <XMSF v-if="stepThreeForm.importantPerson.indexOf('7')!==-1" ref="xmsfryForm" :dialog-config="dialogConfig" :basic-form="basicForm" @cancelForm="clearCheck_2" @confirmImportPopulation="confirmImportPopulation" />
        <!-- 艾滋病危险人员 -->
        <!-- <el-form v-else-if="stepThreeForm.importantPerson[0] === '10'" ref="ywffzxwdazbbdgrzForm" :model="ywffzxwdazbbdgrzForm" label-width="124px" style="width:90%;background:#EEEEEE;margin:0 auto;padding-left:15px">
          <el-form-item label="艾滋病危险人员" label-width="120px" />
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="关注程度：">
                <el-input v-model="ywffzxwdazbbdgrzForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="感染途径：">
                <el-input v-model="ywffzxwdazbbdgrzForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="有无违法犯罪史：">
                <el-radio v-model="ywffzxwdazbbdgrzForm.radio" label="0">无</el-radio>
                <el-radio v-model="ywffzxwdazbbdgrzForm.radio" label="1">有</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="犯罪类型：">
                <el-input v-model="ywffzxwdazbbdgrzForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="22">
              <el-form-item label="违法犯罪情况：">
                <el-input v-model="ywffzxwdazbbdgrzForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="关注类型：">
                <el-input v-model="ywffzxwdazbbdgrzForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="收治情况：">
                <el-input v-model="ywffzxwdazbbdgrzForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="收治机构名称：">
                <el-input v-model="ywffzxwdazbbdgrzForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="收治机构所属层级：" label-width="138px">
                <el-input v-model="ywffzxwdazbbdgrzForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
        <!-- 社区矫正人员 -->
        <SQJZ v-if="stepThreeForm.importantPerson.indexOf('8')!==-1" ref="sqjzryForm" :dialog-config="dialogConfig" :basic-form="basicForm" @cancelForm="clearCheck_2" @confirmImportPopulation="confirmImportPopulation" />
        <hr>
        <el-form-item label="关怀对象:" />
        <el-row :gutter="24">
          <el-form-item label="">
            <el-checkbox-group v-model="stepThreeForm.careObject" @change="checkGroupChange_2">
              <el-checkbox
                v-for="item in careObjectList"
                :key="item.value"
                :label="item.value"
              >{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <!-- 残疾人 -->
        <CJR v-if="stepThreeForm.careObject.indexOf('1')!==-1" ref="cjrForm" :dialog-config="dialogConfig" :basic-form="basicForm" @cancelForm="clearCheck" @confirmCareObject="confirmCareObject" />
        <!-- 双拥对象 -->
        <SYDX v-if="stepThreeForm.careObject.indexOf('2')!==-1" ref="sydxForm" :dialog-config="dialogConfig" :basic-form="basicForm" @cancelForm="clearCheck" @confirmCareObject="confirmCareObject" />
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
import { addRegisteredPopulation, editRegisteredPopulation, searchAllDropDownBox, addRegisteredPopulationHK, deleteRegisteredPopulationZF } from '@/api/information-collection/population/real-population/floating-population'
import AddHouseDialog from './addHouseDialog'
import SQJZ from './../components/sqjz'
import ZDQSN from './../components/zdqsn'
import ZDSF from './../components/zdsfry'
import SDRY from './../components/sdry'
import ZSZH from './../components/zhzs'
import XMSF from './../components/xmsf'
import CJR from './../components/cjr'
import SYDX from './../components/sydx'

export default {
  components: { AddHouseDialog, SQJZ, ZDQSN, ZDSF, SDRY, ZSZH, XMSF, CJR, SYDX },
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
      stepThreeForm: {
        importantPerson: [],
        careObject: []
      },
      rules: {
        gmsfhm: [
          { required: true, message: '身份证必填', trigger: 'blur' }
        ],
        xm: [
          { required: true, message: '姓名必填', trigger: 'blur' }
        ],
        xbdm: [
          { required: true, message: '性别必选', trigger: 'change' }
        ]
      },
      // 业务信息
      isImportPopulation: false, // 是否为重点人员
      isCareObject: false, // 是否为关怀对象
      importantPersonList: [],
      careObjectList: [
        {
          label: '残疾人口',
          value: '1'
        },
        {
          label: '双拥对象',
          value: '2'
        }
      ],
      drugForm: {}, // 吸毒表信息
      yzszhForm: {}, // 易肇事表信息
      zdsfryForm: { sflx: [] }, // 重点上访人员表信息
      zdqsnForm: { rylx: [] }, // 重点青少年表信息
      xmsfryForm: {}, // 刑满释放人员表信息
      ywffzxwdazbbdgrzForm: {}, // 有违法犯罪行为的艾滋病病毒感染者表信息
      sqjzryForm: {}, // 社区矫正人员表信息
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
        provinceList: [], // 省
        cityList: [], // 市
        countyList: []// 县
      },
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
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
      console.log(this.dialogConfig)
      this.houseDialogConfig.id = this.dialogConfig.formData.xxzjbh
      if (this.dialogConfig.dialogType === 'edit') {
        this.basicForm = this.dialogConfig.formData
        this.stepTwoForm = this.dialogConfig.formData.houseList.length ? this.dialogConfig.formData.houseList[0] : {}
        this.houseTableList = this.dialogConfig.formData.houseList.length ? this.dialogConfig.formData.houseList.map(item => {
          item.xjxxdz = `${item.mlxz},${item.dzmc},${item.mlph}`
          return item
        }) : []
        // 业务信息回显
        this.pushArr(this.stepThreeForm.importantPerson, this.basicForm.sdryxxFlag, '9')
        this.pushArr(this.stepThreeForm.importantPerson, this.basicForm.sqjzryFlag, '8')
        this.pushArr(this.stepThreeForm.importantPerson, this.basicForm.xmsfryxxFlag, '7')
        this.pushArr(this.stepThreeForm.importantPerson, this.basicForm.zdqsnFlag, '11')
        this.pushArr(this.stepThreeForm.importantPerson, this.basicForm.zdsfryFlag, '12')
        this.pushArr(this.stepThreeForm.importantPerson, this.basicForm.zszhjsbFlag, '5')

        this.pushArr(this.stepThreeForm.careObject, this.basicForm.cjrxxbFlag, '1')
        this.pushArr(this.stepThreeForm.careObject, this.basicForm.syxxFlag, '1')
      }
      console.log(this.basicForm)
    },
    // 业务信息
    pushArr(arr, flag, num) {
      if (flag) {
        arr.push(num)
      }
    },
    // 多选框change
    checkGroupChange(val) {
      // if (val.length > 1) {
      //   val.splice(0, 1)
      // }
      console.log(val, this.stepThreeForm.importantPerson)
    },
    checkGroupChange_2(val) {
      // if (val.length && val.length > 1) {
      //   val.splice(0, 1)
      // }
      console.log(val, this.stepThreeForm.careObject)
    },
    clearCheck() {
      this.stepThreeForm.careObject = []
    },
    clearCheck_2() {
      this.stepThreeForm.importantPerson = []
    },
    confirmImportPopulation() {
      if (!this.isImportPopulation) {
        this.basicForm.sftsrq = '1'
        editRegisteredPopulation(this.basicForm).then(res => {
          console.log(res)
          this.isImportPopulation = true
        // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          console.error(error)
        })
      } else {
        console.log('是否为特殊人群，无需再保存')
        // return
      }
    },
    confirmCareObject() {
      if (!this.isCareObject) {
        this.basicForm.sfghdx = '1'
        editRegisteredPopulation(this.basicForm).then(res => {
          console.log(res)
          this.isCareObject = true
        // eslint-disable-next-line handle-callback-err
        }).catch((error) => {
          console.error(error)
        })
      } else {
        console.log('是否为关怀对象，无需再保存')
        // return
      }
    },
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
        } else if (this.currentStep === 2) {
          // this.$confirm('是否保存户口信息?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消'
          // }).then(() => {
          //   console.log(this.stepTwoForm)
          //   console.log('提交住房信息')
          //   this.addPopulationInfoHK(this.stepTwoForm)
          // }).catch(() => {
          //   this.$message.info({
          //     message: '已取消保存'
          //   })
          // })
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
        } else if (this.currentStep === 2) {
          // this.$confirm('是否修改户口信息?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消'
          // }).then(() => {
          //   console.log(this.stepTwoForm)
          //   console.log('提交住房信息')
          // }).catch(() => {
          //   this.$message.info({
          //     message: '已取消修改'
          //   })
          // })
        }
      }
    },
    // 最后一步提交数据
    lastCommittPopulationInfo() {
      console.log(this.stepThreeForm)
      if (this.dialogConfig.dialogType === 'add') {
        console.log('提交最后一次数据')
      } else if (this.dialogConfig.dialogType === 'edit') {
        console.log('修改最后一次数据')
      }
      this.cancelDialog()
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
        if (res.status === 200 && res.code === '000000') {
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
    // 关闭弹窗
    cancelDialog() {
      this.dialogConfig.dialogVisible = false
      this.basicForm = {}
      this.stepOneForm = {}
      this.stepTwoForm = {}
      this.stepThreeForm = { importantPerson: [], careObj: [] }
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
