import Vue from 'vue'
import Vuex from 'vuex'

import { moduleDashboardData } from '@/store/StoreGetDashboard'
import { moduleAlertData } from '@/store/StoreGetAlert'
import { moduleSystemAdminData } from '@/store/StoreSystemAdmin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashboard: moduleDashboardData,
    alertData: moduleAlertData,
    systemAdmin: moduleSystemAdminData
  }
})
