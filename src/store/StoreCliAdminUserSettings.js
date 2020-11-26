import apiLib from '../services/apiLib.js'
import moment from 'moment'

const bounce = 500

export const moduleCliAdminUserSettings = {
  state: {
    cliAdminUserSettings: [],
    cliAdminSelectedUserSettings: {},
    cliAdminSpokenIntervalOptions: [],
    cliAdminLightIntervalOptions: [],
    cliAdminUserSettingsLoading: false,
    cliAdminUserSettingsError: false,
    cliAdminUserSettingsUpdating: false,
    cliAdminUserSettingsDeleting: false
  },
  mutations: {
    SET_USER_SETTINGS (state, data) {
      const arr = []
      for (let i = 0; i < data.length; i++) {
        const element = {
          userId: data[i].userId,
          username: data[i].deptPerson.person.givenName + ' ' + data[i].deptPerson.person.familyName,
          status: data[i].status,
          sleepTime: convertTimeToHourMin(data[i].sleepTime),
          wakeUpTime: convertTimeToHourMin(data[i].wakeUpTime),
          voiceReminderIntervalId: data[i].voiceReminderIntervalId,
          blueLightFlashingIntervalId: data[i].blueLightFlashingIntervalId,
          voiceMessageVolume: data[i].voiceMessageVolume,
          dailyOtherHydrationConsumption: data[i].dailyOtherHydrationConsumption,
          comments: data[i].comments,
          hydrationTargetComments: data[i].hydrationTarget.comments,
          miscellaneousAdjustment: data[i].hydrationTarget.miscellaneousAdjustment,
          genderId: data[i].genderId
        }
        arr.push(element)
      }
      state.cliAdminUserSettings = arr
    },
    SET_SELECTED_USER_SETTINGS (state, data) {
      if (data) {
        const selected = state.cliAdminUserSettings.find(u => u.userId === data.userId)
        state.cliAdminSelectedUserSettings = { ...selected }
      } else {
        state.cliAdminSelectedUserSettings = {}
      }
    },
    SET_INTERVAL_OPTIONS (state, data) {
      const spokenReminderOptions = []
      const blueLightFlashingOptions = []
      for (let i = 0; i < data.spokenReminder.length; i++) {
        const element = {
          ...data.spokenReminder[i],
          menuText: data.spokenReminder[i].time + ' minutes'
        }
        spokenReminderOptions.push(element)
      }
      for (let j = 0; j < data.blueLightFlashingInterval.length; j++) {
        const element = {
          ...data.blueLightFlashingInterval[j],
          menuText: data.blueLightFlashingInterval[j].time + ' minutes'
        }
        blueLightFlashingOptions.push(element)
      }
      state.cliAdminSpokenIntervalOptions = spokenReminderOptions
      state.cliAdminLightIntervalOptions = blueLightFlashingOptions
    },
    // Sleep and wake times
    UPDATE_SELECTED_USER_WAKEUPTIME (state, data) {
      state.cliAdminSelectedUserSettings.wakeUpTime = data
    },
    UPDATE_SELECTED_USER_SLEEPTIME (state, data) {
      state.cliAdminSelectedUserSettings.sleepTime = data
    },
    // Interval Settings
    UPDATE_SELECTED_USER_LIGHT_INTERVAL (state, data) {
      state.cliAdminSelectedUserSettings.blueLightFlashingIntervalId = data
    },
    UPDATE_SELECTED_USER_SPOKEN_INTERVAL (state, data) {
      state.cliAdminSelectedUserSettings.voiceReminderIntervalId = data
    },
    // Store
    SET_CLIADMIN_USER_SETTINGS_LOAD_STATE (state, data) {
      state.cliAdminUserSettingsLoading = data
    },
    SET_CLIADMIN_USER_SETTINGS_ERROR (state, data) {
      state.cliAdminUserSettingsError = data
    },
    SET_CLIADMIN_USER_SETTINGS_UPDATE_STATE (state, data) {
      state.cliAdminUserSettingsUpdating = data
    },
    SET_CLIADMIN_USER_SETTINGS_DELETE_STATE (state, data) {
      state.cliAdminUserSettingsDeleting = data
    },
    RESET_CLIADMIN_USER_SETTINGS_STORE_STATE (state) {
      state.cliAdminUserSettings = []
      state.cliAdminSpokenIntervalOptions = []
      state.cliAdminLightIntervalOptions = []
      state.cliAdminSelectedUserSettings = {}
      state.cliAdminUserSettingsLoading = false
      state.cliAdminUserSettingsError = false
      state.cliAdminUserSettingsUpdating = false
      state.cliAdminUserSettingsDeleting = false
    }
  },
  actions: {
    async setCliAdminUserSettings (context) {
      try {
        context.commit('SET_CLIADMIN_USER_SETTINGS_ERROR', false)
        context.commit('SET_CLIADMIN_USER_SETTINGS_LOAD_STATE', true)
        let users = []
        let defaultIntervals = []
        // Update users and default interval options in rootState
        await context.dispatch('fetchCommonData')
        await context.dispatch('fetchCliAdminUsers')
        users = context.rootState.cliAdminUsers.cliAdminUsers
        defaultIntervals = context.rootState.commonData.intervalOptions
        // Get users and default options from from rootState
        setTimeout(() => {
          context.commit('SET_USER_SETTINGS', users)
          context.commit('SET_INTERVAL_OPTIONS', defaultIntervals)
          context.commit('SET_CLIADMIN_USER_SETTINGS_LOAD_STATE', false)
        }, bounce)
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_SETTINGS_LOAD_STATE', false)
        context.commit('SET_CLIADMIN_USER_SETTINGS_ERROR', true)
      }
    },
    async updateCliAdminUserSettings (context) {
      try {
        context.commit('SET_CLIADMIN_USER_SETTINGS_ERROR', false)
        context.commit('SET_CLIADMIN_USER_SETTINGS_UPDATE_STATE', true)
        const payload = { ...context.state.cliAdminSelectedUserSettings }
        // Convert times to seconds from midnight
        payload.wakeUpTime = convertTimeToSecondsFromMidnight(payload.wakeUpTime)
        payload.sleepTime = convertTimeToSecondsFromMidnight(payload.sleepTime)
        payload.hydrationTargetComments = ''
        await apiLib.updateData('cliadmin/user/' + payload.userId, payload, false, true)
        // Reset data
        await context.dispatch('setCliAdminUserSettings')
        setTimeout(() => {
          context.commit('SET_CLIADMIN_USER_SETTINGS_UPDATE_STATE', false)
        }, bounce)
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USER_SETTINGS_UPDATE_STATE', false)
        context.commit('SET_CLIADMIN_USER_SETTINGS_ERROR', true)
      }
    }
  }
}

function convertTimeToSecondsFromMidnight (time) {
  const startOfDay = moment().startOf('day')
  return moment(time, 'HH:mm').diff(startOfDay, 'seconds')
}

function convertTimeToHourMin (secondsFromMidnight) {
  return moment().startOf('day').add(secondsFromMidnight, 'seconds').format('HH:mm')
}
