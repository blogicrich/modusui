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
      await apiLib.getData('carer/dashboard-users/', false, true).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDUSERS', null)
        } else {
          context.commit('SET_DASHBOARDUSERS', response)
        }
      })
    }
  }
}
