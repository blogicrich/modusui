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
// client admins
import { moduleWakeSleepTimes } from '@/store/StoreWakeSleepTimes'
import { moduleIntervalSettings } from '@/store/StoreIntervalSettings'
import { moduleReports } from '@/store/StoreReports'
// Dashboard
import { moduleDashboardDay } from '@/store/StoreDashboardDay'
import { moduleDashboardDates } from '@/store/StoreDashboardDates'
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
    // client Admins
    wakeSleepTimes: moduleWakeSleepTimes,
    intervalSettings: moduleIntervalSettings,
    // carer
    report: moduleReports,
    // Dashboard
    dashboardDay: moduleDashboardDay,
    dashboardDates: moduleDashboardDates,
    dashboardHour: moduleDashboardHour,
    dashboardUsers: moduleDashboardUsers,
    DashboardComment: moduleDashboardComment,
    dashboardWeek: moduleDashboardWeek,
    // Unregistered
    gettingStartedWizard: moduleGettingStartedWizard
  },
  strict: debug,
  plugins: debug ? [ createLogger() ] : [] // set logger only for development
})
