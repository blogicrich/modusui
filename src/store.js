import Vue from 'vue'
import Vuex from 'vuex'

// system admins
import { moduleSystemAdminData } from '@/store/StoreSystemAdmin'
import { moduleConditionsOptions } from '@/store/StoreConditionsOptions'
import { moduleContainerTypes } from '@/store/StoreContainerTypes' // get no data
import { moduleTitles } from '@/store/StoreTitles'
import { moduleGenderOptions } from '@/store/StoreGenderOptions'
import { moduleTextEmailMessages } from '@/store/StoreTextEmailMessages'
import { moduleHydrationParameters } from '@/store/StoreHydrationParameters'
import { moduleVoiceMessagesDefaults } from '@/store/StoreVoiceMessagesDefaults' // get no data
import { moduleIntervalOptions } from '@/store/StoreIntervalOptions'

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

// Dashboard
import { moduleDashboardDay } from '@/store/StoreDashboardDay'
import { moduleDashboardHour } from '@/store/StoreDashboardHour'
import { moduleDashboardUsers } from '@/store/StoreDashboardUsers'
import { moduleDashboardComment } from '@/store/StoreDashboardComment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeId: [567483233902359045789347589034793057930567390573569030],
    userId: 1,
    carerId: 1,
    accountHolderId: 1,
    deviceMessageTypeId: 1,
    messageNo: 1,
    date: 1551867413
  },
  getters: {
    getterStoreId: state => state.storeId,
    getterUserId: state => state.userId,
    getterCarerId: state => state.carerId,
    getterAccountHolderId: state => state.accountHolderId,
    getterDeviceMessageTypeId: state => state.deviceMessageTypeId,
    getterMessageNo: state => state.messageNo,
    getterDate: state => state.date
  },
  modules: {
    // system admins
    containerTypes: moduleContainerTypes,
    titels: moduleTitles,
    genderOptions: moduleGenderOptions,
    conditionOptions: moduleConditionsOptions,
    textEmailMessages: moduleTextEmailMessages,
    hydrationOptions: moduleHydrationParameters,
    voiceMessages: moduleVoiceMessagesDefaults,
    intervalOptions: moduleIntervalOptions,
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
    bases: moduleBases,

    // Dashboard
    dashboardDay: moduleDashboardDay,
    dashboardHour: moduleDashboardHour,
    dashboardUsers: moduleDashboardUsers,
    DashboardComment: moduleDashboardComment
  }
})

// data () {
//   return {
//     apiData: null
//   }
// }
// methods: {
//   dispatchAPIData () {
//     this.$store.state.~ID~ = ~GetterName~
//     this.$store.dispatch('fetch~storeName~').then((response) => this.apiData = response)
//   }
// }
// mounted () {
//   this.dispatchAPIData()
// }
