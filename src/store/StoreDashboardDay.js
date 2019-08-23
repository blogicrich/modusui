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
    async fetchDashboardDayGet (context) {
      const response = await apiLib.getData('carer/dashboard-day/' + this.getters.getterUserId + '/' + this.getters.getterDate, false, true)

      if (typeof response === 'undefined' || response.length <= 0) {
        context.commit('SET_DASHBOARDDAY', null)
      } else {
        context.commit('SET_DASHBOARDDAY', response)
      }
    }
  }
}
