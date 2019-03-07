import apiLib from '../services/apiLib.js'

export const moduleDashboardDay = {
  state: {
    dashboardDayGet: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDDAY (state, data) {
      state.dashboardDayGet = data
    }
  },
  actions: {
    // get all data
    fetchDashboardDayGet (context) {
      apiLib.getData('carer/dashboard-day/' + this.getters.getterUserId + '/' + this.getters.getterDate).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDDAY', null)
        } else {
          context.commit('SET_DASHBOARDDAY', response.data)
        }
      })
    }
  }
}