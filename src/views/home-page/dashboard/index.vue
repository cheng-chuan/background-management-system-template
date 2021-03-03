<template>
  <div class="container">

    <div class="top">
      <div class="left">
        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" style="height:45px;line-height:45px;font-size:16px">全媒体服务受理量</el-menu-item>
        </el-menu>
      </div>
      <div class="center">
        <div v-for="item in titleAndNum" :key="item.id" class="item">
          <div class="item-top" :style="{color:item.color}">
            <div class="title">{{ item.title_1 }}</div>
            <div class="num">{{ item.num_1 }}</div>
          </div>
          <div class="item-bottom" :style="{background:item.color}">
            <div class="title">{{ item.title_2 }}</div>
            <div class="num">{{ item.num_2 }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="box">

          <div class="title">即将超期提醒</div>

          <div class="items-box">
            <div v-for="item in overDateTip" :key="item.id" class="item">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-num">{{ item.num }}</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" style="height:45px;line-height:45px;font-size:16px">待办事项</el-menu-item>
        </el-menu>
      </div>
      <div class="center">
        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" style="height:45px;line-height:45px;font-size:16px">通知公告</el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" style="height:45px;line-height:45px;font-size:16px">收件箱</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleAndNum: [
        {
          id: '1',
          title_1: '待收件',
          num_1: '11',
          title_2: '已接收',
          num_2: '65434',
          color: '#7B9CD7'
        },
        {
          id: '2',
          title_1: '处理中',
          num_1: '32',
          title_2: '已处理',
          num_2: '4568',
          color: '#6B92DB'
        },
        {
          id: '3',
          title_1: '延期待审核',
          num_1: '435',
          title_2: '延期已审核',
          num_2: '9876',
          color: '#74ADE4'
        },
        {
          id: '4',
          title_1: '待督办回复',
          num_1: '0',
          title_2: '平均处理用时',
          num_2: '1天10小时',
          color: '#60C4AB'
        }
      ],
      overDateTip: [
        {
          id: '1',
          title: '即将签收超期',
          num: '0'
        },
        {
          id: '2',
          title: '即将办结超期',
          num: '19'
        },
        {
          id: '3',
          title: '即将督办超期',
          num: '0'
        }
      ]
    }
  },
  methods: {
    handleSelect() {}
  }
}
</script>

<style lang='scss' scoped>
    .container{
      padding-top:5px;
      height: 100%;
      width: 100%;
      background: #AAD2F4;
      .top{
        width: 100%;
        height: 40%;
        padding: 15px;
        display: flex;
        .left{
          flex:2;
          margin-right: 10px;
          background: rgb(255, 255, 255);
        }
        .center{
          flex:2;
          margin-right: 10px;
          height: 100%;
          display: flex;
          .item{
            height: 100%;
            flex:1;
            margin-right:5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item-top{
              width: 100%;
              height: 56%;
              margin-bottom:4%;
              background: rgb(255, 255, 255);
              padding: 10px;
              .title{
                height: 30%;
                font-size: 22px;
                font-weight: 600;
                display: flex;
                justify-content: flex-start;
                align-items: center;
              }
              .num{
                height: 30%;
                font-size: 36px;
                font-weight: 600;
                display: flex;
                justify-content: flex-end;
                align-items: center;
              }
            }
            .item-bottom{
              width: 100%;
              height: 40%;;
              // background: rgb(250, 178, 178);
              color: rgb(255, 255, 255);
              padding: 10px;
              .title{
                height: 50%;
                font-size: 20px;
                font-weight: 600;
                display: flex;
                justify-content: flex-start;
                align-items: center;
              }
              .num{
                height: 50%;
                font-size: 36px;
                font-weight: 600;
                display: flex;
                justify-content: flex-end;
                align-items: center;
              }
            }
            &:last-of-type{
              margin:0;
              .item-bottom{
                .num{
                  font-size:20px
                }
              }
            }
          }
        }
        .right{
          flex:1;
          background: rgb(255, 255, 255);
          display: flex;
          justify-content: center;
          height: 100%;
          .box{
            height: 100%;
            width: 60%;
            // background: rgb(250, 162, 162);
            .title{
              height: 20%;
              width: 100%;
              display: flex;
              align-items: center;
              font-size: 20px;
              font-weight: 600;
              color: #F38338;
            }
            .items-box{
              height: 80%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              font-size: 20px;
              font-weight: 600;
              padding-bottom: 25px;
              .item{
                width: 100%;
                height: 27%;
                box-sizing: border-box;
                border: 1px rgba(163, 163, 163, 0.205) solid;
                box-shadow: rgb(202, 201, 201) 2px 2px 2px;
                padding: 0 15px;
                .item-title{
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  height: 50%;
                  font-weight: 500;
                }
                .item-num{
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  height: 50%;
                  color: #F38338;
                }
              }
            }
          }
        }
      }
      .bottom{
        width: 100%;
        height: 60%;
        padding: 15px;
        padding-top:0;
        display: flex;
        .left{
          flex:1;
          margin-right: 10px;
          background: rgb(255, 255, 255);
        }
        .center{
          flex:1;
          margin-right: 10px;
          background: rgb(255, 255, 255);
        }
        .right{
          flex:1;
          background: rgb(255, 255, 255);
        }
      }
    }
</style>
