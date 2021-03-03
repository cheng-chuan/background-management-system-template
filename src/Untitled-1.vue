
<template>
  <div class="app-container">
    <ZtViewLayout>

      <template #search-left>
        <h4>标准地址列表</h4>
      </template>

      <template #search-right>
        1
      </template>

      <template #operate-left>
        2
      </template>

      <template #operate-right>
        3
      </template>

      <template #main-content>
        4
      </template>

    </ZtViewLayout>

    <el-dialog v-bind.sync="formDialog">
      <StandardAddressForm v-if="formDialog.visible" ref="myForm" :data-id="formDialog.dataId" />
      <template #footer>
        <el-button size="mini" @click="formDialog.visible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
