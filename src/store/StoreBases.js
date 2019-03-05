import apiLib from '../services/apiLib.js'

export const moduleBases = {
  state: {
    // store the data
    base: []
  },
  mutations: {
    // set the data
    SET_BASE (state, data) {
      state.base = data
    }
  },
  actions: {
    // get all data
    fetchGetBases (context) {
      return apiLib.getData('carer/bases/' + this.getters.getterStoreId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_BASE', null)
        } else {
          context.commit('SET_BASE', response.data)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
