/* eslint-disable */
import * as turf from '@turf/center-of-mass'
import '@/../node_modules/cesium/Source/Widgets/widgets.css'
import * as Cesium from '@/../node_modules/cesium/Source/Cesium.js'


class ZTCesium {
  constructor() {
    this.handler = null
    this.token = null
    this.viewer = null
    // 绘制的数组
    this.tempEntities = []
    this.scenepri = null
    this.tileset = null
    // 第二次绘制
    this.redraw = null
    this.polygonGeometryArray = []
    // 是否全屏
    this.fullScreeState = false
    // 树控件
    this.isLoad3DLayers = null
    this.layer3DList = []
    this.treeObj = null
    this.pointEntityArray = []
    this.heatmapArray = []
    this.feature = null
    this.entityArr = null
    this.array = []
    this.ScanPostStageArray = []
  }
  initMap(id, token, imageryProvider) {
    this.token = token
    Cesium.Ion.defaultAccessToken = token
    // 中国 区域；
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90)
    this.viewer = new Cesium.Viewer(id, {
      animation: false, // 是否创建动画小器件，左下角仪表
      baseLayerPicker: false, // 是否显示图层选择器
      fullscreenButton: false, // 是否显示全屏按钮
      geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
      homeButton: false, // 是否显示Home按钮
      sceneModePicker: false, // 是否显示3D/2D选择器
      selectionIndicator: false, // 是否显示选取指示器组件
      timeline: false, // 是否显示时间轴
      sceneMode: Cesium.SceneMode.SCENE3D, // 设定3维地图的默认场景模式:Cesium.SceneMode.SCENE2D、Cesium.SceneMode.SCENE3D、Cesium.SceneMode.MORPHING
      navigationHelpButton: false, // 是否显示右上角的帮助按钮
      scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      navigationInstructionsInitiallyVisible: false,
      showRenderLoopErrors: false, // 是否显示渲染错误
      // 设置背景透明
      orderIndependentTranslucency: false,
      infoBox: false, // 是否显示点击要素之后显示的信息
      imageryProvider: imageryProvider,
      contextOptions: {
        webgl: {
          alpha: true
        }
      }
    })
    this.viewer.camera.flyHome(2)
    this.viewer.scene.globe.depthTestAgainstTerrain = true
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
  }
  /**
   * 加载标注
   *
   **/
  LoadingMarkedMap() {
    var markLayer = new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb',
      layer: 'tdtImgAnnoLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      show: false
    }) // 注记图层
    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(markLayer)
    // 设置图层的透明度
    imageryLayer.alpha = 0.9
  }
  /**
   * 加载天地图
   *
   *  */
  loadingMap() {
    const matrixIds = []
    for (let i = 0; i < 19; ++i) {
      matrixIds[i] = i + 1
    }
    return new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.com/img_c/wmts?tk=ebf64362215c081f8317203220f133eb',
      layer: 'img',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'c',
      tileMatrixLabels: matrixIds,
      maximumLevel: 20, // 解决此级别无影像问题
      tilingScheme: new Cesium.GeographicTilingScheme({
        numberOfLevelZeroTilesX: 2,
        numberOfLevelZeroTilesY: 1
      }),
      show: true
    })
  }

  /**
   * 加载矢量底图天地图
   *
   *  */
  loadingVectorMap() {
    const matrixIds = []
    for (let i = 0; i < 22; ++i) {
      matrixIds[i] = i + 1
    }
    return new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.com/vec_w/wmts?' +
        'service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&' +
        'TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&' +
        'style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb',
      layer: 'tdtVecBasicLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'w',
      show: true
    })
  }
  /**
   *加载Mapbox地图
   */
  loadingMapboxMap() {
    return new Cesium.MapboxImageryProvider({
      mapId: 'mapbox.streets', // mapbox提供了三种类型 mapbox.streets  mapbox.satellite mapbox.streets-basic
      accessToken: 'sk.eyJ1IjoicG9wc3RhciIsImEiOiJjam1rZXc4cXQwYW5vM3BwOWJ3MHd5eXVtIn0.QFM5ceDQ17WwBXVssyVJYA'
    })
  }
  /**
   *加载ArcGIS地图
   */
  loadingArcGISMap() {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    })
  }

  /**
   * 加载ArcGIS矢量底图
   * @returns {module:cesium.ArcGisMapServerImageryProvider}
   */
  loadingArcGISVectorMap() {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
    })
  }
  /**
   * 加载ArcGIS矢量底图
   * 午夜蓝
   * @returns {module:cesium.ArcGisMapServerImageryProvider}
   */
  loadingArcGISVectorMap1() {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
    })
  }
  /**
   * 加载ArcGIS矢量底图
   * 暖色版
   * @returns {module:cesium.ArcGisMapServerImageryProvider}
   */
  loadingArcGISVectorMap2() {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer'
    })
  }
  /**
   * 加载ArcGIS矢量底图
   * 灰色版
   * @returns {module:cesium.ArcGisMapServerImageryProvider}
   */
  loadingArcGISVectorMap3() {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer'
    })
  }
  /**
   * 加载ArcGIS矢量底图
   * 彩色版
   * @returns {module:cesium.ArcGisMapServerImageryProvider}
   */
  loadingArcGISVectorMap4() {
    return new Cesium.ArcGisMapServerImageryProvider({
      url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer'
    })
  }
  /**
   * 地球直接定位
   */
  location() {
    const _this = this
    _this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(119.57, 32.36, 63.40) // 定位坐标点，建议使用谷歌地球坐标位置无偏差
    })
  }

  /**
   * 放大 缩小级别
   */
  magnifyRank(minHeight, maxHeight) {
    const _this = this
    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)

    // 监听鼠标滚轮放大，缩小的方法
    _this.handler.setInputAction(function (wheelment) {
      var height = _this.viewer.camera.positionCartographic.height

      // //放大
      // if (height < parseFloat(maxHeight)) {
      //     _this.viewer.camera.setView({
      //         destination: Cesium.Cartesian3.fromRadians(_this.viewer.camera.positionCartographic.longitude, _this.viewer.camera.positionCartographic.latitude, parseFloat(maxHeight))
      //     });
      // };
      // 缩小
      if (height > parseFloat(minHeight)) {
        _this.viewer.camera.setView({
          destination: Cesium.Cartesian3.fromRadians(_this.viewer.camera.positionCartographic.longitude, _this.viewer.camera.positionCartographic.latitude, parseFloat(minHeight))
        })
      }
    }, Cesium.ScreenSpaceEventType.WHEEL)
  }
  /**
   *加载谷歌地图
   */
  loadingGoogleMap() {
    return new Cesium.UrlTemplateImageryProvider({
      url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
    })
  }
  /**
   *加载CesiumBlack底图
   *
   */
  loadingCesiumBlack() {
    return new Cesium.OpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/'
      // credit: 'Black Marble imagery courtesy NASA Earth Observatory',
      // flipXY: true,
      // splitDirection: Cesium.ImagerySplitDirection.LEFT
    })
  }
  /**
   *加载osm底图
   */
  osm() {
    return new Cesium.OpenStreetMapImageryProvider({
      url: 'https://stamen-tiles.a.ssl.fastly.net/toner/' // https://stamen-tiles.a.ssl.fastly.net/watercolor/、https://stamen-tiles.a.ssl.fastly.net/toner/
    })
  }
  /**
   * 加载3DTileset场景
   * json数据加载3d模型
   *  @param  optios:{
   *                     url:'http://58.220.249.164:8110/yangzhou500/094/tileset.json',
   *                     scene:  true，   //布尔值
   *                     flyTo：{
   *                          destination:{longitude：119.57，latitude：32.36，height：63.40}或者destination:{west：''119.57 , south:''119.51 , east :''119.2, north:'113.4'},
   *                          orientation: { heading:0.0,  pitch:-25.0, roll:0.0  } ,//数字类型
   *                          duration:67                                //数字类型 以秒为单位
   *                          endTransform:''                          //Matrix4类型
   *                           maximumHeight:222                //数字类型
   *                           pitchAdjustHeight:233              //数字类型
   *                           flyOverLongitude:45                 //数字类型
   *                           flyOverLongitudeWeight:344   //数字类型
   *                           convert:true                              //Boolean类型
   *                    }
   *                }
   */
  load3DTilesetScene(optios, completeCallback, cancelCallback, easingCallback) {
    this.tileset = new Cesium.Cesium3DTileset({
      url: optios.url,
      clampToGround: true
    })
    this.viewer.scene.globe.depthTestAgainstTerrain = false
    this.scenepri = this.viewer.scene.primitives
    this.scenepri.add(this.tileset)
    /* 帧率显示*/
    this.viewer.scene.debugShowFramesPerSecond = optios.scene ? optios.scene : true
    Cesium.createWorldTerrain()
    // 移动位置
    this.initFlyTo(optios, completeCallback, cancelCallback, easingCallback)
    // 3d模型 贴地
    this.tileset.readyPromise.then(this.zoomToTileset)
  }
  /**
   *初始化加载，并移动到指定位置
   */
  initFlyTo(optios, completeCallback, cancelCallback, easingCallback) {
    this.viewer.camera.flyTo({
      // 目标
      destination: optios.flyTo ? optios.flyTo.destination.longitude ? Cesium.Cartesian3.fromDegrees(parseFloat(optios.flyTo.destination.longitude), parseFloat(optios.flyTo.destination.latitude), parseFloat(optios.flyTo.destination.height)) : new Cesium.Rectangle(parseFloat(optios.flyTo.destination.west), parseFloat(optios.flyTo.destination.south), parseFloat(optios.flyTo.destination.east), parseFloat(optios.flyTo.destination.north)) : '',
      orientation: {
        // //走向
        heading: Cesium.Math.toRadians(optios.flyTo ? optios.flyTo.orientation.heading ? parseFloat(optios.flyTo.orientation.heading) : '' : ''),
        pitch: Cesium.Math.toRadians(optios.flyTo ? optios.flyTo.orientation.pitch ? parseFloat(optios.flyTo.orientation.pitch) : '' : ''),
        // 翻转
        roll: optios.flyTo ? optios.flyTo.orientation.roll ? parseFloat(optios.flyTo.orientation.roll) : '' : ''
      },
      //   //如果省略，Cesium会尝试根据飞行飞行的距离来计算理想持续时间。
      duration: optios.flyTo ? optios.flyTo.duration ? parseFloat(optios.flyTo.duration) : '' : '',
      //   //飞行结束后执行的功能
      complete: completeCallback || '',
      //   //取消航班后执行的功能。
      cancel: cancelCallback || '',
      //   //表示飞行完成后相机将位于的参考帧的变换矩阵
      //   endTransform:optios.flyTo?optios.flyTo.endTransform?optios.flyTo.endTransform:'':'',
      //   //飞行高峰时的最大高度。
      maximumHeight: optios.flyTo ? optios.flyTo.maximumHeight ? parseFloat(optios.flyTo.maximumHeight) : '' : '',
      //   //如果相机的飞行角度高于该值，请在飞行过程中调整俯仰角度以向下看，并将地球保持在视口中。
      pitchAdjustHeight: optios.flyTo ? optios.flyTo.pitchAdjustHeight ? parseFloat(optios.flyTo.pitchAdjustHeight) : '' : '',
      //  //地球上2点之间总是有两种方法。此选项会迫使相机选择战斗方向以在该经度上飞行。
      flyOverLongitude: optios.flyTo ? optios.flyTo.flyOverLongitude ? parseFloat(optios.flyTo.flyOverLongitude) : '' : '',
      // //仅在通过flyOverLongitude指定的lon上飞过，只要该方式的时间不超过flyOverLongitudeWeight的短途时间。
      flyOverLongitudeWeight: optios.flyTo ? optios.flyTo.flyOverLongitudeWeight ? parseFloat(optios.flyTo.flyOverLongitudeWeight) : '' : '',
      //   //是否将目的地从世界坐标转换为场景坐标（仅在不使用3D时相关）。默认为 true 。
      convert: optios.flyTo ? optios.flyTo.convert ? optios.flyTo.convert : true : true,
      //   //控制在飞行过程中如何插值时间
      easingFunction: easingCallback || ''
    })
  }
  zoomToTileset() {
    const boundingSphere = this.tileset.boundingSphere
    this.viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0))
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this.changeHeight(0.2)
  }
  /**
   * 3 D Tiles， 并调整位置， 贴地
   *  @param height 数字类型  ‘0.2’
   */
  changeHeight(height) {
    height = Number(height)
    if (isNaN(height)) {
      return
    }
    const cartographic = Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center)
    const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height)
    const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height)
    const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
    this.tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
  }

  /**
   * 加载arcgisServices发布的地图场景
   * @param optios:{
   *           url:'http://t0.tianditu.gov.cn/img_w/wmts?tk=92e050a2a7b9a6baedebf291312a7af9' ， //字符串
   *           layer：'img',                                                               //字符串
   *        }
   */
  loadArcgisScene(optios, completeCallback, cancelCallback, easingCallback) {
    let layer = '0'
    for (var i = 1; i < 14; i++) {
      layer += ',' + i
    }
    var layers = this.viewer.imageryLayers
    var layerT = new Cesium.ArcGisMapServerImageryProvider({
      url: optios.url,
      layers: name,
      crs: 'EPSG:4326',
      parameters: {
        service: 'WMS',
        format: 'image/png',
        transparent: true
      }
    })

    layers.addImageryProvider(layerT)
    this.initFlyTo(optios, completeCallback, cancelCallback, easingCallback)
  }
  /**
   * 加载场景
   * optios     //配置项
   * completeCallback   //完成回调函数
   * cancelCallback        //取消回调函数
   * easingCallback       //控制在飞行过程中回调函数
   */

  loadScene(optios, completeCallback, cancelCallback, easingCallback) {
    if (!optios) {
      return
    }
    const configData = JSON.parse(optios)
    const url = configData.url
    if (url.indexOf('json') != '-1') {
      this.load3DTilesetScene(configData, completeCallback, cancelCallback, easingCallback)
    } else {
      this.loadArcgisScene(configData, completeCallback, cancelCallback, easingCallback)
    }
  }
  /**
   * 动态调整广告牌的偏移量
   * @param x
   * @param y
   */
  billboardOffset(x, y) {
    if (!this.pointEntityArray.length) {
      return
    }
    for (var p = 0; p < this.pointEntityArray.length; p++) {
      this.pointEntityArray[p]._billboard._pixelOffset._value = new Cesium.Cartesian2(x, y)
    }
  }
  /**
   *定位区域
   */
  locationArea(feature, options) {
    this.viewer.camera.flyTo({
      // 指定区域的地理坐标；
      //  longitude:经度
      //   latitude:纬度
      //   height:高度
      //   ellipsoid:椭球体:
      destination: Cesium.Cartesian3.fromDegrees(parseFloat(options.flyTo.destination.longitude), parseFloat(options.flyTo.destination.latitude), parseFloat(options.flyTo.destination.height)),
      orientation: {
        // 方位
        heading: Cesium.Math.toRadians(parseFloat(options.flyTo.offset.heading)),
        // 角度；-87.5
        pitch: Cesium.Math.toRadians(parseFloat(options.flyTo.offset.pitch)),
        // 范围 0
        roll: parseFloat(options.flyTo.offset.roll)

      }
    })

    this.newDrawingArea(feature, options)
  }
  /**
   生成行政区块新代码
   * @param {*} feature
   */
  newDrawingArea(feature, options) {
    this.feature = feature
    var obj = new Cesium.EntityCollection()
    var PrimitivesObj = {
      area: [],
      areaLine: [],
      label: []
    }
    for (let index = 0; index < this.feature.length; index++) {
      var element = this.feature[index]
      var coorArray = this.coorToArray2(element.geometry.coordinates[0])
      var polygon = turf.polygon(element.geometry.coordinates)
      var centerPoint = turf.centerOfMass(polygon).geometry.coordinates
      /** --暂时先注释 打开后地图不能平移--**/
      // var tt = this.viewer.entities.add(new Cesium.Entity({
      //   position: Cesium.Cartesian3.fromDegrees(centerPoint[0], centerPoint[1], 0),
      //   show: true,
      //   label: {
      //     scale: 6,
      //     text: element.properties.name == undefined ? "面" : element.properties.name,
      //     font: '200px KaiTi',
      //     fillColor: Cesium.Color.WHITE,
      //     //style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //     //disableDepthTestDistance:1000,
      //     horizontalOrigin: 0,
      //     outlineWidth: 5,
      //     showBackground: false,
      //     style: 2,
      //     //verticalOrigin:2,
      //     //垂直位置
      //     verticalOrigin: Cesium.VerticalOrigin.CENTER,
      //     //中心位置
      //     pixelOffset: new Cesium.Cartesian2(0, 30),
      //     disableDepthTestDistance: 100000,
      //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000)
      //     //heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
      //   },
      //   //properties: {
      //   // lng: element.geometry.coordinates[0],
      //   // lat: element.geometry.coordinates[1]
      //   //}
      //
      // }));
      // PrimitivesObj.label.push(tt);
      // this.viewer.trackedEntity = tt;
      /** --完成--**/
      // 行政区域边框线
      var instance1 = new Cesium.GeometryInstance({
        id: this.feature[index].properties.name + 'Polyline',
        geometry: new Cesium.GroundPolylineGeometry({
          id: this.feature[index].properties.name,
          positions: Cesium.Cartesian3.fromDegreesArray(coorArray),
          // 面的边框大小
          width: options.polygon[index].width
          // vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
        }),
        attributes: {
          // 边框线的色
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.fromCssColorString(options.polygon[index].outlineColor)
          )

        }
      })
      var primitives = this.viewer.scene.groundPrimitives.add(new Cesium.GroundPolylinePrimitive({
        geometryInstances: instance1,
        appearance: new Cesium.PolylineColorAppearance(),
        allowPicking: true // 控制是否拾取
      }))
      PrimitivesObj.areaLine.push(primitives)
      // 行政区面
      var instance2 = new Cesium.GeometryInstance({
        geometry: new Cesium.PolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(coorArray)),
          material: new Cesium.ColorMaterialProperty(Cesium.Color.WHITE),
          perPositionHeight: false
        }),
        attributes: {
          // 面的颜色
          color: new Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.LIGHTSKYBLUE.withAlpha(0.2))
        },
        name: element.properties.name,
        id: element.properties.name + coorArray[0]

      })

      // 使用抽象的Primitive而不是RectanglePrimitive
      var Primitives = this.viewer.scene.groundPrimitives.add(new Cesium.GroundPrimitive({
        geometryInstances: instance2,
        appearance: new Cesium.PerInstanceColorAppearance({
          translucent: false
        }),
        allowPicking: true // 控制是否拾取

        // 使用该外观，可以使矩形覆盖在地球表面，或者悬浮一定的高度
        // appearance : new Cesium.PolylineMaterialAppearance({
        // 	material : Cesium.Material.fromType(Cesium.Color.CORAL)
        //   })

      }))
      PrimitivesObj.area.push(Primitives)
    }

    if (options) {
      if (options.isSecondLoad) {
        this.array = PrimitivesObj
        return
      }
    }
    this.entityArr = PrimitivesObj
  }

  /**
   *二维数组转一维数组
   * @param coor
   * @returns {[]}
   */
  coorToArray2(coor) {
    const arrayPoint = []
    for (var i = 0; i < coor.length; i++) {
      arrayPoint.push(coor[i][0])
      arrayPoint.push(coor[i][1])
    }
    return arrayPoint
  }
  /**
   * 绘点
   */
  drawPoint() {
    const _this = this
    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
    _this.handler.setInputAction(function (movement) {
      const position = _this.viewer.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid)
      const point = _this.paintingPoint(position)
      _this.tempEntities.push(point)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    _this.handler.setInputAction(function () {
      // 关闭事件句柄
      if (_this.handler) {
        _this.handler.destroy()
        _this.handler = null
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    _this.handler.setInputAction(function () {
      // 关闭事件句柄
      if (_this.handler) {
        _this.handler.destroy()
        _this.handler = null
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }
  /**
   *
   * @param position
   * @param config
   * @returns {Entity}
   */
  paintingPoint(position) {
    // let config = config ? config : {};
    const pointGeometry = this.viewer.entities.add({
      name: '点几何对象',
      position: position,
      point: {
        // 点心的颜色
        color: Cesium.Color.SKYBLUE,
        pixelSize: 10,
        // 轮廓的颜色
        outlineColor: Cesium.Color.YELLOW,
        // 轮廓的线的大小
        outlineWidth: 3,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    })
    return pointGeometry
  }
  /**
   * 绘制线
   */
  drawPolyline() {
    const _this = this
    if (_this.handler) {
      // 关闭事件句柄
      _this.handler.destroy()
      _this.handler = null
    }
    let tempPoints = []
    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
    // 左键点击操作
    _this.handler.setInputAction(function (click) {
      // 调用获取位置信息的接口
      const position = _this.viewer.camera.pickEllipsoid(click.position, _this.viewer.scene.globe.ellipsoid)
      tempPoints.push(position)
      const tempLength = tempPoints.length
      // 调用绘制点的接口
      const point = _this.paintingPoint(tempPoints[tempPoints.length - 1])
      _this.tempEntities.push(point)
      if (tempLength > 1) {
        const pointline = _this.paintingPolyline([tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]])
        _this.tempEntities.push(pointline)
      }
      return
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    // 右键点击操作
    _this.handler.setInputAction(function (click) {
      tempPoints = []
      // 关闭事件句柄
      if (_this.handler) {
        _this.handler.destroy()
        _this.handler = null
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  /**
   * 地图点击事件
   * @param callback
   */
  mapClick(callback) {
    const _this = this
    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
    _this.handler.setInputAction(function (movement) {
      const pickedFeature = _this.viewer.scene.pick(movement.position)
      if (callback) {
        callback(pickedFeature)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  /**
   * 地图点击事件 获取经纬度
   * @param callback
   */
  leftClickLocation(callback) {
    const _this = this
    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
    _this.handler.setInputAction(function (click) {
      // 调用获取位置信息的接口
      const position = _this.viewer.camera.pickEllipsoid(click.position, _this.viewer.scene.globe.ellipsoid)
      var cartographic = _this.viewer.scene.globe.ellipsoid.cartesianToCartographic(position)
      var longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
      _this.drawPointAndLocate(longitudeString, latitudeString)
      callback && callback(longitudeString, latitudeString)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  removeAllEntities(){
    this.viewer.entities.removeAll()
  }

  /**
   * 绘制点并定位点
   */
  drawPointAndLocate(lng, lat) {
    this.viewer.entities.removeAll()
    this.paintingPoint(Cesium.Cartesian3.fromDegrees(lng, lat))
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lng, lat, this.viewer.camera.positionCartographic.height),
      duration: 0.5
    });
  }

  /**
   * 鼠标移动到面上，高亮
   */
  hightlightLine() {
    const _this = this
    let highlightFace = null
    var attributes
    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
    _this.handler.setInputAction(function (movement) {
      if (highlightFace) {
        if (highlightFace.hasOwnProperty('pickId')) {
          if (highlightFace.pickId.object.id.indexOf('Polyline') > '-1') {
            highlightFace.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.CYAN)
          } else {
            highlightFace.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.LIGHTSKYBLUE.withAlpha(0.2))
          }
        }
      }
      // movement.endPosition鼠标移动
      // movement.position鼠标点击
      var pickedFeature = _this.viewer.scene.pick(movement.endPosition)
      if (!pickedFeature || !pickedFeature.primitive.getGeometryInstanceAttributes) {
        return
      }
      attributes = pickedFeature.primitive.getGeometryInstanceAttributes(pickedFeature.id)
      pickedFeature.colorOld = attributes.color
      attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.DARKRED.withAlpha(0.2))
      highlightFace = attributes
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }

  /**
   * 创建线
   * @param positions
   * @param config
   * @returns {Entity}
   */
  paintingPolyline(positions, config) {
    if (positions.length < 1) return
    var config = config || {}
    var polylineGeometry = this.viewer.entities.add({
      name: '线几何对象',
      polyline: {
        positions: positions,
        width: config.width ? config.width : 5.0,
        material: new Cesium.PolylineGlowMaterialProperty({
          color: config.color ? new Cesium.Color.fromCssColorString(config.color) : Cesium.Color.GOLD
        }),
        depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
          color: config.color ? new Cesium.Color.fromCssColorString(config.color) : Cesium.Color.GOLD
        })
      }
    })
    return polylineGeometry
  }

  /**
   *绘面
   */
  drawPolygon() {
    const _this = this
    if (_this.handler) {
      // 关闭事件句柄
      _this.handler.destroy()
      _this.handler = null
    }
    const tempPoints = []
    let longitudeString
    let latitudeString
    let cartesianArray = []
    // 定义是不得重复按了右键
    let isOff = true
    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
    // 左键点击操作
    _this.handler.setInputAction(function (click) {
      // 调用获取位置信息的接口
      const position = _this.viewer.camera.pickEllipsoid(click.position, _this.viewer.scene.globe.ellipsoid)
      var cartographic = _this.viewer.scene.globe.ellipsoid.cartesianToCartographic(position)
      // 将弧度转为度的十进制度表示
      longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
      latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
      cartesianArray.push(longitudeString)
      cartesianArray.push(latitudeString)
      tempPoints.push(position)
      const tempLength = tempPoints.length
      // 调用绘制点的接口
      const point = _this.paintingPoint(position)
      _this.tempEntities.push(point)
      if (tempLength > 1) {
        //   const pointline = _this.paintingPolyline([tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1]])
        //   _this.tempEntities.push(pointline)

      }
      return
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    // 右键点击操作
    _this.handler.setInputAction(function (click) {
      const cartesian = _this.viewer.camera.pickEllipsoid(click.position, _this.viewer.scene.globe.ellipsoid)
      if (cartesian) {
        const tempLength = tempPoints.length
        if (tempLength < 3) {
          alert('请选择3个以上的点再执行闭合操作命令')
        } else {
          if (isOff) {
            cartesianArray.push(cartesianArray[0])
            cartesianArray.push(cartesianArray[1])
            _this.polygonBorder(cartesianArray)

            _this.paintingPolygon(tempPoints, cartesianArray)
            cartesianArray = []
            isOff = false
          }
          // 闭合最后一条线
          //  const pointline = _this.paintingPolyline([tempPoints[tempPoints.length - 1], tempPoints[0]])
          // _this.tempEntities.push(pointline)
          //  _this.paintingPolygonFn(cartesianArray)

          _this.tempEntities.push(tempPoints)
          if (_this.handler) {
            // 关闭事件句柄
            _this.handler.destroy()
            _this.handler = null
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }
  /**
   * 面的边框线
   */

  polygonBorder(coorArray) {
    const instance1 = new Cesium.GeometryInstance({
      geometry: new Cesium.GroundPolylineGeometry({
        positions: Cesium.Cartesian3.fromDegreesArray(coorArray),
        // 面的边框大小
        width: 1
        // vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
      }),
      attributes: {
        // 边框线的色
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.fromCssColorString('#f5d812')
        )

      }
    })
    const primitives = this.viewer.scene.groundPrimitives.add(new Cesium.GroundPolylinePrimitive({
      geometryInstances: instance1,
      appearance: new Cesium.PolylineColorAppearance(),
      allowPicking: false // 控制是否拾取
    }))
    this.polygonGeometryArray.push(primitives)
  }
  /**
   * 删除绘制的实体
   */
  removeDrawLayer() {
    if (this.tempEntities.length > 0) {
      for (var l = 0; l < this.tempEntities.length; l++) {
        this.viewer.entities.remove(this.tempEntities[l])
      }
      this.tempEntities = []
    }

    if (this.polygonGeometryArray.length > 0) {
      for (var e = 0; e < this.polygonGeometryArray.length; e++) {
        this.viewer.scene.groundPrimitives.remove(this.polygonGeometryArray[e])
      }
      this.polygonGeometryArray = []
    }
  }
  /**
   *删除地图上所有的标注
   *所有的实体都删除
   *his
   *
   */
  entitiesRemoveAll() {
    const _this = this
    if (_this.array && _this.array.areaLine) {
      let obj = _this.array.areaLine.pop()
      while (obj) {
        _this.viewer.scene.groundPrimitives.remove(obj)
        obj = _this.array.areaLine.pop()
      }
    }

    for (var l = 0; l < _this.ScanPostStageArray.length; l++) {
      _this.viewer.scene.postProcessStages.remove(_this.ScanPostStageArray[l])
    }
    _this.imgLocationRemoveAll()
    _this.ScanPostStageArray = []
    _this.pointEntityArray = []
  }
  /**
   * 创建面
   * @param positions[{
         x: -2661281.48908793,
         y: 4690396.97114921,
         z: 3394222.2464868706
     }, {
         x: -2661279.5847521084,
         y: 4690402.264419116,
         z: 3394216.463919775
     }]
   * @param cartesianArray[119.56988042898826,32.360020706744905, 119.5699751453363, 32.35993943183243, 119.5699069940086, 32.35981112953332]
   * @returns {Entity}
   */
  paintingPolygon(positions, cartesianArray) {
    const _this = this
    const coordinatesArray = []
    _this.viewer.scene.globe.depthTestAgainstTerrain = false

    if (positions.length < 2) {
      return
    }

    // 行政区面
    var instance2 = new Cesium.GeometryInstance({
      geometry: new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(cartesianArray)),
        //  material: new Cesium.ColorMaterialProperty(Cesium.Color.WHITE),
        perPositionHeight: false
      }),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('#FFD700').withAlpha(0.2))
      }
    })

    // 使用抽象的Primitive而不是RectanglePrimitive
    var polygonGeometry = _this.viewer.scene.groundPrimitives.add(new Cesium.GroundPrimitive({
      geometryInstances: instance2,
      appearance: new Cesium.PerInstanceColorAppearance({
        translucent: false
      }),
      allowPicking: false // 控制是否拾取

      // 使用该外观，可以使矩形覆盖在地球表面，或者悬浮一定的高度
      // appearance : new Cesium.PolylineMaterialAppearance({
      // 	material : Cesium.Material.fromType(Cesium.Color.CORAL)
      //   })

    }))
    _this.polygonGeometryArray.push(polygonGeometry)
  }

  /**
   * 创建面的第二种方法
   *二维场景下建的面
   */

  paintingPolygonFn(tempPoints) {
    var polygonGeometry = this.viewer.entities.add({
      name: '线几何对象',
      polygon: {
        height: 0.1,
        hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(tempPoints)),
        material: new Cesium.Color.fromCssColorString('#FFD700').withAlpha(0.2),
        perPositionHeight: true
      }
    })
    return polygonGeometry
  }

  /**
   * 测面
   */
  measuringArea() {
    const _this = this
    // 如果定义了事件句柄就消毁；
    if (_this.handler) {
      _this.handler.destroy()
      _this.handler = null
    }
    // 取消双击事件-追踪该位置
    _this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    // 鼠标事件
    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene._imageryLayerCollection)
    var positions = []
    var tempPoints = []
    var polygon = null
    // var tooltip = document.getElementById("toolTip");
    var cartesian = null
    var floatingPoint // 浮动点
    // tooltip.style.display = "block";
    // 鼠标移动
    _this.handler.setInputAction(function (movement) {
      // tooltip.style.left = movement.endPosition.x + 3 + "px";
      // tooltip.style.top = movement.endPosition.y - 25 + "px";
      // tooltip.innerHTML ='<p>单击开始，右击结束</p>';
      // cartesian = viewer.scene.pickPosition(movement.endPosition);
      const ray = _this.viewer.camera.getPickRay(movement.endPosition)
      cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
      // cartesian = this.viewer.scene.camera.pickEllipsoid(movement.endPosition, this.viewer.scene.globe.ellipsoid);
      if (positions.length >= 2) {
        if (!Cesium.defined(polygon)) {
          // 删除重复生成的面
          const listeners = _this.viewer.entities._entities._array
          for (var v = 0; v < listeners.length; v++) {
            if (listeners[v]._name == '多边形') {
              _this.viewer.entities.remove(listeners[v])
            }
          }
          // _this.viewer.entities.remove()
          polygon = new PolygonPrimitive(positions)
        } else {
          positions.pop()
          // cartesian.y += (1 + Math.random());
          positions.push(cartesian)
        }
        // tooltip.innerHTML='<p>'+distance+'米</p>';
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    // 左点击
    _this.handler.setInputAction(function (movement) {
      // 判断是不是第二次测面积;
      if (_this.redraw) {
        _this.viewer.entities.add({
          name: '重绘多边形面积',
          position: _this.redraw[_this.redraw.length - 1],
          polygon: {
            hierarchy: {
              positions: _this.redraw
            },
            material: new Cesium.Color.fromCssColorString('#FFD700').withAlpha(0.2),
            arcType: Cesium.ArcType.RHUMB
          }
        })
        _this.redraw = null
      }
      // tooltip.style.display = "none";
      // cartesian = viewer.scene.pickPosition(movement.position);
      const ray = _this.viewer.camera.getPickRay(movement.position)
      cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
      // cartesian = this.viewer.scene.camera.pickEllipsoid(movement.position, this.viewer.scene.globe.ellipsoid);
      if (positions.length == 0) {
        positions.push(cartesian.clone())
      }
      // positions.pop();
      positions.push(cartesian)
      // 在三维场景中添加点
      var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1])
      var longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
      var heightString = cartographic.height
      tempPoints.push({
        lon: longitudeString,
        lat: latitudeString,
        hei: heightString
      })
      floatingPoint = _this.viewer.entities.add({
        name: '多边形面积',
        position: positions[positions.length - 1],
        point: {
          color: Cesium.Color.SKYBLUE,
          pixelSize: 10,
          // 轮廓的颜色
          outlineColor: Cesium.Color.YELLOW,
          // 轮廓的线的大小
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND

        }
      })
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    // 右点击
    _this.handler.setInputAction(function (movement) {
      if (_this.handler) {
        _this.handler.destroy()
        _this.handler = null
      }
      positions.pop()
      // tempPoints.pop();
      //  _this.viewer.entities.remove(floatingPoint)
      // tooltip.style.display = "none";
      // 在三维场景中添加点
      // var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
      // var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
      // var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
      // var heightString = cartographic.height;
      // tempPoints.push({ lon: longitudeString, lat: latitudeString ,hei:heightString});
      // 获取面积
      var textArea = getArea(tempPoints) + '平方公里'
      _this.viewer.entities.add({
        name: '多边形面积',
        position: positions[positions.length - 1],
        // point : {
        //  pixelSize : 5,
        //  color : Cesium.Color.RED,
        //  outlineColor : Cesium.Color.WHITE,
        //  outlineWidth : 2,
        //  heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
        // },

        label: {
          text: textArea,
          font: '18px sans-serif',
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(20, -40),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      })
      _this.redraw = positions
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

    var radiansPerDegree = Math.PI / 180.0 // 角度转化为弧度(rad)
    var degreesPerRadian = 180.0 / Math.PI // 弧度转化为角度

    // 计算多边形面积
    function getArea(points) {
      var res = 0
      // 拆分三角曲面

      for (var i = 0; i < points.length - 2; i++) {
        var j = (i + 1) % points.length
        var k = (i + 2) % points.length
        var totalAngle = Angle(points[i], points[j], points[k])

        var dis_temp1 = distance(positions[i], positions[j])
        var dis_temp2 = distance(positions[j], positions[k])
        res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle))
      }

      return (res / 1000000.0).toFixed(4)
    }

    /* 角度*/
    function Angle(p1, p2, p3) {
      var bearing21 = Bearing(p2, p1)
      var bearing23 = Bearing(p2, p3)
      var angle = bearing21 - bearing23
      if (angle < 0) {
        angle += 360
      }
      return angle
    }
    /* 方向*/
    function Bearing(from, to) {
      var lat1 = from.lat * radiansPerDegree
      var lon1 = from.lon * radiansPerDegree
      var lat2 = to.lat * radiansPerDegree
      var lon2 = to.lon * radiansPerDegree
      var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2))
      if (angle < 0) {
        angle += Math.PI * 2.0
      }
      angle = angle * degreesPerRadian // 角度
      return angle
    }
    // 创建绘面的构造函数
    var PolygonPrimitive = (function () {
      function _(positions) {
        _this.options = {
          name: '多边形',
          polygon: {
            hierarchy: [],
            material: new Cesium.Color.fromCssColorString('#FFD700').withAlpha(0.2)
            // 高度 相对于地形的位置
            //  heightReference: 80000

          }
        }
        _this.hierarchy = {
          positions
        }
        this._init()
      }

      _.prototype._init = function () {
        var _self = _this
        var _update = function () {
          return _self.hierarchy
        }
        // 实时更新polygon.hierarchy  CallbackProperty实时更新
        _self.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false)
        _self.viewer.entities.add(_self.options)
      }

      return _
    })()

    function distance(point1, point2) {
      var point1cartographic = Cesium.Cartographic.fromCartesian(point1)
      var point2cartographic = Cesium.Cartographic.fromCartesian(point2)
      /** 根据经纬度计算出距离**/
      var geodesic = new Cesium.EllipsoidGeodesic()
      geodesic.setEndPoints(point1cartographic, point2cartographic)
      var s = geodesic.surfaceDistance
      // 返回两点之间的距离
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2))
      return s
    }
  }
  /**
   * 测距
   */
  stadiometry() {
    const _this = this
    // 取消双击事件-追踪该位置
    _this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

    _this.handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene._imageryLayerCollection)
    var positions = []
    var poly = null
    // var tooltip = document.getElementById("toolTip");
    var distance = 0
    var cartesian = null
    var floatingPoint
    // tooltip.style.display = "block";

    this.handler.setInputAction(function (movement) {
      // tooltip.style.left = movement.endPosition.x + 3 + "px";
      // tooltip.style.top = movement.endPosition.y - 25 + "px";
      // tooltip.innerHTML = '<p>单击开始，右击结束</p>';
      // cartesian = viewer.scene.pickPosition(movement.endPosition);
      const ray = _this.viewer.camera.getPickRay(movement.endPosition)
      cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
      // cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolyLinePrimitive(positions)
        } else {
          positions.pop()
          // cartesian.y += (1 + Math.random());
          positions.push(cartesian)
        }
        distance = getSpaceDistance(positions)

        // tooltip.innerHTML='<p>'+distance+'米</p>';
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    this.handler.setInputAction(function (movement) {
      Cesium.Label.enableRightToLeftDetection = true
      // tooltip.style.display = "none";
      // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
      // cartesian = viewer.scene.pickPosition(movement.position);
      const ray = _this.viewer.camera.getPickRay(movement.position)
      cartesian = _this.viewer.scene.globe.pick(ray, _this.viewer.scene)
      if (positions.length == 0) {
        positions.push(cartesian.clone())
      }
      positions.push(cartesian)
      // 在三维场景中添加Label
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian)

      var textDisance = distance + '米'

      floatingPoint = _this.viewer.entities.add({
        name: '空间直线距离',
        // 三维场景定位
        position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, cartographic.height),
        // 二维场景定位
        //   position: positions[positions.length - 1],
        point: {
          // 点心的颜色
          color: Cesium.Color.SKYBLUE,
          pixelSize: 10,
          // 轮廓的颜色
          outlineColor: Cesium.Color.YELLOW,
          // 轮廓的线的大小
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY

        },
        label: {
          text: textDisance,
          font: '18px sans-serif',
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(20, -20),
          show: true,
          showBackground: false,
          backgroundColor: '',
          eyeOffset: new Cesium.Cartesian3(0, 0, -10)
        }
      })
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    _this.handler.setInputAction(function (movement) {
      if (_this.handler) {
        _this.handler.destroy() // 关闭事件句柄
        _this.handler = null
      }
      positions.pop() // 最后一个点无效
      // viewer.entities.remove(floatingPoint);
      // tooltip.style.display = "none";
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

    var PolyLinePrimitive = (function () {
      function _(positions) {
        _this.options = {
          name: '直线',
          polyline: {
            show: true,
            positions: [],
            material: new Cesium.Color.fromCssColorString('#FFD700'),
            width: 10,
            clampToGround: true
          }
        }
        _this.positions = positions
        this._init()
      }

      _.prototype._init = function () {
        var _self = _this
        var _update = function () {
          return _self.positions
        }
        // 实时更新polyline.positions
        _self.options.polyline.positions = new Cesium.CallbackProperty(_update, false)
        _self.viewer.entities.add(_self.options)
      }

      return _
    })()

    // 空间两点距离计算函数
    function getSpaceDistance(positions) {
      var distance = 0
      for (var i = 0; i < positions.length - 1; i++) {
        var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i])
        var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1])
        /** 根据经纬度计算出距离**/
        var geodesic = new Cesium.EllipsoidGeodesic()
        geodesic.setEndPoints(point1cartographic, point2cartographic)
        var s = geodesic.surfaceDistance
        // 返回两点之间的距离
        s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2))
        distance = distance + s
      }
      return distance.toFixed(2)
    }
  }
  /**
   * 清除绘制
   */
  clearAraw() {
    const entitys = this.viewer.entities._entities._array
    this.redraw = null
    if (entitys.length) {
      this.viewer.entities.removeAll()
    }
    if (this.polygonGeometryArray.length > 0) {
      for (var h = 0; h < this.polygonGeometryArray.length; h++) {
        this.viewer.scene.groundPrimitives.remove(this.polygonGeometryArray[h])
      }
    }
  }
  /**
   * 图层的加载
   * @param {*} name
   * wms服务
   */
  addOneLayer(name, urlRoot) {
    const oneLayer = this.viewer.imageryLayers.addImageryProvider(
      new Cesium.WebMapServiceImageryProvider({
        url: urlRoot, // 图层地址
        layers: name,
        parameters: {
          service: 'WMS',
          format: 'image/png',
          transparent: true
        }
      })
    )
  }
  /**
   * 删除指定的图层
   * @param {*} oneLayer
   */
  layerRemove(oneLayer) {
    this.viewer.imageryLayers.remove(oneLayer)
  }
  /**
   * 删除所有影视图层
   */
  layerRemoveall() {
    this.viewer.imageryLayers.removeall()
  }
  /**
   * 查询并定位
   * @param {*} t
   */
  autoInput(t) {
    if (!t) {
      return
    }
    var keywords = t.value
    if (t.value == '') {
      document.getElementById('search_results_div').innerHTML = ''
      document.getElementById('search_results_div').style.display = 'none'
      return
    }
    AMap.plugin('AMap.PlaceSearch', function () {
      var autoOptions = {
        city: '全国'
      }
      var placeSearch = new AMap.PlaceSearch(autoOptions)
      placeSearch.search(keywords, function (status, result) {
        if (status == 'complete') { // no_data
          if (result.info == 'OK') {
            if (result.poiList && result.poiList.count > 0) {
              var poiList = result.poiList.pois

              const poiListCount = result.poiList.count
              var htmlTmp = ''
              for (var i = 0; i < poiList.length; i++) {
                // 查询出的是分页结果
                var htmlTmp1 = "<div class='map_result_item' data-longitude=" + poiList[i].location.lng + ' data-latitude=' + poiList[i].location.lat + " onclick='setmapToBylngAndLat(this)'>" + poiList[i].name +
                  "<span class='map_result_item_span'> " + poiList[i].address + '</span>\n' +
                  '</div>'
                htmlTmp = htmlTmp + htmlTmp1
                // 查询结果对象存储，用于点击的3D定位
              }
              document.getElementById('search_results_div').innerHTML = htmlTmp
            } else {
              document.getElementById('search_results_div').innerHTML = '无搜索结果'
            }
          } else {
            document.getElementById('search_results_div').innerHTML = '无搜索结果'
          }
        } else {
          document.getElementById('search_results_div').innerHTML = '无搜索结果'
        }
        document.getElementById('search_results_div').style.display = 'block'
      })
    })
  }
  // 点击事件 选中一个地点，3D跳转到
  setmapToBylngAndLat(t) {
    var longitude = t.getAttribute('data-longitude')
    var latitude = t.getAttribute('data-latitude')
    if (loactionEntity) { viewer.entities.remove(loactionEntity) } // viewer 3D cesium实体
    const loactionEntity = new Cesium.Entity({
      id: 'loactionEntity',
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
      point: {
        pixelSize: 10,
        color: Cesium.Color.WHITE.withAlpha(0),
        outlineColor: Cesium.Color.WHITE.withAlpha(0),
        outlineWidth: 1
      }
    })
    viewer.entities.add(loactionEntity)
    viewer.flyTo(loactionEntity, {
      offset: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90),
        range: 10000
      }
    })
  }

  /**
   * 地图全屏
   */
  fullScreen() {
    const el = document.documentElement
    if (this.fullScreeState === false) {
      var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
      if (typeof rfs !== 'undefined' && rfs) {
        rfs.call(el)
      }
      this.fullScreeState = true
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
      this.fullScreeState = false
    }
  }

  /**
   *
   *
   * 获取相机当前高，经，纬
   */
  get_camera_height() {
    // 获取当前镜头位置的笛卡尔坐标
    const cameraPosition = this.viewer.camera.position
    // 获取当前坐标系标准
    const ellipsoid = this.viewer.scene.globe.ellipsoid
    // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
    const cartographic = ellipsoid.cartesianToCartographic(cameraPosition)
    // 获取镜头的高度
    const height = cartographic.height
    // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
    const centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8))
    const centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8))
    return { height, centerLon, centerLat }
  }
  /**
   *放大方法
   *
   *
   **/
  big() {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(this.get_camera_height().centerLon, this.get_camera_height().centerLat, this.get_camera_height().height / 1.8),
      duration: 1.0
    })
  }
  /**
   *
   *
   * 缩小方法
   * */
  samll() {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(this.get_camera_height().centerLon, this.get_camera_height().centerLat, this.get_camera_height().height * 1.8),
      duration: 1.0
    })
  }
  /**
   *定位在地图上
   * @param {*} x  经度
   * @param {*} y 纬度
   * @param {*} z 高度
   */
  locat(x, y, z) {
    if (entity) {
      this.viewer.entities.remove(entity)
    }
    var entity = new Cesium.Entity({
      id: document.getElementById('build_name').value + '——' + parseInt(document.getElementById('room_num').value),
      position: Cesium.Cartesian3.fromDegrees(x, y),
      point: {
        pixelSize: 30,
        color: Cesium.Color.WHITE.withAlpha(0.9),
        outlineColor: Cesium.Color.WHITE.withAlpha(0.9),
        outlineWidth: 1
      }
    })
    this.viewer.entities.add(entity)
    this.viewer.flyTo(entity, {
      offset: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90),
        range: z + 20
      }
    })
  }
  /**
   *打印
   */
  printImg() {
    var canvas = viewer.scene.canvas
    // 保存（下载）图片
    var strData = getDataURL(canvas, 'image/jpeg', canvas.width, canvas.height)
    download(strData)
  }
  /**
   *初始化菜单栏
   * @param {*} id  父级id
   */
  initMenu(id) {
    const _this = this
    const menuHtml = "<li class='Base_map'id='Base_map'>" +
      "<i class='fa fa-map'></i>" +
      '<span>底图</span>' +
      '</li>' +
      "<li class='layerBtn'id='layerBtn'>" +
      "<i class='fa fa-tasks'></i>" +
      '<span>图层</span>' +
      '</li>' +
      "<li class='toolsBtn' id='toolsBtn'>" +
      "<i class='fa fa-cubes'></i>" +
      '<span>工具</span>' +
      '</li>'

    const parentElement = document.getElementById(id)
    const ul = document.createElement('ul')
    ul.className = 'menu'
    ul.innerHTML = menuHtml
    parentElement.appendChild(ul)
    setTimeout(function () {
      _this.dituShow()
      _this.layerMenuShow()
      _this.toolMenuShow()
      _this.coordinatePositioningPopoverShow()
    }, 500)
  }
  /**
   *初始化工具控件
   *@param {*} id  父级id
   */
  initTool(id) {
    const toolHtml =
      "<li class='measureBtn'>" +
      "<i class='fa fa fa-calculator'></i>" +
      '<span>图上量算</span>' +
      '</li>' +
      "<li class='coordinateBtn'id='coordinateBtn'>" +
      "<i class='fa fa-map-marker fa-lg'></i>" +
      '<span>坐标定位</span>' +
      '</li>' +
      '<li>' +
      "<i class='fa fa-paper-plane'></i>" +
      '<span>地区导航</span>' +
      '</li>' +
      "<li class='signButton'>" +
      "<i class='fa fa-edit'></i>" +
      '<span>我的标记</span>' +
      '</li>' +
      "<li class='bookMark'>" +
      "<i class='fa fa-tags'></i>" +
      '<span>视角书签</span>' +
      '</li>' +
      "<li class='useWebVR'>" +
      "<i class='fa fa-window-restore'></i>" +
      '<span>分屏对比</span>' +
      '</li>' +
      "<li class='verticalSlider'>" +
      "<i class='fa fa-columns'></i>" +
      '<span>卷帘对比</span>' +
      '</li>' +
      "<li class='particle'>" +
      "<i class='fa fa-columns'></i>" +
      '<span>粒子特效</span>' +
      '</li>' +
      '<li>' +
      "<i class='fa fa-object-group'></i>" +
      '<span>图上标绘</span>' +
      '</li>' +
      '<li>' +
      "<i class='fa fa-send-o'></i>" +
      '<span>飞行漫游</span>' +
      '</li>' +
      "<li class='printingBtn'>" +
      "<i class='fa fa-print'></i>" +
      '<span>地图打印</span>' +
      '</li>' +
      '<li>' +
      "<i class='fa fa-share'></i>" +
      '<span>分享地图</span>' +
      '</li>' +
      '<li>' +
      "<i class='fa fa-cog'></i>" +
      '<span>参数设置</span>' +
      '</li>'

    const parentElement = document.getElementById(id)
    const ul = document.createElement('ul')
    ul.className = 'tools'
    ul.id = 'tools'
    ul.style.display = 'none'
    ul.innerHTML = toolHtml
    parentElement.appendChild(ul)
  }
  /**
   *初始化地图控件
   * @param {*} id  父级id
   */
  initBaseMap(id) {
    const baseMapHtml = "<ul><li class='TDT' id='TDT'>" +
      "<img  src='../img/s1.jpg' alt=''>" +
      '<p>天地图影像服务</p>' +
      '</li>' +
      "<li class='TDTZJ'id='TDTZJ'>" +
      "<img src='../img/s2.png' alt=''>" +
      '<p>天地图影像标注服务</p>' +
      '</li>' +
      "<li class='ArcGIS' id='ArcGIS'>" +
      "<img src='../img/s3.jpg' alt=''>" +
      '<p>Arcgis在线地图服务</p>' +
      '</li>' +
      "<li class='cesiumBlack' id='cesiumBlack'>" +
      "<img src='../img/s4.png' alt=''>" +
      '<p>cesium Black</p>' +
      '</li>' +
      "<li class='GoogleMap'id='GoogleMap'>" +
      "<img src='../img/s5.jpg' alt=''>" +
      '<p>GoogleMap</p>' +
      '</li>' +
      "<li class='osm' id='osm'>" +
      "<img src='../img/s6.png' alt=''>" +
      '<p>osm</p>' +
      '</li>' +
      "<li class='mapbox' id='mapbox'>" +
      "<img src='../img/s7.png' alt=''>" +
      '<p>mapbox</p>' +
      '</li></ul>'
    const parentElement = document.getElementById(id)
    const dv = document.createElement('div')
    dv.className = 'measure_ditu'
    dv.id = 'measure_ditu'
    dv.style.display = 'none'
    dv.innerHTML = baseMapHtml
    parentElement.appendChild(dv)
  }
  /**
   * 底图工具切换
   */
  dituShow() {
    const _this = this
    const baseMap = document.getElementById('Base_map')
    const measureDitu = document.getElementById('measure_ditu')
    baseMap.onclick = function () {
      if (measureDitu.style.display == 'none') {
        measureDitu.style.display = 'block'
        _this.dituToggle()
      } else {
        measureDitu.style.display = 'none'
      }
    }
  }
  /**
   *地图底图全部删除
   */
  imageryLayersRemoveAll() {
    const layers = this.viewer.imageryLayers
    layers.removeAll()
  }
  /**
   *地图底图添加底图
   *@param diTuObj 生成的底图对象
   */
  addImageryProvider(diTuObj) {
    const layers = this.viewer.imageryLayers
    layers.addImageryProvider(diTuObj)
  }
  /**
   *底图切换
   */
  dituToggle() {
    const _this = this
    const TDT = document.getElementById('TDT')
    const TDTZJ = document.getElementById('TDTZJ')
    const ArcGIS = document.getElementById('ArcGIS')
    const cesiumBlack = document.getElementById('cesiumBlack')
    const GoogleMap = document.getElementById('GoogleMap')
    const osm = document.getElementById('osm')
    const mapbox = document.getElementById('mapbox')
    TDT.onclick = function () {
      this
      _this.cancelSelected()
      $(this).find('img').addClass('active')
      _this.imageryLayersRemoveAll()
      // 加载地图
      _this.addImageryProvider(_this.loadingMap())
    }
    TDTZJ.onclick = function () {
      _this.cancelSelected()
      $(this).find('img').addClass('active')
      _this.imageryLayersRemoveAll()
      // 加载地图
      _this.LoadingMarkedMap()
    }
    ArcGIS.onclick = function () {
      _this.cancelSelected()
      $(this).find('img').addClass('active')
      _this.imageryLayersRemoveAll()
      _this.addImageryProvider(_this.loadingArcGISMap())
      // 加载地图
    }
    cesiumBlack.onclick = function () {
      _this.cancelSelected()
      $(this).find('img').addClass('active')
      _this.imageryLayersRemoveAll()
      // 加载地图
      _this.addImageryProvider(_this.loadingCesiumBlack())
    }
    GoogleMap.onclick = function () {
      _this.cancelSelected()
      $(this).find('img').addClass('active')
      _this.imageryLayersRemoveAll()
      // 加载地图
      _this.addImageryProvider(_this.loadingGoogleMap())
    }
    osm.onclick = function () {
      _this.cancelSelected()
      $(this).find('img').addClass('active')
      _this.imageryLayersRemoveAll()
      // 加载地图
      _this.addImageryProvider(_this.osm())
    }
    mapbox.onclick = function () {
      _this.cancelSelected()
      $(this).find('img').addClass('active')
      _this.imageryLayersRemoveAll()
      // 加载地图
      _this.addImageryProvider(_this.loadingMapboxMap())
    }
  }
  /**
   *地图服务取消选中的色
   */
  cancelSelected() {
    const len = $('#measure_ditu').length
    for (var x = 0; x < len; x++) {
      $('#measure_ditu').eq(x).find('img').removeClass('active')
    }
  }
  /**
   *图层工具栏
   * @param {*} id
   */
  initLayerMenu(id) {
    var LayerMenuHtml = '<h3>' +
      '<i></i>' +
      '<span>图层</span>' +
      '</h3>' +
      "<span class='layui-layer-setwin' id='layersContenClose'>" +
      "<a class='layui-layer-ico layui-layer-close layui-layer-close1' href='javascript:;'></a>" +
      '</span>' +
      "<ul id='treeOverlays' class='ztree'st></ul>" +
      '</div>' +
      "<div style='position:absolute;bottom:0;padding:5px;color:#a59d9d;'>提示：双击可定位视域至其所在位置</div>"
    // <!--<div id="content_layer_manager_rMenu" class="layersctl_rMenu">
    //     <ul>
    //         <li data-type="top">图层置为顶层</li>
    //         <li data-type="up">图层上移一层</li>
    //         <li data-type="down">图层下移一层</li>
    //         <li data-type="bottom">图层置为底层</li>
    //     </ul>
    // </div>-->

    const parentElement = document.getElementById(id)
    const dv = document.createElement('div')
    dv.className = 'layersConten'
    dv.id = 'layersConten'
    dv.style.background = 'rgba(30,36,50,.6)'
    dv.style.display = 'none'
    dv.innerHTML = LayerMenuHtml
    parentElement.appendChild(dv)
  }
  /**
   *图层菜单的切换
   */
  layerMenuShow() {
    const _this = this
    const layerBtn = document.getElementById('layerBtn')
    const layersConten = document.getElementById('layersConten')
    const layersContenClose = document.getElementById('layersContenClose')
    layerBtn.onclick = function () {
      if (layersConten.style.display == 'none') {
        layersConten.style.display = 'block'
      } else {
        layersConten.style.display = 'none'
      }
    }
    layersContenClose.onclick = function () {
      layersConten.style.display = 'none'
    }
  }
  /**
   *工具菜单的切换
   */
  toolMenuShow() {
    const _this = this
    const toolsBtn = document.getElementById('toolsBtn')
    const tools = document.getElementById('tools')
    toolsBtn.onclick = function () {
      if (tools.style.display == 'none') {
        tools.style.display = 'block'
      } else {
        tools.style.display = 'none'
      }
    }
  }
  /**
   * 显示图层控制器
   * @method show3DLayers
   * @param  layersconfig 图层控制器数据源
   * @return
   */
  show3DLayers(layersconfig) {
    const _this = this
    if (!_this.isLoad3DLayers) {
      _this.isLoad3DLayers = _this.showLayersView(layersconfig)
    }
  }

  /**
   * 删除指定ID的图层
   */
  deleteServerTypeMap(id) {
    const _this = this
    switch (typeof (id)) {
      case 'number':
        if (_this.layer3DList.length > 0) {
          for (var i = 0; i < _this.layer3DList.length; i++) {
            if (_this.layer3DList[i].id == id) {
              _this.viewer.scene.imageryLayers.remove(_this.layer3DList[i].layer)
            }
          }
        }
        break
      case 'string':
        var len = _this.cesiumViewer.dataSources.length
        if (len > 0) {
          for (var i = 0; i < len; i++) {
            var dataSource = cesium.cesiumViewer.dataSources.get(i)
            if (dataSource._name && dataSource._name == id) {
              cesium.cesiumViewer.dataSources.remove(dataSource)
            }
          }
        }
        break
      case 'undefined':
        break
    }
  }
  /**
   * 初始化图层目录树
   * layersconfig obj类型 layersconfig=[
   {
            "id": 1,
            "pId": 0,
            "name": "三维模型",
            "checked": false
        },
   {
            "id": 66,
            "pId": 1,
            "name": "倾斜影像",
            "checked": false
        },
   {
            "id": 11,
            "pId": 66,
            "name": "影像",
            "layerurl": "http://192.168.1.143:8084/geoserver/yzyx/wms",
            "layerid": "yzyx:zt_image",
            "IsWebMercatorTilingScheme": true,
            "checked": false
        }]
   *
   *
   * */
  InitTree(layersconfig) {
    const _this = this
    const setting = {
      check: {
        enable: true
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        onCheck: function (e, treeId, treeNode) {
          if (treeNode.checked) { // 勾选状态下,显示地图控件
            if (treeNode.children) { // 勾选专题目录
              for (var i = 0; i < treeNode.children.length; i++) {
                _this.loadServerTypeMap(treeNode.children[i].id, treeNode.children[i].type, treeNode.children[i].layerurl, treeNode.children[i].layerid, treeNode.children[i].proxyUrl, treeNode.children[i].IsWebMercatorTilingScheme)
              }
            } else { // 勾选叶节点
              _this.loadServerTypeMap(treeNode.id, treeNode.type, treeNode.layerurl, treeNode.layerid, treeNode.proxyUrl, treeNode.IsWebMercatorTilingScheme)
            }
          } else { // 去掉勾选框,隐藏地图控件
            if (treeNode.children) { // 专题目录
              for (var i = 0; i < treeNode.children.length; i++) {
                _this.deleteServerTypeMap(treeNode.children[i].id)
              }
            } else { // 叶节点
              _this.deleteServerTypeMap(treeNode.id)
            }
          }
        }
      }
    }
    const ztreeRoleAuth = $('#treeOverlays')
    const ztree = $.fn.zTree.init(ztreeRoleAuth, setting, layersconfig)
    _this.treeObj = $.fn.zTree.getZTreeObj('treeOverlays')
    _this.treeObj.expandAll(true)
    // 加载已经勾选的图层
    const nodes = _this.treeObj.getCheckedNodes(true)
    if (nodes.length > 0) {
      for (var i = 0; i < nodes.length; i++) {
        if (!nodes[i].isParent) { // 节点图层
          _this.loadServerTypeMap(nodes[i].id, nodes[i].type, nodes[i].layerurl, nodes[i].layerid, nodes[i].proxyUrl, nodes[i].IsWebMercatorTilingScheme)
        }
      }
    }
    $.each($('.ztree'), function (index, value) {
      $('.ztree').eq(index).find('li').find('a').css('color', '#fff')
    })
  }
  /**
   * 显示图层控制器
   * layersconfig obj类型 layersconfig=[
   {
            "id": 1,
            "pId": 0,
            "name": "三维模型",
            "checked": false
        },
   {
            "id": 66,
            "pId": 1,
            "name": "倾斜影像",
            "checked": false
        },
   {
            "id": 11,
            "pId": 66,
            "name": "影像",
            "layerurl": "http://192.168.1.143:8084/geoserver/yzyx/wms",
            "layerid": "yzyx:zt_image",
            "IsWebMercatorTilingScheme": true,
            "checked": false
        }]
   *
   *
   * **/
  showLayersView(layersconfig) {
    const _this = this
    _this.layer3DList = []
    _this.treeObj = null
    // 加载图层目录树
    _this.InitTree(layersconfig)
    return true
  }
  /**
   *坐标定位弹窗
   */
  coordinatePositioningPopover(id) {
    const html = "<div class='layui-layer-title' style='cursor: move;'><i class='fa fa-map-pin'></i>坐标定位</div>" +
      "<div  class='layui-layer-content' style='height: 168px;'>" +
      "<div class='centerXY'>" +
      "<div class='input-group'><span class='input-group-addon' id='basic-addon1'>经度</span> <input type='number' id='point_jd' class='form-control' placeholder='请输入经度数值0-180' aria-describedby='basic-addon1'></div>" +
      "<div class='input-group'><span class='input-group-addon' id='basic-addon2'>纬度</span> <input type='number' id='point_wd' class='form-control' placeholder='请输入纬度数值0-90' aria-describedby='basic-addon2'></div>" +
      "<div class='input-group'><span class='input-group-addon' id='basic-addon2'>高度</span> <input type='number' id='point_height' class='form-control' placeholder='请输入高度值' aria-describedby='basic-addon2'></div>" +
      "<div class='input-group text-right'><input id='btnCenterXY' type='button' class='btn btn-primary' value='确定'></div>" +
      '</div>' +
      '</div>' +
      "<span class='layui-layer-setwin'>" +
      "<a class='layui-layer-ico layui-layer-close layui-layer-close1' href='javascript:;'></a>" +
      "</span><span class='layui-layer-resize'></span>"

    const parentElement = document.getElementById(id)
    const dv = document.createElement('div')
    dv.className = 'layui-layer layui-layer-page layer-mars-dialog animation-scale-up coordinate'
    dv.id = 'layui-layer1'
    dv.type = 'page'
    dv.times = '1'
    dv.showtime = '0'
    dv.contype = 'string'
    dv.style.display = 'none'
    dv.innerHTML = html
    parentElement.appendChild(dv)
  }
  /**
   *坐标定位弹窗的显示
   */
  coordinatePositioningPopoverShow() {
    const _this = this
    const coordinateBtn = document.getElementById('coordinateBtn')
    const layuiLayer1 = document.getElementById('layui-layer1')
    const tools = document.getElementById('tools')

    coordinateBtn.onclick = function () {
      if (layuiLayer1.style.display == 'none') {
        layuiLayer1.style.display = 'block'
        tools.style.display = 'none'
      }
    }
  }
  /**
   *返回区块的中心坐标
   */
  icoLocation(locationArray) {
    for (let m = 0; m < locationArray.length; m++) {
      // let center = turf.centerOfMass(locationArray[m]).geometry.coordinates;
      this.ScanPostStageArray.push(this.showCircleScan(parseFloat(locationArray[m].longitude), parseFloat(locationArray[m].latitude)))
      // this.imgLocation(parseFloat(locationArray[m].longitude), parseFloat(locationArray[m].latitude), 1, '', false, img, 0.59, -5, -20);
      this.createpointCollection([parseFloat(locationArray[m].longitude), parseFloat(locationArray[m].latitude)], locationArray[m])
    }
  }

  /**
   *扩散效果Shader
   */
  getScanSegmentShader() {
    const scanSegmentShader = '\n\
                    uniform sampler2D colorTexture;\n\
                    uniform sampler2D depthTexture;\n\
                    varying vec2 v_textureCoordinates;\n\
                    uniform vec4 u_scanCenterEC;\n\
                    uniform vec3 u_scanPlaneNormalEC;\n\
                    uniform float u_radius;\n\
                    uniform vec4 u_scanColor;\n\
                    \n\
                    vec4 toEye(in vec2 uv,in float depth)\n\
                    {\n\
                                vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n\
                                vec4 posIncamera = czm_inverseProjection * vec4(xy,depth,1.0);\n\
                                posIncamera = posIncamera/posIncamera.w;\n\
                                return posIncamera;\n\
                    }\n\
                    \n\
                    vec3 pointProjectOnPlane(in vec3 planeNormal,in vec3 planeOrigin,in vec3 point)\n\
                    {\n\
                                vec3 v01 = point - planeOrigin;\n\
                                float d = dot(planeNormal,v01);\n\
                                return (point-planeNormal * d);\n\
                    }\n\
                    float getDepth(in vec4 depth)\n\
                    {\n\
                                float z_window = czm_unpackDepth(depth);\n\
                                z_window = czm_reverseLogDepth(z_window);\n\
                                float n_range = czm_depthRange.near;\n\
                                float f_range = czm_depthRange.far;\n\
                                return (2.0 * z_window - n_range - f_range)/(f_range-n_range);\n\
                    } \n\
                    void main()\n\
                    {\n\
                                gl_FragColor = texture2D(colorTexture,v_textureCoordinates);\n\
                                float depth = getDepth(texture2D(depthTexture,v_textureCoordinates));\n\
                                vec4 viewPos = toEye(v_textureCoordinates,depth);\n\
                                vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz,u_scanCenterEC.xyz,viewPos.xyz);\n\
                                float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n\
                                if(dis<u_radius)\n\
                                {\n\
                                    float f = 1.0-abs(u_radius - dis )/ u_radius;\n\
                                    f = pow(f,4.0);\n\
                                    gl_FragColor = mix(gl_FragColor,u_scanColor,f);\n\
                                }\n\
                    } \n\ '
    return scanSegmentShader
  }

  /**
   *图片定位地图的方法
   *    电光晕
   *    lon
   *    lat
   *    height
   *    name
   *
   *
   */

  imgLocation(lon, lat, height, name, show, image, imgScale, x, y) {
    const pointEntity = this.viewer.entities.add({
      name: name,
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      label: { // 文字标签
        show: show,
        text: name,
        font: '30px Helvetica', // 15pt monospace
        // 字体的范围
        scale: 0.48,
        // 样式
        style: 2, // Cesium.LabelStyle.FILL,
        // 字体颜色
        fillColor: Cesium.Color.WHITE,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        // 字体偏移量
        pixelOffset: new Cesium.Cartesian2(-130, -47), // new Cesium.Cartesian2(-160, -105),
        disableDepthTestDistance: 60000000,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          60000000
        ),
        // 是否显示背景
        showBackground: true,
        // 背景色
        backgroundColor: new Cesium.Color(255, 250, 250, 0.01)
      },
      // 图片加载
      billboard: {
        image: image, // img/circular_particle.png
        width: 50, // 100, //400
        height: 50, // 100, // 270
        // 图片的范围
        scale: imgScale, // 0.3, //0.59
        // horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: 60000000,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          0,
          60000000
        ),
        // pixelOffset: options.billboard.pixelOffset ? options.billboard.pixelOffset : '' // new Cesium.Cartesian2(-100, 28), //偏移量
        // pixelOffset: new Cesium.Cartesian2(-100, 28)
        pixelOffset: new Cesium.Cartesian2(x, y)
      }

    })
    this.pointEntityArray.push(pointEntity)
  }
  /**
   * 圆扩散
   */

  showCircleScan(lon, lat) {
    // 防止移动、放大缩小会视觉偏移depthTestAgainstTerrain // 设置该属性为true之后，标绘将位于地形的顶部；如果设为false（默认值），那么标绘将位于平面上。缺陷：开启该属性有可能在切换图层时会引发标绘消失的bug。
    this.viewer.scene.globe.depthTestAgainstTerrain = true
    // 中心位子
    const cartographicCenter = new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), 0)
    // 光源色值
    const scanColor = new Cesium.Color.fromCssColorString('#2bebfc')
    // 光晕
    return this.addCircleScanPostStage(this.viewer, cartographicCenter, 1000, scanColor, 5000)
  }
  /*
            添加扩散效果扫描线
            cartographicCenter 扫描中心
            radius  半径 米
            scanColor 扫描颜色
            duration 持续时间 毫秒
          */
  addCircleScanPostStage(viewer, cartographicCenter, maxRadius, scanColor, duration) {
    const array = []
    const _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter)
    const _Cartesian4Center = new Cesium.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1)

    const _CartograhpicCenter1 = new Cesium.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500)
    const _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartograhpicCenter1)
    const _Cartesian4Center1 = new Cesium.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1)

    const _time = (new Date()).getTime()

    const _scratchCartesian4Center = new Cesium.Cartesian4()
    const _scratchCartesian4Center1 = new Cesium.Cartesian4()
    const _scratchCartesian3Normal = new Cesium.Cartesian3()

    const ScanPostStage = new Cesium.PostProcessStage({
      fragmentShader: this.getScanSegmentShader(), // 执行做色器
      show: true,
      // 着色器制式，可以是常量或函数，着色器每一帧都将调用
      uniforms: {
        u_scanCenterEC: function () {
          const temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
          return temp
        },
        u_scanPlaneNormalEC: function () {
          const temp = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center)
          const temp1 = Cesium.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1)

          _scratchCartesian3Normal.x = temp1.x - temp.x
          _scratchCartesian3Normal.y = temp1.y - temp.y
          _scratchCartesian3Normal.z = temp1.z - temp.z

          Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal)

          return _scratchCartesian3Normal
        },
        // 当前时间模周期余数除以周期控制圆圈周期变换大小
        u_radius: function () {
          return maxRadius * (((new Date()).getTime() - _time) % duration) / duration
        },
        u_scanColor: scanColor
      }
    })
    array.push(ScanPostStage)
    // 小bug地图会闪现；
    this.viewer.scene.postProcessStages.add(ScanPostStage)
    return ScanPostStage
  }
  /**
   * 删除所有的标注
   */
  imgLocationRemoveAll() {
    const _this = this
    for (var e = 0; e < _this.pointEntityArray.length; e++) {
      _this.viewer.entities.remove(_this.pointEntityArray[e])
    }
    _this.pointEntityArray = []
  }

  /**
   * 创建正方形 绑定热力图
   * @returns {Generator<*, void, ?>}
   *Cesium.Rectangle.fromDegrees( lonMin, latMin, lonMax, latMax)
   */
  createRectangle(coordinate, heatMap) {
    const entity = this.viewer.entities.add({
      name: 'Rotating rectangle with rotating texture coordinate',
      show: true,
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(parseFloat(coordinate[0]), parseFloat(coordinate[1]), parseFloat(coordinate[0] + 0.01000000000000), parseFloat(coordinate[1] + 0.01000000000000)),
        material: heatMap._renderer.canvas // 核心语句，填充热力图
      }
    })
    this.heatmapArray.push(entity)
  }

  /**
   * 创建点
   */
  createpointCollection(coordinates, obj) {
    const pointGeometry = this.viewer.entities.add({
      id: obj.id,
      name: obj.projectName,
      region: obj.region, // 所属区域
      constructionNumber: obj.constructionNumber, // 施工许可证号码
      constructionUnitName: obj.constructionUnitName, // 建设单位负责人
      completedDate: obj.completedDate, // 计划竣工日期
      projectType: obj.projectType, // 项目类型
      builtupArea: obj.builtupArea, // 总面积
      projectLxNumber: obj.projectLxNumber, // 立项文号
      adress: obj.adress, // 项目地址
      position: Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1]),
      point: {
        // 点心的颜色
        color: Cesium.Color.SKYBLUE,
        pixelSize: 10,
        // 轮廓的颜色
        outlineColor: Cesium.Color.YELLOW,
        // 轮廓的线的大小
        outlineWidth: 3,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    })
  }
  /**
   * 创建热力图
   * lonMin, latMin, lonMax, latMax
   */
  createHeatMap(max, data) {
    // 创建元素
    var heatDoc = document.createElement('div')
    heatDoc.setAttribute('style', 'width:1000px;height:1000px;margin: 0px;display: none;')
    document.body.appendChild(heatDoc)
    // 创建热力图对象
    var heatmap = Heatmap.create({
      container: heatDoc,
      radius: 20, // 半径大小
      maxOpacity: 0.3,
      minOpacity: 0.1,
      blur: 0.75,
      gradient: {
        '0.9': 'red',
        '0.8': 'orange',
        '0.7': 'yellow',
        '0.5': 'blue',
        '0.3': 'green'
      }
    })
    // 添加数据
    heatmap.setData({
      max: max,
      data: data
    })
    return heatmap
  }
  // 生成len个随机数据
  getData(len) {
    // 构建一些随机数据点
    var points = []
    var max = 0
    var width = 1000
    var height = 1000
    while (len--) {
      var val = Math.floor(Math.random() * 1000)
      max = Math.max(max, val)
      var point = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: val
      }
      points.push(point)
    }
    return { max: max, data: points }
  }

  /**
   * 删除热力图实体的方法
   */
  deleteHeatmap() {
    const _this = this
    if (_this.heatmapArray.length > 0) {
      for (var j = 0; j < _this.heatmapArray.length; j++) {
        _this.viewer.entities.remove(_this.heatmapArray[j])
      }
      _this.heatmapArray = []
    }
  }
}

export default ZTCesium
