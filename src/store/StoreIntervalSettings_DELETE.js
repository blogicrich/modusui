import apiLib from '../services/apiLib.js'

export const moduleIntervalSettings = {
  state: {
    intervalSettings: null
  },
  mutations: {
    SET_INTERVAL_SETTINGS (state, data) {
      state.intervalSettings = data
    }
  },
  actions: {
    async fetchIntervalSettings ({ commit, rootState }) {
      commit('SET_INTERVAL_SETTINGS', await apiLib.getData('/cliadmin/interval-settings/' + rootState.eDropletApp.selectedUser.userId))
    },
    async updateIntervalSettings ({ commit, rootState }, payload) {
      await apiLib.updateData('/cliadmin/interval-settings/' + rootState.eDropletApp.selectedUser.userId, payload, false, true)
    }
  }
}
