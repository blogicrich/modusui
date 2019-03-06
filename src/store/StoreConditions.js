import apiLib from '../services/apiLib.js'

export const moduleConditions = {
  state: {
    // store the data
    condition: []
  },
  mutations: {
    // set the data
    SET_CONDITION (state, data) {
      state.condition = data
    }
  },
  actions: {
    // get all data
    fetchGetConditions (context) {
      return apiLib.getData('carer/conditions/' + this.getters.getterStoreId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_CONDITION', null)
        } else {
          context.commit('SET_CONDITION', response.data)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
