import apiLib from '../services/apiLib.js'

export const moduleDashboardWeek = {
  state: {
    dashboardWeekGet: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDWEEK (state, data) {
      state.dashboardWeekGet = data
    }
  },
  actions: {
    // get all data
    async fetchDashboardWeekGet (context) {
      const response = await apiLib.getData('carer/dashboard-week/' + this.getters.getterUserId + '/' + this.getters.getterDate, false, true)
      if (typeof response === 'undefined' || response.length <= 0) {
        context.commit('SET_DASHBOARDWEEK', null)
      } else {
        context.commit('SET_DASHBOARDWEEK', response)
      }
    }
  }
}
