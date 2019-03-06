import apiLib from '../services/apiLib.js'

export const moduleDashboardDay = {
  state: {
    dashboardDay: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDDAY (state, data) {
      state.dashboardDay = data
    }
  },
  actions: {
    // get all data
    fetchDashboardDay (context) {
      apiLib.getData('carer/dashboard-day/' + this.getters.getterUserId + '/' + this.getters.getterDate).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDDAY', null)
        } else {
          context.commit('SET_DASHBOARDDAY', response.data)
        }
      }).catch((error) => {
        console.log('error: ', error)
      })
    }
  }
}
