import apiLib from '../services/apiLib.js'
import moment from 'moment'

export const moduleDashboardDailyReport = {
  state: {
    comments: [],
    // Comments staged for submission
    newComments: [],
    // New comment for staging
    newComment: '',
    newCommentDate: getToday(),
    maxDate: getToday(),
    // Comment for edit or deletion
    selectedComment: {}
  },
  mutations: {
    // CREATE
    ADD_NEW_COMMENT (state, data) {
      state.newComments.push({
        comment: data.text,
        date: data.date
      })
    },
    REMOVE_NEW_COMMENT (state, data) {
      state.newComments.splice(data, 1)
    },
    UPDATE_NEW_COMMENT (state, data) {
      state.newComment = data
    },
    UPDATE_NEW_COMMENT_DATE (state, data) {
      console.log(data)
      state.newCommentDate = data
    },
    RESET_NEW_COMMENT_STATE (state) {
      state.newComment = ''
      state.newCommentDate = getToday()
      state.newComments = []
    },
    // UPDATE
    UPDATE_SELECTED_COMMENT (state, data) {
      state.selectedComment.comments = data
    },
    UPDATE_SELECTED_COMMENT_DATE (state, data) {
      state.selectedComment.date = data
    },
    RESET_SELECTED_COMMENT_STATE (state) {
      state.selectedComment = {}
    },
    UNDO_SELECTED_COMMENT (state, data) {
      const pristineComment = state.comments.find((report) => data === report.dayReportId)
      state.selectedComment = { ...pristineComment }
    },
    // Store State
    SET_COMMENTS (state, data) {
      state.comments = data
    },
    SET_DAILY_REPORT_LOAD_STATE (state, data) {
      state.drinksLoading = data
    },
    SET_SELECTED_COMMENT (state, data) {
      state.selectedComment = { ...data }
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
          const date = convertTimeToLongForm(element.date * 1000)
          element = { ...element, date: date }
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
          date: convertToUnix(element.date) / 1000
        }
        const update = apiLib.postData('carer/day-report/', data, false, true)
        jobs.push(update)
      }
      await Promise.all(jobs).then((response) => {
        context.dispatch('fetchDailyReport')
      }).finally(
        context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
      )
    },
    async updateComment (context) {
      const dayReportId = context.state.selectedComment.dayReportId
      const userId = context.rootState.dashboardUsers.selectedUser.userId
      const payload = {
        userId: userId,
        comments: context.state.selectedComment.comments,
        date: convertToUnix(context.state.selectedComment.date) / 1000
      }
      context.commit('SET_DAILY_REPORT_LOAD_STATE', true)
      await apiLib.updateData('carer/day-report/' + dayReportId, payload, false, true).then(
        context.dispatch('fetchDailyReport')
      ).finally(
        context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
      )
      // return update
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
  const dtMoment = moment(datetime)
  return dtMoment.format('x')
}

function getToday () {
  return moment().format('YYYY-MM-DD')
}
