import apiLib from '../services/apiLib.js'

export const moduleDashboardData = {
  state: {
    // store the data
    dashboard: []
  },
  mutations: {
    // set the data
    SET_DASHBOARD (state, data) {
      state.dashboard = data
    }
  },
  actions: {
    // get all data
    fetchDashboard (context) {
      // axios data
      apiLib.getData()
    }
  },
  getters: {
    // get specific data
  }
}
