import apiLib from '../services/apiLib.js'

export const moduleConditionsOptions = {
  state: {
    // store the data
    conditionOptions: []
  },
  mutations: {
    // set the data
    SET_CONDITIONOPTIONS (state, data) {
      state.conditionOptions = data
    }
  },
  actions: {
    // get all data
    fetchGetconditionOptions (context) {
      return apiLib.getData('sysadmin/condition-options').then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_CONDITIONOPTIONS', 'hello???')
        } else {
          context.commit('SET_CONDITIONOPTIONS', response)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
