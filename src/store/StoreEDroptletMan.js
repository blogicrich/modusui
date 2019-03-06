import apiLib from '../services/apiLib.js'

export const moduleEDropletMan = {
  state: {
    edropmanPut: [],
    edropman: []
  },
  mutations: {
    // set the data
    SET_EDROPMAN (state, data) {
      state.conditions = data
    }
  },
  actions: {
    // get all data
    fetchEDropman (context) {
      apiLib.getData('cliadmin/edropman/' + this.getters.getterAccountHolderId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_EDROPMAN', null)
        } else {
          context.commit('SET_EDROPMAN', response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchEDropmanPut () {
      return apiLib.deleteData('cliadmin/edropman/' + this.getters.getterAccountHolderId, this.getterDataPut)
    }
  },
  getters: {
    getterDataPut: state => state.edropmanPut
  }
}
