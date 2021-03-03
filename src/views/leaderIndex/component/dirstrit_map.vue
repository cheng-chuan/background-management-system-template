<template>
  <div class="data_info">
    <TitleCom title="办理量排名">
      <div class="check_line_type">
        <div v-for="(item,index) in line_tabs" :key="index" class="check_line_type_item" :class="timeType == item ? 'active':''" @click="changeLineTabsMethod(item)">
          <span>{{ item }}</span>
        </div>
      </div>
    </TitleCom>
    <div class="map_num">
      <div class="map_num_item">
        <span class="map_num_diver" />
        <span>镇街办理量</span>
        <div class="map_num_item_num">
          <span>{{ reportdimensional.value1 }}</span>
          <span style="font-size:18px">件</span>
        </div>
      </div>
      <div class="map_num_item">
        <span class="map_num_diver" />
        <span>部门办理量</span>
        <div class="map_num_item_num">
          <span>{{ reportdimensional.value2 }}</span>
          <span style="font-size:18px">件</span>
        </div>
      </div>
    </div>
    <div id="map_id" class="map_img">
<!--      <img src="../../../assets/img_map.png">-->
    </div>
    <div class="map_persent">
      <div class="map_persent_item">
        <p>
          <span>超期办结件数</span>
          <img v-if="reportdimensional.value3 - reportdimensional.value4 > 0" src="../../../assets/icon_ss.png">
          <img v-if="reportdimensional.value3 - reportdimensional.value4 < 0" src="../../../assets/icon_xj.png">
        </p>
        <p class="map_persent_item_num">
          <span>{{ reportdimensional.value3 }}</span>
          <span style="font-size:18px">件</span>
        </p>
      </div>

      <div class="map_persent_item">
        <p>
          <span>按期处置率</span>
          <img v-if="reportdimensional.value5 - reportdimensional.value6 > 0" src="../../../assets/icon_ss.png">
          <img v-if="reportdimensional.value5 - reportdimensional.value6 < 0" src="../../../assets/icon_xj.png">
        </p>
        <p class="map_persent_item_num">
          <span>{{ reportdimensional.value5 }}</span>
          <span style="font-size:18px">%</span>
        </p>
      </div>

      <div class="map_persent_item">
        <p>
          <span>按期结案率</span>
          <img v-if="reportdimensional.value7 - reportdimensional.value8 > 0" src="../../../assets/icon_ss.png">
          <img v-if="reportdimensional.value7 - reportdimensional.value8 < 0" src="../../../assets/icon_xj.png">
        </p>
        <p class="map_persent_item_num">
          <span>{{ reportdimensional.value7 }}</span>
          <span style="font-size:18px">%</span>
        </p>
      </div>

    </div>

  </div>
</template>

<script>
import TitleCom from './title.vue'
import moment from 'moment'
const fque = []
let map1
import {
  mapActions,
  mapGetters
} from 'vuex'
export default {
  components: {
    TitleCom
  },
  data() {
    return {
      cuttentTime: moment(new Date().getTime()).format('YYYY-MM-DD'),
      line_tabs: ['当日', '月度', '季度', '年度'],
      mapLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'timeType',
      'reportdimensional',
      'reportsortstrict'
    ])
  },
  created() {
    this.changeTimeTypeMethod('当日')
    this.reportdimensionalMethod({
      reportDay: this.cuttentTime,
      dimensional: '全区办理量'
    })
    this.loadMap()
  },
  methods: {
    ...mapActions([
      'reportdimensionalMethod',
      'changeTimeTypeMethod'
    ]),
    changeLineTabsMethod(item) {
      this.changeTimeTypeMethod(item)
    },
    loadMap(){
      const thiz = this
      import('@/map/ZTCesium.js').then(({ default: ZTcesiumApi }) => {
        const ZTCesium = new ZTcesiumApi()
        map1 = ZTCesium
        const token = process.env.VUE_APP_CESIUM_TOKEN
        // 加载地图
        ZTCesium.initMap('map_id', token, ZTCesium.loadingVectorMap())
        ZTCesium.LoadingMarkedMap()
        ZTCesium.magnifyRank('3324242', '100000000', 0, 0)
        // 隐藏 cesium 图标
        document.getElementsByClassName('cesium-widget-credits')[0].style.display = 'none'
        ZTCesium.initFlyTo(
          {
            'scene': 'true',
            'flyTo': {
              'destination': { 'longitude': '119.43186', 'latitude': '32.39472', 'height': '50500.0' },
              'orientation': { 'heading': '0.0', 'pitch': '-90.0', 'roll': '0.0' }
            }
          }
        )
        // ZTCesium.leftClickLocation(thiz.handleClick)
        thiz.mapLoading = false

        if (fque.length > 0) {
          fque.forEach(func => func())
        }
      }).catch(err => {
        console.error('map init fail', err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.data_info {
    width: 100%;
    height: 100%;
    padding: 0 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .check_line_type {
        height: 30px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        // width: 210px;
        display: flex;
        justify-content: center;
        align-items: center;

        .check_line_type_item {
            width: 100px;
            height: 30px;
            background-color: #f5f5f5;
            color: #999999;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-right: 10px;

            &:nth-last-of-type(1) {
                margin-right: 0;
            }

            &.active {
                color: #4c95fd;
                background-color: #e2f6ff;
            }
        }
    }

    .map_num {
        height: 84px;
        width: 100%;
        display: flex;
        justify-content: space-around;

        .map_num_item {
            height: 100%;
            display: flex;
            font-size: 18px;
            color: #000000;
            justify-content: center;
            align-items: center;

            .map_num_diver {
                display: block;
                width: 6px;
                height: 17px;
                background-color: #4191ff;
                margin-right: 10px;
            }

            .map_num_item_num {
                color: #4191ff;
                font-size: 30px;
                margin-left: 30px;
            }

        }
    }

    .map_img {
        height: 313px;
        width: 100%;
        background-color: #f7fcfe;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .map_persent {
        width: 100%;
        flex: 1;
        background-color: #f5f7fa;
        border-radius: 10px;
        display: flex;

        .map_persent_item {
            height: 100%;
            flex: 1;
            padding-top: 20px;
            box-sizing: border-box;

            p {
                text-align: center;
                font-size: 18px;
                display: flex;
                justify-content: center;

                img {
                    display: block;
                    width: 12px;
                    height: 15px;
                    margin-left: 10px;
                }
            }

            .map_persent_item_num {
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;

                &:nth-of-type(1) {
                    color: #ef354b;
                    ;
                }

                &:nth-of-type(2) {
                    color: #2082ff;
                    ;
                }

                &:nth-of-type(3) {
                    color: #2cc330;
                    ;
                }
            }
        }
    }

}
</style>
