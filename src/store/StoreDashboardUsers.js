import apiLib from '../services/apiLib.js'

export const moduleDashboardUsers = {
  state: {
    dashboardUsersLoaded: false,
    dashboardUsersUpdating: false,
    dashboardUsers: []
  },
  mutations: {
    SET_DASHBOARDUSERS (state, data) {
      state.dashboardUsers = data
      state.dashboardUsersLoaded = true
    }
  },
  actions: {
    async fetchDashboardUsers (context) {
      const response = await apiLib.getData('carer/dashboard-users/', false, false)
      if (typeof response === 'object') {
        context.commit('SET_DASHBOARDUSERS', response)
      } else {
        context.commit('SET_DASHBOARDUSERS', [])
      }
    }
  }
}
