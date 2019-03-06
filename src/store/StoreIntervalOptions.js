import apiLib from '../services/apiLib.js'

export const moduleIntervalOptions = {
  state: {
    // store the data
    intervalOptions: []
  },
  mutations: {
    // set the data
    SET_INTERVALOPTIONS (state, data) {
      state.intervalOptions = data
    }
  },
  actions: {
    // get all data
    fetchGetHydrationParameters (context) {
      return apiLib.getData('sysadmin/interval-options').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_INTERVALOPTIONS', null)
        } else {
          context.commit('SET_INTERVALOPTIONS', response)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
