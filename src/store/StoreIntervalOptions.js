import apiLib from '../services/apiLib.js'

export const moduleIntervalOptions = {
  state: {
    // store the data
    intervalOptions: []
  },
  mutations: {
    // set the data
    SET_INTERVALOPTIONS (state, data) {
      state.intervalOptionsGet = data
    }
  },
  actions: {
    // get all data
    fetchIntervalOptions (context) {
      return apiLib.getData('sysadmin/interval-options').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_INTERVALOPTIONS', null)
        } else {
          context.commit('SET_INTERVALOPTIONS', response)
        }
      })
    },
    postIntervalOptions (payload) {
      return apiLib.updateData('sysadmin/interval-options/', payload)
    }
  },
  getters: {
    // get specific data
    getterIntervalOptionsPut: state => {
      return state.intervalOptions
    }
  }
}
