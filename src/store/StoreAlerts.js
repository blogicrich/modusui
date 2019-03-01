import apiLib from '../services/apiLib.js'

export const moduleAlerts = {
  state: {
    // store the data
    alert: []
  },
  mutations: {
    // set the data
    SET_ALERT (state, data) {
      state.alert = data
    }
  },
  actions: {
    // get all data
    fetchGetAlert (context) {
      return apiLib.getData('carer/alert/' + this.getters.getterStoreId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_ALERT', null)
        } else {
          context.commit('SET_ALERT', response.data)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
