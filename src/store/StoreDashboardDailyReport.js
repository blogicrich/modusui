import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleDashboardDailyReport = {
  state: {
    comments: [],
    // Comments staged for submission
    newComments: [],
    // New comment for staging
    newComment: '',
    newCommentDateTime: null,
    // Comment for edit or deletion
    selectedComment: {}
  },
  mutations: {
    ADD_NEW_COMMENT (state, data) {
      state.newComments.push({
        comment: data.text,
        date: data.date,
        time: data.time,
        datetime: data.date + ' ' + data.time
      })
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
    UPDATE_NEW_COMMENT_DATE (state, data) {
      state.newCommentTime = data
    },
    UPDATE_NEW_COMMENT_TIME (state, data) {
      state.newCommentTime = data
    },
    SET_SELECTED_COMMENT (state, data) {
      state.selectedComment = data
    },
    RESET_NEW_COMMENT (state) {
      state.newComment = ''
      state.newCommentDateTime = 0
    },
    RESET_DAILY_REPORT_STATE (state) {
      state.comments = []
      state.newComments = []
      state.selectedComment = {}
      state.dailyReportsLoading = false
      state.dailyReportError = false
      state.newComment = ''
      state.newCommentDateTime = null
    }
  },
  actions: {
    async fetchDailyReport (context) {
      const date = context.rootState.dashboardDates.dashboardUnixDate

      context.commit('SET_DAILY_REPORT_LOAD_STATE', true)
      apiLib.getData('carer/day-report/' + date).then((response) => {
        const dailyReport = []
        for (let i = 0; i < response.length; i++) {
          let element = { ...response[i] }
          const time = convertTimeToSecondsFromMidnight(element.date)
          const dateTime = convertToUnix(element.date)
          const date = convertTimeToLongForm(element.date * 1000)
          element = { ...element, time: time, date: date, datetime: dateTime }
          dailyReport.push(element)
        }
        if (typeof response === 'undefined') {
          context.commit('SET_COMMENTS', [])
          context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
        } else {
          context.commit('SET_COMMENTS', dailyReport)
          context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
        }
      })
    },
    async postNewComments (context) {
      const userId = context.rootState.dashboardUsers.selectedUser.userId
      const jobs = []

      context.commit('SET_DAILY_REPORT_LOAD_STATE', true)
      for (let i = 0; i < context.state.newComments.length; i++) {
        const element = context.state.newComments[i]
        const data = {
          userId: userId,
          comments: element.comment,
          date: convertToUnix(element.datetime)
        }
        jobs.push(apiLib.postData('carer/day-report/', data, false, true))
      }
      await Promise.all(jobs).then((response) => {
        context.dispatch('fetchDailyReport')
      }).finally(
        context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
      )
    },
    updateComment (context) {

    },
    async deleteComment (context) {
      const dayReportId = context.state.selectedComment.dayReportId
      context.commit('SET_DAILY_REPORT_LOAD_STATE', true)
      const update = await apiLib.deleteData('carer/day-report/' + dayReportId, false, true).then(
        context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
      )
      return update
    }
  }
}

function convertTimeToLongForm (datetime) {
  return moment(datetime).format('YYYY-MM-DD')
}

function convertToUnix (datetime) {
  const dateUnix = moment(datetime).unix()
  return dateUnix
}

function convertTimeToSecondsFromMidnight (time) {
  const startOfDay = moment().startOf('day')
  return moment(startOfDay, 'HH:MM').format('HH:MM')
}
