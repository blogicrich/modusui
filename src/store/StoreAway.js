import apiLib from '../services/apiLib.js'

export const moduleAway = {
  state: {
    // store the data
    awayPut: [],
    away: []
  },
  mutations: {
    // set the data
    SET_AWAY (state, data) {
      state.condition = data
    }
  },
  actions: {
    // get all data
    fetchGetAway (context) {
      return apiLib.getData('carer/away/' + this.getters.getterStoreId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_AWAY', null)
        } else {
          context.commit('SET_AWAY', response.data)
        }
      })
    },
    fetchSysAdminPut () {
      return apiLib.updateData('carer/away/' + this.getters.getterUserId, this.getters.getterDataPut)
    }
  },
  getters: {
    getterDataPut: state => state.awayPut
  }
}
