import apiLib from '../services/apiLib.js'

export const moduleAlertData = {
  state: {
    // store the data
    dashboard: []
  },
  mutations: {
    // set the data
    SET_ALERT (state, data) {
      state.dashboard = data
    }
  },
  actions: {
    // get all data
    fetchAlert (context) {
      // axios data
      apiLib.getData('carer/alerts/' + 'id').then((response) => {
        context.commit('SET_ALERT', response)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  getters: {
    // get specific data
  }
}
