import apiLib from '../services/apiLib.js'

export const moduleGettingStartedWizard = {
  state: {
    titles: null,
    registerStatus: null
  },
  mutations: {
    SET_REGISTER_STATUS (state, status) {
      state.registerStatus = status
    },
    SET_TITLES (state, payload) {
      state.titles = payload
    }
  },
  actions: {
    async getTitles ({ commit }) {
      commit('SET_TITLES', await apiLib.getData('public/titles'))
    }
  }
}
