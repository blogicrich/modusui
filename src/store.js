import Vue from 'vue'
import Vuex from 'vuex'

import { moduleSystemAdminData } from '@/store/StoreSystemAdmin'
import { moduleAditionalDrinks } from '@/store/StoreAditionalDrinks'
import { moduleConditions } from '@/store/StoreConditions'
import { moduleAway } from '@/store/StoreAway'
import { moduleAlerts } from '@/store/StoreAlerts'
import { moduleReports } from '@/store/StoreReports'
import { moduleBases } from '@/store/StoreBases'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeId: [567483233902359045789347589034793057930567390573569030]
  },
  getters: {
    getterStoreId: state => {
      return state.storeId
    }
  },
  modules: {
    // system admins
    systemAdmin: moduleSystemAdminData,
    // client admins

    // carer
    additionalDrinks: moduleAditionalDrinks,
    conditions: moduleConditions,
    away: moduleAway,
    alerts: moduleAlerts,
    report: moduleReports,
    bases: moduleBases
  }
})
