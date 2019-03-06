import Vue from 'vue'
import Vuex from 'vuex'

// system admins
import { moduleSystemAdminData } from '@/store/StoreSystemAdmin'

// client admins
import { moduleCLIAdminVoiceMessage } from '@/store/StoreVoiceMessage'
import { moduleCLIAdminConditions } from '@/store/StoreCLIAdminConditions'
import { moduleEDropletMan } from '@/store/StoreEDroptletMan'
import { moduleIntervalSettings } from '@/store/StoreIntervalSettings'
import { modulePersonnelSettings } from '@/store/StorePersonnelSettings'

// carer
import { moduleAditionalDrinks } from '@/store/StoreAditionalDrinks'
import { moduleConditions } from '@/store/StoreCarerConditions'
import { moduleAway } from '@/store/StoreAway'
import { moduleAlerts } from '@/store/StoreAlerts'
import { moduleReports } from '@/store/StoreReports'
import { moduleBases } from '@/store/StoreBases'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeId: [567483233902359045789347589034793057930567390573569030],
    userId: 1,
    carerId: 1,
    accountHolderId: 1,
    deviceMessageTypeId: 1,
    messageNo: 1
  },
  getters: {
    getterStoreId: state => state.storeId,
    getterUserId: state => state.userId,
    getterCarerId: state => state.carerId,
    getterAccountHolderId: state => state.accountHolderId,
    getterDeviceMessageTypeId: state => state.deviceMessageTypeId,
    getterMessageNo: state => state.messageNo
  },
  modules: {
    // system admins
    systemAdmin: moduleSystemAdminData,

    // client admins
    conditions: moduleCLIAdminConditions,
    cliAdminVoiceMessage: moduleCLIAdminVoiceMessage,
    eDropletMan: moduleEDropletMan,
    intervalSettings: moduleIntervalSettings,
    personnelSettings: modulePersonnelSettings,

    // carer
    additionalDrinks: moduleAditionalDrinks,
    condition: moduleConditions,
    away: moduleAway,
    alerts: moduleAlerts,
    report: moduleReports,
    bases: moduleBases
  }
})

// data () {
//   return {
//     apiData: null
//   }
// }
// methods: {
//   dispatchAPIData () {
//     this.$store.dispatch('fetch~storeName~').then((response) => this.apiData = response)
//   }
// }
// mounted () {
//   this.dispatchAPIData()
// }
