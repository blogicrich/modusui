import apiLib from '../services/apiLib.js'

export const moduleAlerts = {
  state: {
    // store the data
    alertsGet: []
  },
  mutations: {
    // set the data
    SET_ALERTS (state, data) {
      state.alertsGet = data
    }
  },
  actions: {
    // get all data
    fetchAlertGet (context) {
      return apiLib.getData('carer/alert/' + this.getters.getterUserId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_ALERTS', null)
        } else {
          context.commit('SET_ALERTS', response.data)
        }
      })
    }
  }
}
