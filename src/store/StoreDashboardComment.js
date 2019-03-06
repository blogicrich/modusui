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
    fetchDashboardCommentGet (context) {
      apiLib.getData('carer/dashboard-comment/' + this.getters.getterUserId + '/' + this.getters.getterDate).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_DASHBOARDCOMMENT', null)
        } else {
          context.commit('SET_DASHBOARDCOMMENT', response.data)
        }
      })
    },
    fetchDashboardCommentPost () {
      return apiLib.postData('carer/dashboard-comment/' + this.getters.getterUserId + '/' + this.getters.getterDate, this.getterDashboardCommentPost)
    },
    fetchDashboardCommentDelete () {
      return apiLib.deleteData('carer/dashboard-comment/' + this.getters.getterDayReportId)
    }
  },
  getters: {
    getterDashboardCommentPost: state => state.dashboardCommentGet
  }
}
