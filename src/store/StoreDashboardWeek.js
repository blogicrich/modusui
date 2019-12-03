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
    async fetchDashboardWeekGet (context, { userId, date }) {
      const response = await apiLib.getData('carer/dashboard-week/' + userId + '/' + date, false, false)

      if (typeof response === 'object') {
        context.commit('SET_DASHBOARDWEEK', response)
      } else {
        context.commit('SET_DASHBOARDWEEK', null)
      }
    }
  }
}
