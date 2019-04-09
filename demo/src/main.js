import Vue from 'vue'
import App from './App'
import VueCrop from '../../dist/vue-crop-simple.umd'
import '../../dist/vue-crop-simple.umd.css'

Vue.config.productionTip = false
Vue.use(VueCrop)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
