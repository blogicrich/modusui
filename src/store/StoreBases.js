import apiLib from '../services/apiLib.js'

export const moduleBases = {
  state: {
    // store the data
    basesGet: []
  },
  mutations: {
    // set the data
    SET_BASES (state, data) {
      state.basesGet = data
    }
  },
  actions: {
    // get all data
    fetchBasesGet (context) {
      return apiLib.getData('carer/bases/' + this.getters.getterUserId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_BASES', null)
        } else {
          context.commit('SET_BASES', response.data)
        }
      })
    }
  }
}
