import apiLib from '../services/apiLib.js'

export const moduleDashboardHour = {
  state: {
    dashboardHour: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDHOUR (state, data) {
      state.dashboardHour = data
    }
  },
  actions: {
    // get all data
    fetchDashboardHour (context) {
      apiLib.getData('carer/dashboard-hour/' + this.getters.getterUserId + '/' + this.getters.getterDate).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDHOUR', null)
        } else {
          context.commit('SET_DASHBOARDHOUR', response.data)
        }
      }).catch((error) => {
        console.log('error: ', error)
      })
    }
  }
}
