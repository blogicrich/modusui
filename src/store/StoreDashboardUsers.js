import apiLib from '../services/apiLib.js'

export const moduleDashboardUsers = {
  state: {
    dashboardUsers: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDUSERS (state, data) {
      state.dashboardUsers = data
    }
  },
  actions: {
    // get all data
    fetchDashboardUsers (context) {
      apiLib.getData('carer/dashboard-users/' + this.getters.getterCarerId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDUSERS', null)
        } else {
          context.commit('SET_DASHBOARDUSERS', response.data)
        }
      }).catch((error) => {
        console.log('error: ', error)
      })
    }
  }
}
