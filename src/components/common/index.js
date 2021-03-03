import ZtDot from './ZtDot.vue'
import ZtNbsp from './ZtNbsp.vue'
import ZtLabel from './ZtLabel.vue'
import ZtTable from './ZtTable.vue'
import ZtDicSelect from './ZtDicSelect.vue'
import ZtViewLayout from './ZtViewLayout.vue'
import ZtDicRadio from './ZtDicRadio.vue'
import ZtGridSelect from './ZtGridSelect.vue'
import ZtDictLabel from './ZtDictLabel.vue'
import ZtGridLabel from './ZtGridLabel.vue'
import ZtRemoteSelect from './ZtRemoteSelect.vue'
import ZtMap from './ZtMap.vue'
import ZtImgSelect from './ZtImgSelect.vue'

import ZtDetailItem from './detail/ZtDetailItem.vue'
import ZtDetail from './detail/ZtDetail.vue'

const install = {
  install: function(Vue) {
    Vue.component('ZtDot', ZtDot)
    Vue.component('ZtNbsp', ZtNbsp)
    Vue.component('ZtLabel', ZtLabel)
    Vue.component('ZtTable', ZtTable)
    Vue.component('ZtDicSelect', ZtDicSelect)
    Vue.component('ZtViewLayout', ZtViewLayout)
    Vue.component('ZtDicRadio', ZtDicRadio)
    Vue.component('ZtGridSelect', ZtGridSelect)
    Vue.component('ZtDictLabel', ZtDictLabel)
    Vue.component('ZtDetailItem', ZtDetailItem)
    Vue.component('ZtDetail', ZtDetail)
    Vue.component('ZtGridLabel', ZtGridLabel)
    Vue.component('ZtRemoteSelect', ZtRemoteSelect)
    Vue.component('ZtImgSelect', ZtImgSelect)
    Vue.component('zt-map', ZtMap)
  }
}
export default install
