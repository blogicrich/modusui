import Vue from 'vue'
import Vuex from 'vuex'
// App
import { moduleEdropletApp } from '@/store/StoreEdropletApp'
// system admins
import { moduleSystemAdmin } from '@/store/StoreSystemAdmin'
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
import { moduleEDropMan } from '@/store/StoreEDropMan'
import { moduleIntervalSettings } from '@/store/StoreIntervalSettings'
import { modulePersonnelSettings } from '@/store/StorePersonnelSettings'
import { moduleWizard } from '@/store/StoreWizard'
// carer
import { moduleAdditionalDrinks } from '@/store/StoreAdditionalDrinks'
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
import { moduleDashboardWeek } from '@/store/StoreDashboardWeek'

import { moduleGettingStartedWizard } from '@/store/StoreGettingStartedWizard'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true, // All getters, actions and mutations will be namespaced according to the module path.
  strict: process.env.NODE_ENV !== 'production', // Minimises the cost of VUEX mutations outside of the store. Expensive should not be utilised in production.
  state: {
    userDataLoading: false,
    storeId: 1,
    userId: 1,
    carerId: 1,
    accountHolderId: 1,
    deviceMessageTypeId: 1,
    messageNo: 1,
    date: 0,
    conditionId: 1,
    dayReportId: 1
  },
  modules: {
    // Each module can contain its own state, mutations, actions, getters and modules! It's fractal to nth degree.
    // App
    eDropletApp: moduleEdropletApp,
    // system admins
    containerTypes: moduleContainerTypes,
    titles: moduleTitles,
    genderOptions: moduleGenderOptions,
    conditionOptions: moduleConditionsOptions,
    textEmailMessages: moduleTextEmailMessages,
    hydrationOptions: moduleHydrationParameters,
    voiceMessages: moduleVoiceMessagesDefaults,
    intervalOptions: moduleIntervalOptions,
    systemAdmin: moduleSystemAdmin,
    // client admins
    conditions: moduleCLIAdminConditions,
    cliAdminVoiceMessage: moduleCLIAdminVoiceMessage,
    eDropletMan: moduleEDropMan,
    intervalSettings: moduleIntervalSettings,
    personnelSettings: modulePersonnelSettings,
    wizard: moduleWizard,
    // carer
    additionalDrinks: moduleAdditionalDrinks,
    condition: moduleConditions,
    away: moduleAway,
    alerts: moduleAlerts,
    report: moduleReports,
    bases: moduleBases,
    // Dashboard
    dashboardDay: moduleDashboardDay,
    dashboardHour: moduleDashboardHour,
    dashboardUsers: moduleDashboardUsers,
    DashboardComment: moduleDashboardComment,
    dashboardWeek: moduleDashboardWeek,

    gettingStartedWizard: moduleGettingStartedWizard
  }
})
