import apiLib from '../services/apiLib.js'

export const moduleEDropletMan = {
  state: {
    edropman: []
  },
  mutations: {
    // set the data
    SET_EDROPLETMAN (state, data) {
      state.conditions = data
    }
  },
  actions: {
    // get all data
    fetchEDropman (context) {
      apiLib.getData('cliadmin/edropman/' + this.getters.getterAccountHolderId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_EDROPLETMAN', null)
        } else {
          context.commit('SET_EDROPLETMAN', response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
