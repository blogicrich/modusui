import apiLib from '../services/apiLib.js'

export const moduleAway = {
  state: {
    // store the data
    awayPut: [],
    awayGet: []
  },
  mutations: {
    // set the data
    SET_AWAY (state, data) {
      state.awayGet = data
    }
  },
  actions: {
    // get all data
    fetchAwayGet (context) {
      return apiLib.getData('carer/away/' + this.getters.getterUserId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_AWAY', null)
        } else {
          context.commit('SET_AWAY', response.data)
        }
      })
    },
    fetchAwayPut () {
      return apiLib.updateData('carer/away/' + this.getters.getterUserId, this.getters.getterAwayPut)
    }
  },
  getters: {
    getterAwayPut: state => state.awayPut
  }
}
