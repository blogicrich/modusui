import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleCliAdminUsers = {
  state: {
    cliAdminUsers: [],
    cliAdminUsersLoading: false,
    cliAdminUsersUpdating: false,
    cliAdminError: false,
    cliAdminSelectedUser: {},
    _cliAdminSelectedUserDefaults: []
  },
  mutations: {
    SET_CLIADMIN_USERS (state, data) {
      state.cliAdminUsers = data
      state._cliAdminSelectedUserDefaults = JSON.parse(JSON.stringify(data))
    },
    SET_NEW_CLIADMIN_USERS_DEFAULTS (state) {
      const newDefaults = JSON.parse(JSON.stringify(state.cliAdminSelectedUser))
      const index = state._cliAdminSelectedUserDefaults.findIndex(
        u => u.userId === state.cliAdminSelectedUser.userId
      )
      state._cliAdminSelectedUserDefaults[index] = Object.assign(state._cliAdminSelectedUserDefaults[index], {}, newDefaults)
    },
    SET_CLIADMIN_USERS_LOAD_STATE (state, data) {
      state.cliAdminUsersLoading = data
    },
    SET_CLIADMIN_USERS_UPDATE_STATE (state, data) {
      state.cliAdminUsersUpdating = data
    },
    SET_CLIADMIN_USERS_ERROR (state, data) {
      state.cliAdminError = data
    },
    SET_CLIADMIN_SELECTED_USER (state, data) {
      state.cliAdminSelectedUser = data
    },
    RESET_CLIADMIN_USERS_STATE (state) {
      state.cliAdminUsers = []
      state.cliAdminSelectedUser = {}
      state.cliAdminUsersLoading = false
      state.cliAdminError = false
    },
    // Sleep and wake times
    UPDATE_WAKEUPTIME (state, data) {
      state.cliAdminSelectedUser.wakeUpTime = convertTimeToSecondsFromMidnight(data)
    },
    UPDATE_SLEEPTIME (state, data) {
      state.cliAdminSelectedUser.sleepTime = convertTimeToSecondsFromMidnight(data)
    },
    RESET_SLEEP_WAKE_TIMES (state) {
      let defaultUserData = state._cliAdminSelectedUserDefaults.find(user => user.userId === state.cliAdminSelectedUser.userId)
      let resetData = Object.assign({}, defaultUserData)
      state.cliAdminSelectedUser = resetData
    }
    // Interval Settings Management
  },
  actions: {
    async fetchCliAdminUsers (context, payload) {
      try {
        context.commit('SET_CLIADMIN_USERS_LOAD_STATE', true)
        const response = await apiLib.getData('cliadmin/user')
        if (Array.isArray(response)) {
          context.commit('SET_CLIADMIN_USERS', response)
          context.commit('SET_CLIADMIN_SELECTED_USER', response[0])
          context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_USERS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_USERS', [])
          context.commit('SET_CLIADMIN_SELECTED_USER', {})
          context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USERS_ERROR', true)
      }
    },
    async updateCliAdminUser (context, payload) {
      context.commit('SET_CLIADMIN_USERS_UPDATE_STATE', true)
      console.log(payload)
      try {
        const updatePayload = {
          genderId: payload.genderId,
          wakeUpTime: payload.wakeUpTime,
          sleepTime: payload.sleepTime,
          voiceReminderIntervalId: payload.voiceReminderIntervalId,
          blueLightFlashingIntervalId: payload.blueLightFlashingIntervalId,
          voiceMessageVolume: payload.voiceMessageVolume,
          dailyOtherHydrationConsumption: payload.dailyOtherHydrationConsumption,
          comments: payload.comments,
          hydrationTargetComments: payload.hydrationTarget.comments || '',
          miscellaneousAdjustment: payload.hydrationTarget.miscellaneousAdjustment
        }
        await apiLib.updateData('cliadmin/user/' + payload.userId, updatePayload, false, true)
        context.commit('SET_NEW_CLIADMIN_USERS_DEFAULTS')
        context.commit('SET_CLIADMIN_USERS_UPDATE_STATE', false)
      } catch (error) {
        console.error(error)
        context.commit('SET_CLIADMIN_USERS_UPDATE_STATE', false)
        context.commit('SET_CLIADMIN_USERS_ERROR', true)
      }
    }
  },
  getters: {
    // Sleep and wake times
    getterSleepTime: state => {
      return convertTimeToHourMin(state.cliAdminSelectedUser.sleepTime)
    },
    getterWakeUpTime: state => {
      return convertTimeToHourMin(state.cliAdminSelectedUser.wakeUpTime)
    },
    getterDefaultSleepTime: state => {
      const defaults = state._cliAdminSelectedUserDefaults.find(
        u => u.userId === state.cliAdminSelectedUser.userId
      )
      return convertTimeToHourMin(defaults.sleepTime)
    },
    getterDefaultWakeUpTime: state => {
      const defaults = state._cliAdminSelectedUserDefaults.find(
        u => u.userId === state.cliAdminSelectedUser.userId
      )
      return convertTimeToHourMin(defaults.wakeUpTime)
    },
    getterSleepWakeTimesIsPristine (state, getters) {
      return getters.getterSleepTime === getters.getterDefaultSleepTime && getters.getterWakeUpTime === getters.getterDefaultWakeUpTime
    }
  }
}

function convertTimeToHourMin (secondsFromMidnight) {
  return moment().startOf('day').add(secondsFromMidnight, 'seconds').format('HH:mm')
}

function convertTimeToSecondsFromMidnight (time) {
  const startOfDay = moment().startOf('day')
  return moment(time, 'HH:mm').diff(startOfDay, 'seconds')
}
