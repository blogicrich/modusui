import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import './registerServiceWorker'

// axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// axios.defaults.baseURL = 'https://edroplet.ndevr.co.uk:3000/'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
