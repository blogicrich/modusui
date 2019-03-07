import apiLib from '../services/apiLib.js'

export const moduleEDropMan = {
  state: {
    edropmanPut: [],
    edropmanGet: []
  },
  mutations: {
    // set the data
    SET_EDROPMAN (state, data) {
      state.edropmanGet = data
    }
  },
  actions: {
    // get all data
    fetchEDropmanGet (context) {
      apiLib.getData('cliadmin/edropman/' + this.getters.getterAccountHolderId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_EDROPMAN', null)
        } else {
          context.commit('SET_EDROPMAN', response.data)
        }
      })
    },
    fetchEDropmanPut () {
      return apiLib.updateData('cliadmin/edropman/' + this.getters.getterAccountHolderId, this.getterEDropManPut)
    }
  },
  getters: {
    getterEDropManPut: state => state.edropmanPut
  }
}
