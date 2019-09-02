import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BaseViewHeader from '@/components/base/BaseViewHeaderComponent.vue'
import Moment from 'moment'

Moment.locale('en-gb')

Vue.config.productionTip = false
Vue.component('BaseViewHeader', BaseViewHeader)
Vue.prototype.$moment = Moment

new Vue({
  router,
  store,
  BaseViewHeader,
  render: h => h(App)
}).$mount('#app')
