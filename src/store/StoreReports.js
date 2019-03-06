import apiLib from '../services/apiLib.js'

export const moduleReports = {
  state: {
    // store the data
    reportsConditions: [],
    reportsSnapshot: [],
    reportComments: []
  },
  mutations: {
    // set the data
    SET_REPORTSCONDITIONS (state, data) {
      state.reportsConditions = data
    },
    SET_REPORTSSNAPSHOT (state, data) {
      state.reportsSnapshot = data
    },
    SET_REPORTSCOMMENTS (state, data) {
      state.reportComments = data
    }
  },
  actions: {
    // get all data
    fetchGetReportsConditions (context) {
      return apiLib.getData('carer/condition/' + this.getters.getterStoreId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_REPORTSCONDITIONS', null)
        } else {
          context.commit('SET_REPORTSCONDITIONS', response.data)
        }
      })
    },
    fetchGetReportsSnapshot (context) {
      return apiLib.getData('carer/reports-snapshot/' + this.getters.getterStoreId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_REPORTSSNAPSHOT', null)
        } else {
          context.commit('SET_REPORTSSNAPSHOT', response.data)
        }
      })
    },
    fetchGetReportComments (context) {
      return apiLib.getData('carer/reports-day-comments/' + this.getters.getterStoreId).then((response) => {
        if (typeof response === 'undefined' || response.length <= 0) {
          context.commit('SET_REPORTSCOMMENTS', null)
        } else {
          context.commit('SET_REPORTSCOMMENTS', response.data)
        }
      })
    }
  },
  getters: {
    // get specific data
  }
}
