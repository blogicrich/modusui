import apiLib from '../services/apiLib.js'

export const moduleHydrationParameters = {
  state: {
    // store the data
    hydrationParameters: []
  },
  mutations: {
    // set the data
    SET_HYDRATIONPARAMETERS (state, data) {
      state.hydrationParameters = data
    }
  },
  actions: {
    // get all data
    fetchGetHydrationParameters (context) {
      return apiLib.getData('sysadmin/hydration-params').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_HYDRATIONPARAMETERS', null)
        } else {
          context.commit('SET_HYDRATIONPARAMETERS', response)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
