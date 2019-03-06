import apiLib from '../services/apiLib.js'

export const moduleDashboardUsers = {
  state: {
    dashboardUsersGet: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDUSERS (state, data) {
      state.dashboardUsersGet = data
    }
  },
  actions: {
    // get all data
    fetchDashboardUsersGet (context) {
      apiLib.getData('carer/dashboard-users/' + this.getters.getterCarerId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDUSERS', null)
        } else {
          context.commit('SET_DASHBOARDUSERS', response.data)
        }
      })
    }
  }
}
