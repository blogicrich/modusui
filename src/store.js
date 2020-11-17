import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// App
import { moduleEdropletApp } from '@/store/StoreEdropletApp'
// system admins
import { moduleHydrationParameters } from '@/store/StoreHydrationParameters'
// import { moduleVoiceMessagesDefaults } from '@/store/StoreVoiceMessagesDefaults' // get no data
import { moduleIntervalOptions } from '@/store/StoreIntervalOptions'
import { moduleSystemAdministrators } from '@/store/StoreSysAdmins'
import { moduleTitles } from '@/store/StoreTitles'
import { moduleSmsEmailMessages } from '@/store/StoreSmsEmailMessages'
// client admins - To be removed following implementation of API V2
// import { moduleWakeSleepTimes } from '@/store/StoreWakeSleepTimes'
// import { moduleIntervalSettings } from '@/store/StoreIntervalSettings'
// import { moduleReports } from '@/store/StoreReports'
// CliAdmins V2.0
import { moduleCliAdminBases } from '@/store/StoreCliAdminBases'
import { moduleCliAdminCarer } from '@/store/StoreCliAdminCarer'
import { moduleCliAdminClientAdministrator } from '@/store/StoreCliAdminClientAdministrator'
import { moduleCliAdminPerson } from '@/store/StoreCliAdminPerson'
import { moduleCliAdminUserConditions } from '@/store/StoreCliAdminUserConditions'
import { moduleCliAdminUsers } from '@/store/StoreCliAdminUsers'
import { moduleCliAdminDroplets } from '@/store/StoreCliAdminDroplets'
// Common (public)
import { moduleCommonData } from '@/store/StoreCommonData'
// Dashboard
import { moduleDashboardAway } from '@/store/StoreDashboardAway'
import { moduleDashboardDailyReport } from '@/store/StoreDashboardDailyReport'
import { moduleDashboardDay } from '@/store/StoreDashboardDay'
import { moduleDashboardDates } from '@/store/StoreDashboardDates'
import { moduleDashboardDrinks } from '@/store/StoreDashboardDrinks'
import { moduleDashboardHour } from '@/store/StoreDashboardHour'
import { moduleDashboardUsers } from '@/store/StoreDashboardUsers'
// import { moduleDashboardComment } from '@/store/StoreDashboardComment'
import { moduleDashboardWeek } from '@/store/StoreDashboardWeek'
// Unregistered
import { moduleGettingStartedWizard } from '@/store/StoreGettingStartedWizard'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  namespaced: true,
  modules: {
    // App
    eDropletApp: moduleEdropletApp,
    // system Admins
    hydrationOptions: moduleHydrationParameters,
    intervalOptions: moduleIntervalOptions,
    systemAdmins: moduleSystemAdministrators,
    titles: moduleTitles,
    smsEmailMessages: moduleSmsEmailMessages,
    // client Admins
    cliAdminBases: moduleCliAdminBases,
    cliAdminCarer: moduleCliAdminCarer,
    cliAdminClientAdministrator: moduleCliAdminClientAdministrator,
    cliAdminPerson: moduleCliAdminPerson,
    cliAdminUserConditions: moduleCliAdminUserConditions,
    cliAdminUsers: moduleCliAdminUsers,
    cliAdminDroplets: moduleCliAdminDroplets,
    // Common
    commonData: moduleCommonData,
    // Carer
    dashboardAway: moduleDashboardAway,
    dashboardDay: moduleDashboardDay,
    dashboardDates: moduleDashboardDates,
    dashboardDailyReport: moduleDashboardDailyReport,
    dashboardDrinks: moduleDashboardDrinks,
    dashboardHour: moduleDashboardHour,
    dashboardUsers: moduleDashboardUsers,
    dashboardWeek: moduleDashboardWeek,
    // Unregistered
    gettingStartedWizard: moduleGettingStartedWizard
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [] // set logger only for development
})
