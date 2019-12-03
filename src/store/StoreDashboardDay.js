import apiLib from '../services/apiLib.js'

export const moduleDashboardDay = {
  state: {
    dashboardDayGet: []
  },

  mutations: {
    SET_DASHBOARDDAY (state, data) {
      state.dashboardDayGet = data
    }
  },

  actions: {
    async fetchDashboardDayGet (context, { userId, date }) {
      const response = await apiLib.getData('carer/dashboard-day/' + userId + '/' + date, false, false)
      if (typeof response === 'object') {
        context.commit('SET_DASHBOARDDAY', response)
      } else {
        context.commit('SET_DASHBOARDDAY', null)
      }
    }
  }
}
