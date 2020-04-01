import apiLib from '../services/apiLib.js'

export const moduleDashboardHour = {
  state: {
    dashboardHourGet: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDHOUR (state, data) {
      state.dashboardHourGet = data
    }
  },
  actions: {
    // get all data
    async fetchDashboardHourGet (context, { userId, date }) {
      const response = await apiLib.getData('carer/dashboard-hour/' + userId + '/' + date, false, false)

      if (typeof response === 'object') {
        context.commit('SET_DASHBOARDHOUR', response)
      } else {
        context.commit('SET_DASHBOARDHOUR', null)
      }
    }
  }
}
