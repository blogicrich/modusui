import apiLib from '../services/apiLib.js'

export const moduleConditions = {
  state: {
    // store the data
    conditionsGet: []
  },
  mutations: {
    // set the data
    SET_CONDITIONS (state, data) {
      state.conditionsGet = data
    }
  },
  actions: {
    // get all data
    fetchConditionsGet (context) {
      return apiLib.getData('carer/conditions/' + this.getters.getterUserId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_CONDITIONS', null)
        } else {
          context.commit('SET_CONDITIONS', response.data)
        }
      })
    }
  }
}
