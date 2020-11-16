import apiLib from '../services/apiLib.js'
import moment from 'moment'

const bounce = 500

export const moduleCliAdminUsers = {
  state: {
    cliAdminUsers: [],
    cliAdminSelectedUser: {},
    cliAdminSelectedUserDefaults: [],
    cliAdminUsersLoading: false,
    cliAdminUsersUpdating: false,
    cliAdminUsersDeleting: false,
    cliAdminUsersError: false
  },
  mutations: {
    SET_CLIADMIN_USERS (state, data) {
      const arr = []
      for (let i = 0; i < data.length; i++) {
        const element = {
          ...data[i],
          username: data[i].deptPerson.person.givenName + ' ' + data[i].deptPerson.person.familyName
        }
        arr.push(element)
      }
      state.cliAdminUsers = arr
    },
    SET_SELECTED_USER_SETTINGS (state, data) {
      if (data) {
        const selected = state.cliAdminUsers.find(u => u.userId === data.userId)
        state.cliAdminSelectedUser = { ...selected }
      } else {
        state.cliAdminSelectedUser = {}
      }
    },
    SET_CLIADMIN_USERS_LOAD_STATE (state, data) {
      state.cliAdminUsersLoading = data
    },
    SET_CLIADMIN_USERS_UPDATE_STATE (state, data) {
      state.cliAdminUsersUpdating = data
    },
    SET_CLIADMIN_USERS_DELETE_STATE (state, data) {
      state.cliAdminUsersDeleting = data
    },
    SET_CLIADMIN_USERS_ERROR (state, data) {
      state.cliAdminUsersError = data
    },
    RESET_CLIADMIN_USERS_STATE (state) {
      state.cliAdminUsers = []
      state.cliAdminSelectedUser = {}
      state.cliAdminUsersLoading = false
      state.cliAdminUsersError = false
    },
    // Sleep and wake times
    UPDATE_WAKEUPTIME (state, data) {
      state.cliAdminSelectedUser.wakeUpTime = convertTimeToSecondsFromMidnight(data)
    },
    UPDATE_SLEEPTIME (state, data) {
      state.cliAdminSelectedUser.sleepTime = convertTimeToSecondsFromMidnight(data)
    },
    RESET_SLEEP_WAKE_TIMES (state) {
      const defaultUserData = state._cliAdminSelectedUserDefaults.find(user => user.userId === state.cliAdminSelectedUser.userId)
      const resetData = Object.assign({}, defaultUserData)
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
          context.commit('SET_SELECTED_USER_SETTINGS', response[0])
          setTimeout(() => {
            context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
          }, bounce)
          context.commit('SET_CLIADMIN_USERS_LOAD_STATE', false)
          context.commit('SET_CLIADMIN_USERS_ERROR', false)
        } else {
          context.commit('SET_CLIADMIN_USERS', [])
          context.commit('SET_SELECTED_USER_SETTINGS', {})
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
