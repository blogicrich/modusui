import apiLib from '../services/apiLib.js'

export const moduleWakeSleepTimes = {
  state: {
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
    }
  },
  actions: {
    // get all data
    fetchWakeSleepTimes ({ commit, rootGetters }) {
      const user = rootGetters.getterSelectedUser.userId
      apiLib.getData('cliadmin/wake-sleep-time/' + user, true, true).then((response) => {
        if (typeof response === 'undefined') {
          commit('SET_WAKESLEEPTIME', {})
        } else {
          commit('SET_WAKESLEEPTIME', response)
        }
      })
    }
  },
  getters: {
    getterSleepTime: state => state.times.sleepTime,
    getterWakeTime: state => state.times.wakeUpTime
  }
}
