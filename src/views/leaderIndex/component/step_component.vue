<template>
  <div>
    <ul class="steps">
      <li v-for="(item,index) in SetData" :key="item+index" :class="{'active':Steps===index}">{{ item+Steps }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: [
    'SetData',
    'Steps'
  ],
  data() {
    return {

    }
  }
}

</script>

<style scoped>
.steps {
    position: relative;
    margin-bottom: 30px;
    counter-reset: step;
    /*创建步骤数字计数器*/
}

/*步骤描述*/
.steps li {
    list-style-type: none;
    font-size: 12px;
    text-align: center;
    width: 15%;
    position: relative;
    float: left;
}

/*步骤数字*/
.steps li:before {
    display: block;
    content: counter(step);
    /*设定计数器内容*/
    counter-increment: step;
    /*计数器值递增*/
    width: 32px;
    height: 32px;
    border-bottom: 3px dashed #f4852e;
    line-height: 32px;
    border-radius: 32px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    font-weight: 700;
    margin: 0 auto 8px auto;
}

/*连接线*/
.steps li~li:after {
    content: "";
    width: 89%;
    border-bottom: 3px dashed #f4852e;
    position: absolute;
    left: -45%;
    top: 15px;
    z-index: 1;
    /*放置在数字后面*/
}

/*将当前/完成步骤之前的数字及连接线变绿*/
.steps li.active:before,
.steps li.active:after {
    background-color: #f4852e;
}

/*将当前/完成步骤之后的数字及连接线变灰*/
.steps li.active~li:before,
.steps li.active~li:after {
    background-color: #777;
}
</style>
