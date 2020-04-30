import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleWakeSleepTimes = {
  state: {
    defaultTimes: {},
    times: {}
  },
  mutations: {
    // set the data
    SET_WAKESLEEPTIME (state, data) {
      state.times = data
    },
    UPDATE_WAKEUPTIME (state, data) {
      state.times.wakeUpTime = data
    },
    UPDATE_SLEEPTIME (state, data) {
      state.times.sleepTime = data
    },
    SET_DEFAULTVALUES (state, data) {
      state.times = data
    }
  },
  actions: {
    // get all data
    fetchWakeSleepTimes ({ commit, rootGetters }) {
      const user = rootGetters.getterSelectedUser.userId
      apiLib.getData('cliadmin/wake-sleep-time/' + user, false, true).then((response) => {
        if (typeof response === 'undefined') {
          commit('SET_WAKESLEEPTIME', {})
          commit('SET_DEFAULTVALUES', {})
        } else {
          commit('SET_WAKESLEEPTIME', {
            wakeUpTime: convertTimeToHourMin(response.wakeUpTime),
            sleepTime: convertTimeToHourMin(response.sleepTime)
          })
          commit('SET_DEFAULTVALUES', {
            wakeUpTime: convertTimeToHourMin(response.wakeUpTime),
            sleepTime: convertTimeToHourMin(response.sleepTime)
          })
        }
      })
    },
    async updateSleepWakeTimes ({ commit, rootGetters, state }) {
      const userId = rootGetters.getterSelectedUser.userId
      await apiLib.updateData('cliadmin/wake-sleep-time/' + userId, {
        wakeUpTime: convertTimeToSecondsFromMidnight(state.times.wakeUpTime),
        sleepTime: convertTimeToSecondsFromMidnight(state.times.sleepTime)
      }, false, true)
    }
  },
  getters: {
    getterDefaultSleepTime: state => state.defaultTimes.sleepTime,
    getterDefaultWakeUpTime: state => state.defaultTimes.wakeUpTime
  }
}

function convertTimeToHourMin (secondsFromMidnight) {
  return moment().startOf('day').add(secondsFromMidnight, 'seconds').format('HH:mm')
}

function convertTimeToSecondsFromMidnight (time) {
  const startOfDay = moment().startOf('day')
  return moment(time, 'HH:mm').diff(startOfDay, 'seconds')
}
