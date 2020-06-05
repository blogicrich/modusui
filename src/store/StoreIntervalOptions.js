import apiLib from '../services/apiLib.js'

export const moduleIntervalOptions = {
  state: {
    intervalsLoading: true,
    intervals: [],
    intervalsClone: []
  },
  mutations: {
    SET_INTERVAL_OPTIONS_LOAD_STATUS (state, data) {
      state.intervalsLoading = data
    },
    SET_INTERVAL_OPTIONS (state, data) {
      state.intervals = data
      state.intervalsClone = JSON.parse(JSON.stringify(data))
    },
    SET_NEW_SPOKEN_REMINDER_INTERVAL (state, data) {
      state.intervals.spokenReminder.forEach(e => {
        let index = state.intervals.spokenReminder.findIndex(slice => slice === e)
        if (e.spokenReminderId === data.id) {
          state.intervals.spokenReminder.splice(index, 1, { spokenReminderId: data.id, time: data.time, default: 'Y' })
        } else {
          state.intervals.spokenReminder.splice(index, 1, { spokenReminderId: e.spokenReminderId, time: e.time, default: 'N' })
        }
      })
    },
    SET_NEW_BLUE_LIGHT_INTERVAL (state, data) {
      state.intervals.blueLightFlashingInterval.forEach(e => {
        let index = state.intervals.blueLightFlashingInterval.findIndex(slice => slice === e)
        if (e.blueLightFlashingIntervalId === data.id) {
          state.intervals.blueLightFlashingInterval.splice(index, 1, { blueLightFlashingIntervalId: data.id, time: data.time, default: 'Y' })
        } else {
          state.intervals.blueLightFlashingInterval.splice(index, 1, { blueLightFlashingIntervalId: e.blueLightFlashingIntervalId, time: e.time, default: 'N' })
        }
      })
    },
    RESET_INTERVAL_OPTIONS (state) {
      state.intervals = JSON.parse(JSON.stringify(state.intervalsClone))
    }
  },
  actions: {
    async fetchIntervals (context) {
      context.commit('SET_INTERVAL_OPTIONS_LOAD_STATUS', true)
      await apiLib.getData('/sysadmin/interval-options').then(response => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_INTERVAL_OPTIONS', [])
        } else {
          context.commit('SET_INTERVAL_OPTIONS', response)
          context.commit('SET_INTERVAL_OPTIONS_LOAD_STATUS', false)
        }
      })
    },
    async updateIntervalOptions (context, payload) {
      return apiLib.updateData('/sysadmin/interval-options', payload, true, true).then(() => {
        context.commit('SET_INTERVAL_OPTIONS', JSON.parse(JSON.stringify(context.state.intervals)))
      })
    }
  }
}
