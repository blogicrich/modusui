import apiLib from '../services/apiLib.js'

export const moduleDashboardComment = {
  state: {
    dashboardComment: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDCOMMENT (state, data) {
      state.dashboardComment = data
    }
  },
  actions: {
    // get all data
    fetchDashboardComment (context) {
      apiLib.getData('carer/dashboard-comment/' + this.getters.getterUserId + '/' + this.getters.getterDate).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDCOMMENT', null)
        } else {
          context.commit('SET_DASHBOARDCOMMENT', response.data)
        }
      }).catch((error) => {
        console.log('error: ', error)
      })
    }
  }
}
