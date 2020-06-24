import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// App
import { moduleEdropletApp } from '@/store/StoreEdropletApp'
// system admins
import { moduleHydrationParameters } from '@/store/StoreHydrationParameters'
import { moduleVoiceMessagesDefaults } from '@/store/StoreVoiceMessagesDefaults' // get no data
import { moduleIntervalOptions } from '@/store/StoreIntervalOptions'
import { moduleSystemAdministrators } from '@/store/StoreSysAdmins'
import { moduleTitles } from '@/store/StoreTitles'
import { moduleSmsEmailMessages } from '@/store/StoreSmsEmailMessages'
// client admins - To be removed following implementation of API V2
import { moduleWakeSleepTimes } from '@/store/StoreWakeSleepTimes'
import { moduleIntervalSettings } from '@/store/StoreIntervalSettings'
import { moduleReports } from '@/store/StoreReports'
// CliAdmins V2.0
import { moduleCliAdminCarer } from '@/store/StoreCliAdminCarer'
import { moduleCliAdminClientAdministrator } from '@/store/StoreCliAdminClientAdministrator'
import { moduleCliAdminPerson } from '@/store/StoreCliAdminPerson'
import { moduleCliAdminUserConditions } from '@/store/StoreCliAdminUserConditions'
import { moduleCliAdminUsers } from '@/store/StoreCliAdminUsers'
// Dashboard
import { moduleDashboardAway } from '@/store/StoreDashboardAway'
import { moduleDashboardDailyReport } from '@/store/StoreDailyReports'
import { moduleDashboardDay } from '@/store/StoreDashboardDay'
import { moduleDashboardDates } from '@/store/StoreDashboardDates'
import { moduleDashboardDrinks } from '@/store/StoreDashboardDrinks'
import { moduleDashboardHour } from '@/store/StoreDashboardHour'
import { moduleDashboardUsers } from '@/store/StoreDashboardUsers'
import { moduleDashboardComment } from '@/store/StoreDashboardComment'
import { moduleDashboardWeek } from '@/store/StoreDashboardWeek'
// Unregistered
import { moduleGettingStartedWizard } from '@/store/StoreGettingStartedWizard'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  namespaced: true, // All getters, actions and mutations will be namespaced according to the module path.
  modules: {
    // Each module can contain its own state, mutations, actions, getters and modules! It's fractal to nth degree.
    // App
    eDropletApp: moduleEdropletApp,
    // system Admins
    hydrationOptions: moduleHydrationParameters,
    voiceMessages: moduleVoiceMessagesDefaults,
    intervalOptions: moduleIntervalOptions,
    systemAdmins: moduleSystemAdministrators,
    titles: moduleTitles,
    smsEmailMessages: moduleSmsEmailMessages,
    // client Admins
    wakeSleepTimes: moduleWakeSleepTimes,
    intervalSettings: moduleIntervalSettings,
    cliAdminCarer: moduleCliAdminCarer,
    cliAdminClientAdministrator: moduleCliAdminClientAdministrator,
    cliAdminPerson: moduleCliAdminPerson,
    cliAdminUserConditons: moduleCliAdminUserConditions,
    cliAdminUsers: moduleCliAdminUsers,
    // carer
    report: moduleReports,
    // Dashboard
    dashboardAway: moduleDashboardAway,
    dashboardDay: moduleDashboardDay,
    dashboardDates: moduleDashboardDates,
    dashboardDailyReport: moduleDashboardDailyReport,
    dashboardDrinks: moduleDashboardDrinks,
    dashboardHour: moduleDashboardHour,
    dashboardUsers: moduleDashboardUsers,
    dashboardComment: moduleDashboardComment,
    dashboardWeek: moduleDashboardWeek,
    // Unregistered
    gettingStartedWizard: moduleGettingStartedWizard
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [] // set logger only for development
})
