import apiLib from '../services/apiLib.js'

export const moduleDashboardComment = {
  state: {
    dashboardCommentPost: [],
    dashboardCommentGet: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDCOMMENT (state, data) {
      state.dashboardCommentGet = data
    }
  },
  actions: {
    // get all data
    async fetchDashboardCommentGet (context) {
      await apiLib.getData('carer/dashboard-comment/' + 21 + '/' + 1557917441, false, true).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDCOMMENT', null)
        } else {
          context.commit('SET_DASHBOARDCOMMENT', response.data)
        }
      })
    },
    fetchDashboardCommentPost () {
      return apiLib.postData('carer/dashboard-comment/' + 21 + '/' + '1557917441', this.getterDashboardCommentPost, true)
    },
    fetchDashboardCommentDelete () {
      return apiLib.deleteData('carer/dashboard-comment/' + 1)
    }
  },
  getters: {
    getterDashboardCommentPost: state => state.dashboardCommentGet
  }
}
