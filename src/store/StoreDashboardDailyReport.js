import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleDashboardDailyReport = {
  state: {
    comments: [],
    newComments: [],
    dailyReportLoading: false,
    dailyReportError: false,
    newComment: ''
  },
  mutations: {
    ADD_NEW_COMMENT (state) {
      state.newComments.push(state.newComment)
      state.newComment = ''
    },
    REMOVE_NEW_COMMENT (state, data) {
      state.newComments.splice(data, 1)
    },
    SET_COMMENTS (state, data) {
      state.comments = data
    },
    SET_DAILY_REPORT_LOAD_STATE (state, data) {
      state.drinksLoading = data
    },
    UPDATE_NEW_COMMENT (state, data) {
      state.newComment = data
    },
    RESET_DAILY_REPORT_STATE (state) {
      state.comments = []
      state.newComments = [],
      state.dailyReportsLoading = false,
      state.dailyReportError = false,
      state.newComment = ''
    }
  },
  actions: {
    fetchDailyReport (context) {
      // const userId = context.rootState.dashboardUsers.selectedUser.userId
      const date = context.rootState.dashboardDates.dashboardUnixDate

      context.commit('SET_DAILY_REPORT_LOAD_STATE', true)
      apiLib.getData('carer/day-report/' + date).then((response) => {
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          element.date = convertTimeToLongForm(element.date * 1000)
        }
        if (typeof response === 'undefined') {
          context.commit('SET_COMMENTS', [])
          context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
        } else {
          context.commit('SET_COMMENTS', response)
          context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
        }
      })
    },
    postNewComments (context) {
      const userId = context.rootState.dashboardUsers.selectedUser.userId
      const date = context.rootState.dashboardDates.dashboardUnixDate

      let jobs = []
      for (let i = 0; i < context.state.newComments.length; i++) {
        const element = context.state.newComments[i];
        const data = {
          userId: userId,
          comments: element,
          date: date
        }
        // jobs.push(apiLib.postData('carer/day-report/', data, true, true))
        console.log(data)
      }
      // Promise.all(jobs).then((response) => {
      //   context.commit('RESET_DAILY_REPORT_STATE')
      //   context.dispatch('fetchDailyReport')
      // })
    },
    updateComment (context) {}
  }
}

function convertTimeToLongForm (datetime) {
  return moment(datetime).format('YYYY-MM-DD HH:MM')
}

function convertToUnix (date, time) {
  const datetime = date + ' ' + time 
  const dateUnix = moment(datetime).unix()
  return dateUnix
}
