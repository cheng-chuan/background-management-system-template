<template>
  <el-dialog
    :title="dialogConfig.title"
    :visible.sync="dialogConfig.dialogVisible"
    width="1400px"
    :close-on-click-modal="false"
    @open="open"
    @close="cancelDialog"
  >
    <!-- <el-steps :active="currentStep" finish-status="success">
      <el-step title="基本信息" />
      <el-step title="住房信息" />
      <el-step title="业务信息" />
    </el-steps> -->
    <zt-map ref="ztmap" v-bind="mapConf" @selectAddress="handleSelectAddress">

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
            <el-form ref="basicForm" :model="basicForm" label-width="100px">
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
                  <el-form-item label="身份证:">
                    <el-input v-model="basicForm.gmsfhm" size="small" :disabled="stepOneShow" />
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="姓名:">
                    <el-input v-model="basicForm.xm" size="small" :disabled="stepOneShow" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="性别" label-width="60px">
                    <ZtDicSelect v-model="basicForm.xbdm" code="DM01058" width="100%" />
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
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="民族:" label-width="60px">
                    <ZtDicSelect v-model="basicForm.mzdm" code="DM00039" width="100%" />
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
        <el-form ref="stepOneForm" :model="basicForm" label-width="100px">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="政治面貌:">
                <ZtDicSelect v-model="basicForm.zzmmdm" code="DM01106" width="100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="文化程度:">
                <ZtDicSelect v-model="basicForm.xldm" code="DM01101" width="100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="婚姻状况:">
                <ZtDicSelect v-model="basicForm.hyzkdm" code="DM01102" width="100%" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="宗教信仰:">
                <ZtDicSelect v-model="basicForm.zjxydm" code="DM01053" width="100%" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="职业:">
                <ZtDicSelect v-model="basicForm.zylbdm" code="DM01083" width="100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
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

          <el-form-item label="户籍地详址">
            <el-input v-model="stepTwoForm.hjdzQhnxxdz" size="small">
              <el-button slot="append" size="mini" @click="startSelectHujidi">选择地址</el-button>
            </el-input>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="户籍地址编码">
                <el-input v-model="stepTwoForm.hjdzDzbm" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="户籍区划编码">
                <el-input v-model="stepTwoForm.hjdzXzqhdm" size="small" />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row :gutter="24">
            <el-form-item label="户籍地:">
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
          </el-row> -->

          <el-form-item label="现住地详址">
            <el-input v-model="stepTwoForm.xzzQhnxxdz" size="small">
              <el-button slot="append" size="mini" @click="startSelectXianzhudi">选择地址</el-button>
            </el-input>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="现住地址编码">
                <el-input v-model="stepTwoForm.xzzDzbm" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现住区划编码">
                <el-input v-model="stepTwoForm.xzzXzqhdm" size="small" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="籍贯:">
                <el-input v-model="basicForm.jgssxdm" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="户籍地详址：">
                <el-input v-model="basicForm.hjdxz" size="small" />
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
      <!-- <el-form v-else-if="currentStep === 1" ref="stepTwoForm" :model="stepTwoForm" label-width="120px">
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
      </el-form> -->
      <!-- 步骤三 -->
      <!-- <el-form v-else ref="stepThreeForm" :model="stepThreeForm" label-width="80px">
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
        </el-row> -->
      <!-- 吸毒人员表 -->
      <!-- <el-form v-if="stepThreeForm.importantPerson[0] === '9'" ref="drugform" :model="drugForm" label-width="110px" style="width:90%;background:#EEEEEE;margin:0 auto;padding-left:15px">
          <el-form-item label="吸毒人员" label-width="80px" />
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="关注程度：">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="吸毒状态：">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="初次发现时间：" label-width="110px">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="查获日期：">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="管控情况：">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="吸毒原因：">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="毒品来源：">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="戒毒情况：">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="滥用毒品种类：" label-width="110px">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="">
                <el-checkbox v-model="drugForm.mst">是否服美沙酮戒毒</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="犯罪情况：">
                <el-input v-model="drugForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="">
                <el-checkbox v-model="drugForm.mst">有无违法犯罪史</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
      <!-- 易肇事肇祸表 -->
      <!-- <el-form v-else-if="stepThreeForm.importantPerson[0] === '5'" ref="yzszhForm" :model="yzszhForm" label-width="124px" style="width:90%;background:#EEEEEE;margin:0 auto;padding-left:15px">
          <el-form-item label="易肇事肇祸严重精神障碍患者" label-width="200px" />
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="危险程度：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="患病名称：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="初次发病日期：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="有无肇事肇祸史：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="家庭经济状况：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="是否纳入低保：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="是否接受过治疗：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="康复机构：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="监护人姓名：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="监护人联系方式：" label-width="124px">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="治疗医院：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="诊断类型：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="治疗情况：">
                <el-input v-model="yzszhForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
      <!-- 重点上访人员 -->
      <!-- <el-form v-else-if="stepThreeForm.importantPerson[0] === '12'" ref="zdsfryForm" :model="zdsfryForm" label-width="124px" style="width:90%;background:#EEEEEE;margin:0 auto;padding-left:15px">
          <el-form-item label="重点上访人员" label-width="100px" />
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="关注程度：">
                <el-input v-model="zdsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="上访状态：">
                <el-input v-model="zdsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="事发地：">
                <el-input v-model="zdsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-form-item label="上访类型：">
              <el-checkbox-group v-model="zdsfryForm.sflx">
                <el-checkbox
                  v-for="item in 10"
                  :key="item"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="22">
              <el-form-item label="上访原因：">
                <el-input v-model="zdsfryForm.model" rows="5" type="textarea" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
      <!-- 重点青少年 -->
      <!-- <el-form v-else-if="stepThreeForm.importantPerson[0] === '11'" ref="zdqsnForm" :model="zdqsnForm" label-width="124px" style="width:90%;background:#EEEEEE;margin:0 auto;padding-left:15px">
          <el-form-item label="重点青少年" label-width="90px" />
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="关注程度：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="帮扶手段：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="违法情况：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="犯罪类型：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="学校所属层级：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="教育学校名称：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-form-item label="人员类型：">
              <el-checkbox-group v-model="zdqsnForm.rylx">
                <el-checkbox
                  v-for="item in 10"
                  :key="item"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="帮扶人姓名：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="帮扶人联系方式：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="家庭情况：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="">
                <el-checkbox v-model="zdqsnForm.model">是否违法犯罪</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="监护人身份证号：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="监护人姓名：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="监护人联系方式：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="监护人关系：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="22">
              <el-form-item label="监护人居住详址：">
                <el-input v-model="zdqsnForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
      <!-- 刑满释放人员 -->
      <!-- <el-form v-else-if="stepThreeForm.importantPerson[0] === '7'" ref="xmsfryForm" :model="xmsfryForm" label-width="124px" style="width:90%;background:#EEEEEE;margin:0 auto;padding-left:15px">
          <el-form-item label="刑满释放人员" label-width="100px" />
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="关注程度：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="犯罪类型：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="原罪名：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="服刑(劳教)场所：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="原判刑期：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="本年度是否重犯：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="出监所时间：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="">
                <el-checkbox v-model="xmsfryForm.model">是否脱管</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="危险性评估：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="">
                <el-checkbox v-model="xmsfryForm.model">是否累犯</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="帮教情况：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="">
                <el-checkbox v-model="xmsfryForm.model">是否已安置</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="衔接日期：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="衔接情况：">
                <el-input v-model="xmsfryForm.model" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="22">
              <el-form-item label="犯罪行为：">
                <el-input v-model="xmsfryForm.model" rows="2" type="textarea" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="22">
              <el-form-item label="未安置原因：">
                <el-input v-model="xmsfryForm.model" rows="2" type="textarea" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
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
      <!-- <el-form v-else-if="stepThreeForm.importantPerson[0] === '8'" ref="sqjzryForm" :model="ywffzxwdazbbdgrzForm" label-width="150px" style="width:90%;background:#EEEEEE;margin:0 auto;padding-left:15px">
          <el-form-item label="社区矫正人员" label-width="100px" />
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="社区服刑人员编号：">
                <el-input v-model="sqjzryForm.xxzjbh" size="small" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="接受方式:">
                <el-select v-model="sqjzryForm.jsfsdm" placeholder="请选择" size="medium">
                  <el-option label="一级" value="1" />
                  <el-option label="二级" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="关注程度：">
                <el-select v-model="sqjzryForm.gzcd" placeholder="请选择" size="medium">
                  <el-option label="一级" value="1" />
                  <el-option label="二级" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="原羁押场所:">
                <el-input v-model="sqjzryForm.yjycsDwmc" size="small" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="犯罪类型：">
                <el-select v-model="sqjzryForm.fzlxdm" placeholder="请选择" size="medium" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="具体罪名:">
                <el-input v-model="sqjzryForm.zm" size="small" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="是否有四史：">
                <el-checkbox-group v-model="sqjzryForm.ssqkdm">
                  <el-checkbox label="" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="是否三涉:">
                <el-checkbox-group v-model="sqjzryForm.sasqkdm">
                  <el-checkbox label="" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="是否累惯犯：">
                <el-checkbox-group v-model="sqjzryForm.sflgfPdbz">
                  <el-checkbox label="" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="服刑类别：">
                <el-select v-model="sqjzryForm.jzlbdm" placeholder="请选择" size="medium" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="原判刑期:">
                <el-input v-model="sqjzryForm.ypxq" size="small" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="原判刑期开始时间：">
                <el-input v-model="sqjzryForm.ypxqKsrq" size="small" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="原判刑期结束时间:">
                <el-input v-model="sqjzryForm.ypxqJsrq" size="small" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="服刑时间：">
                <el-input v-model="sqjzryForm.jzKsrq" size="small" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="至:" label-width="120px">
                <el-input v-model="sqjzryForm.jzJsrq" size="small" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="案件类别：">
                <el-select v-model="sqjzryForm.ajlbdm" placeholder="请选择" size="medium" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="是否建立矫正小组：">
                <el-checkbox-group v-model="sqjzryForm.ssqkdm">
                  <el-checkbox label="" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="是否重新犯罪：">
                <el-checkbox-group v-model="sqjzryForm.ssqkdm">
                  <el-checkbox label="" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="是否有脱管：">
                <el-select v-model="sqjzryForm.sfytgPdbz" placeholder="请选择" size="medium" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="是否有漏管：" label-width="120px">
                <el-checkbox-group v-model="sqjzryForm.sfylgPdbz">
                  <el-checkbox label="" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="脱管原因：">
                <el-input v-model="sqjzryForm.tgjzqkXxqk" size="small" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="漏管原因：">
                <el-input v-model="sqjzryForm.lgyyXxqk" size="small" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="11">
              <el-form-item label="近况描述：">
                <el-input v-model="sqjzryForm.tgjzqkXxqk" size="small" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="附件上传：">
                <el-input v-model="sqjzryForm.fjxxXxzjbh" size="small" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
      <!-- <hr>
        <el-row :gutter="24">
          <el-form-item label="关怀对象:">
            <el-checkbox-group v-model="stepThreeForm.careObject">
              <el-checkbox
                v-for="item in careObjectList"
                :key="item"
                :label="item"
              >{{ item }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
      </el-form>  -->
      </div>
    </zt-map>
    <div slot="footer">
      <hr>
      <!-- <el-button v-show="currentStep>0&&currentStep<=maxStep" @click="preStep">上一步</el-button>
      <el-button :disabled="currentStep>=maxStep" @click="nextStep">下一步</el-button> -->
      <el-button type="normal" @click="cancelDialog">取消</el-button>
      <el-button type="primary" @click="commitPopulationInfo">确 定</el-button>
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
import AddHouseDialog from './addHouseDialog'

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
      mapConf: {
        title: null,
        hide: true
      },
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
        careObj: []
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
    // 选择现住地
    startSelectXianzhudi() {
      this.mapConf.title = '选择现住地址'
      this.mapConf.hide = false
    },
    // 选择户籍地
    startSelectHujidi() {
      this.mapConf.title = '选择户籍地址'
      this.mapConf.hide = false
    },
    // 地图地址选择
    handleSelectAddress({ address, addressId, addressCode }) {
      if (this.mapConf.title === '选择现住地址') {
        this.stepTwoForm.xzzDzbm = addressId
        this.stepTwoForm.xzzQhnxxdz = address
        this.stepTwoForm.xzzXzqhdm = addressCode
      } else if (this.mapConf.title === '选择户籍地址') {
        this.stepTwoForm.hjdzDzbm = addressId
        this.stepTwoForm.hjdzQhnxxdz = address
        this.stepTwoForm.hjdzXzqhdm = addressCode
      }
    },
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
      if (this.dialogConfig.dialogType === 'edit') {
        this.basicForm = this.dialogConfig.formData
        this.stepTwoForm = this.dialogConfig.formData
        this.houseTableList = this.dialogConfig.formData.houseList && this.dialogConfig.formData.houseList.length ? this.dialogConfig.formData.houseList.map(item => {
          item.xjxxdz = `${item.jlxmc},${item.ldh},${item.mlph}`
          return item
        }) : []
      }
      console.log(this.basicForm)
    },
    // 业务信息
    // 多选框change
    checkGroupChange(val) {
      if (val.length > 1) {
        val.splice(0, 1)
      }
      console.log(val, this.stepThreeForm.importantPerson)
    },
    // 获取下拉框
    getDropDownList(data) {
      const params = {}
      params.dictValue = data
      params.rowVersion = ''
      searchAllDropDownBox(params).then(res => {
        this.$store.commit('biz/SET_SELECT_OPTIONS', {
          code: data,
          options: res.data.datas.map(item => ({
            id: item.id,
            label: item.dictDetailName,
            value: item.dictDetailValue
          }))
        })
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
        this.currentStep = 1
        if (this.currentStep === 1) {
          this.$confirm('是否修改信息?', '提示', {
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
        this.currentStep++
        this.commitPopulationInfo()
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
