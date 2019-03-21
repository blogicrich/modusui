import apiLib from '../services/apiLib.js'

export const moduleReports = {
  state: {
    // store the data
    reportsConditionsGet: [],
    reportsSnapshotGet: [],
    reportCommentsGet: [],
    reportDayReportsGet: []
  },
  mutations: {
    // set the data
    SET_REPORTSCONDITIONS (state, data) {
      state.reportsConditionsGet = data
    },
    SET_REPORTSSNAPSHOT (state, data) {
      state.reportsSnapshotGet = data
    },
    SET_REPORTSCOMMENTS (state, data) {
      state.reportCommentsGet = data
    },
    SET_DAYREPORTS (state, data) {
      let dayReports = []
      for (let i = 0; i < data.length; i++) {
        let dayReport = data[i]
        let aggregatedHydration = dayReport.aggregatedHydration
        let hydrationLevel = (dayReport.volumeConsumedViaEDroplet +
            dayReport.volumeConsumedViaOther) +
          '/' +
          dayReport.hydrationTarget
        let date = dayReport.dateTime

        dayReports.push({
          status: aggregatedHydration,
          hydrationLevel: hydrationLevel,
          date: date
        })
      }
      state.reportDayReportsGet = dayReports
    }
  },
  actions: {
    // get all data
    async fetchReportsConditionsGet (context) {
      await apiLib.getData('carer/condition/' + this.getters.getterUserId, true).then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_REPORTSCONDITIONS', null)
        } else {
          context.commit('SET_REPORTSCONDITIONS', response)
        }
      })
    },
    async fetchReportsSnapshotGet (context) {
      await apiLib.getData('carer/reports-snapshot/' + this.getters.getterUserId + '/' + this.getters.getterDate, true).then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_REPORTSSNAPSHOT', null)
        } else {
          context.commit('SET_REPORTSSNAPSHOT', response)
        }
      })
    },
    async fetchReportCommentsGet (context) {
      await apiLib.getData('carer/reports-day-comments/' + this.getters.getterUserId, true).then((response) => {
        if (typeof response === 'undefined') {
          context.commit('SET_REPORTSCOMMENTS', null)
        } else {
          context.commit('SET_REPORTSCOMMENTS', response)
        }
      })
    },
    async fetchDayReports (context) {
      await apiLib.getData('carer/reports-snapshot/' +
          this.getters.getterUserId + '/' +
          this.getters.getterDate, true)
        .then(
          (response) => {
            if (typeof response === 'undefined') {
              context.commit('SET_DAYREPORTS', null)
            } else {
              context.commit('SET_DAYREPORTS', response)
            }
          })
    }
  }
}
