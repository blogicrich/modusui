import apiLib from '../services/apiLib.js'
import Vue from 'vue'

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
      apiLib.getData('cliadmin/wake-sleep-time/' + user, true, true).then((response) => {
        if (typeof response === 'undefined') {
          commit('SET_WAKESLEEPTIME', {})
          commit('SET_DEFAULTVALUES', {})
        } else {
          commit('SET_WAKESLEEPTIME', response)
          commit('SET_DEFAULTVALUES', response)
        }
      })
    },
    updateSleepWakeTimes ({ commit, rootGetters, state }) {
      const user = rootGetters.getterSelectedUser.userId
      apiLib.updateData('cliadmin/wake-sleep-time/' + user, state.times, true, true).then((response) => {
        if (typeof response === 'undefined') {
          commit('SET_WAKESLEEPTIME', {})
          commit('SET_DEFAULTVALUES', {})
        } else {
          commit('SET_WAKESLEEPTIME', response)
          commit('SET_DEFAULTVALUES', response)
        }
      })
    }
  },
  getters: {
    getterDefaultSleepTime: state => state.defaultTimes.sleepTime,
    getterDefaultWakeUpTime: state => state.defaultTimes.wakeUpTime
  }
}
