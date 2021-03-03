<template>
  <div class="map-box-layout">
    <el-scrollbar :style="`width:${$slots.default ? (hide === false ? '60%' : '100%') : ''};`">
      <div v-if="$slots.default" class="slot-box">
        <slot />
      </div>
    </el-scrollbar>
    <div
      v-show="hide === false"
      v-loading="mapLoading"
      element-loading-text="地图加载中"
      class="map-box"
      :style="`width:${$slots.default ? '40%' : '100%'};`"
    >
      <div v-if="title" class="map-title">{{ title }}</div>
      <div id="map" :style="`${title ? 'height:calc(100% - 26px)' : ''}`" />
    </div>
  </div>
</template>

<script>
import { lnglat2Address, address2Lnglat } from '@/api/common/address.js'

let map
const fque = []

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    // 隐藏地图
    hide: {
      type: Boolean,
      default: false
    },
    // 点击仅处理坐标
    lnglatOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mapLoading: false
    }
  },
  watch: {
    title(val) {
      map && map.removeAllEntities()
      this.mapLoading = true
      setTimeout(() => {
        this.mapLoading = false
      }, 300)
    }
  },
  created() {
    this.initMap()
  },
  methods: {
    // 经纬度绘制点
    drawAndLocate(lng, lat) {
      if (!map) {
        fque.push(function() {
          lng && lat && map && map.drawPointAndLocate(lng * 1, lat * 1)
        })
        return
      }
      lng && lat && map && map.drawPointAndLocate(lng * 1, lat * 1)
    },
    // 搜索地址并定位点
    searchAddressAndLocate(address) {
      if (this.lnglatOnly !== false) return
      if (!map) {
        fque.push(function() {
          map && address && address2Lnglat(address).then(res => {
            const fea = res.data.features[0]
            const fbbox = fea.bbox
            const lng = (fbbox[0] + fbbox[2]) / 2
            const lat = (fbbox[1] + fbbox[3]) / 2
            map.drawPointAndLocate(lng, lat)
          })
        })
        return
      }
      map && address && address2Lnglat(address).then(res => {
        const fea = res.data.features[0]
        const fbbox = fea.bbox
        const lng = (fbbox[0] + fbbox[2]) / 2
        const lat = (fbbox[1] + fbbox[3]) / 2
        map.drawPointAndLocate(lng, lat)
      })
    },
    // 地图点击事件
    handleClick(lng, lat) {
      this.$emit('selectLnglat', { lng, lat })
      if (this.lnglatOnly !== false) return
      lnglat2Address(lng, lat).then(res => {
        if (res.data.features && res.data.features.length > 0) {
          const fea = res.data.features[0]
          const fpop = fea.properties
          const address = {
            address: fpop.display_name,
            addressId: fpop.place_id,
            addressCode: this.fchain(fpop, 'address.postcode')
          }
          this.$emit('selectAddress', address)
        } else {
          this.$message.warning(`经纬度 [${lng}, ${lat}] 没有匹配到地址！`)
        }
      })
    },
    // 地图依赖运行时引入
    initMap() {
      this.mapLoading = true
      const thiz = this
      import('@/map/ZTCesium.js').then(({ default: ZTcesiumApi }) => {
        const ZTCesium = new ZTcesiumApi()
        map = ZTCesium
        const token = process.env.VUE_APP_CESIUM_TOKEN
        // 加载地图
        ZTCesium.initMap('map', token, ZTCesium.loadingVectorMap())
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
        ZTCesium.leftClickLocation(thiz.handleClick)
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

<style lang='scss' scoped>
.map-box-layout {
  display: flex;
  align-items: stretch;
  height: 600px;
}
.map-box {
  height: 100%;
  margin-left: 20px;
}

.map-title {
  height: 20px;
  margin-bottom: 5px;
  border-bottom: 1px solid lightgray;
}
#map {
  height: 100%;
}
::v-deep .el-scrollbar__view {
  width: calc(100% - 17px);
}
::v-deep .el-scrollbar__wrap {
  height: calc(100% + 17px);
}
</style>
