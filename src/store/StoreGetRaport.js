import apiLib from '../services/apiLib.js'

export const moduleRaportData = {
  state: {
    // store the data
    dashboard: []
  },
  mutations: {
    // set the data
    SET_REPORT (state, data) {
      state.dashboard = data
    }
  },
  actions: {
    // get all data
    fetchReport (context) {
      // axios data
      apiLib.getData('carer/condition/' + 'id').then((response) => {
        context.commit('SET_REPORT', response)
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  getters: {
    // get specific data
  }
}
