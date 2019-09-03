import apiLib from '../services/apiLib.js'

export const moduleDashboardUsers = {
  state: {
    dashboardUsersGet: []
  },
  mutations: {
    SET_DASHBOARDUSERS (state, data) {
      state.dashboardUsersGet = data
    }
  },
  actions: {
    async fetchDashboardUsersGet (context) {
      const response = await apiLib.getData('carer/dashboard-users/', false, false)

      if (typeof response === 'object') {
        context.commit('SET_DASHBOARDUSERS', response)
      } else {
        context.commit('SET_DASHBOARDUSERS', null)
      }
    }
  }
}
