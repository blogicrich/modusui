import apiLib from '../services/apiLib.js'
import moment from 'moment'

const bounce = 500

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
    selectedComment: {},
    // Store Booleans
    commentsLoading: false,
    commentsError: false,
    commentsUpdating: false,
    commentsDeleting: false
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
      state.commentsLoading = data
    },
    SET_DAILY_REPORT_ERROR_STATE (state, data) {
      state.commentsError = data
    },
    SET_DAILY_REPORT_UPDATE_STATE (state, data) {
      state.commentsUpdating = data
    },
    SET_DAILY_REPORT_DELETE_STATE (state, data) {
      state.commentsDeleting = data
    },
    SET_SELECTED_COMMENT (state, data) {
      state.selectedComment = { ...data.item }
    },
    RESET_DAILY_REPORT_STATE (state) {
      state.comments = []
      state.newComments = []
      state.selectedComment = {}
      state.newComment = ''
      state.newCommentDateTime = null
      state.commentsLoading = false
      state.commentsError = false
      state.commentsUpdating = false
      state.commentsDeleting = false
    }
  },
  actions: {
    async fetchDailyReport (context) {
      try {
        context.commit('SET_DAILY_REPORT_ERROR_STATE', false)
        context.commit('SET_DAILY_REPORT_LOAD_STATE', true)
        const date = context.rootState.dashboardDates.dashboardUnixDate
        const response = await apiLib.getData('carer/day-report/' + date)
        const dailyReport = []
        if (typeof response === 'undefined' || !Array.isArray(response)) {
          context.commit('SET_COMMENTS', [])
          context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
          context.commit('SET_DAILY_REPORT_ERROR_STATE', true)
        } else {
          for (let i = 0; i < response.length; i++) {
            let element = { ...response[i] }
            const date = convertTimeToLongForm(element.date * 1000)
            element = { ...element, date: date }
            dailyReport.push(element)
          }
          setTimeout(() => {
            context.commit('SET_COMMENTS', dailyReport)
            context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
          }, bounce)
        }
      } catch (error) {
        console.error(error)
        context.commit('SET_DAILY_REPORT_ERROR_STATE', true)
        context.commit('SET_DAILY_REPORT_LOAD_STATE', false)
      }
    },
    async postNewComments (context) {
      try {
        context.commit('SET_DAILY_REPORT_ERROR_STATE', false)
        context.commit('SET_DAILY_REPORT_UPDATE_STATE', true)
        const userId = context.rootState.dashboardUsers.selectedUser.userId
        const jobs = []
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
        await Promise.all(jobs)
        context.dispatch('fetchDailyReport')
        setTimeout(() => {
          context.commit('SET_DAILY_REPORT_UPDATE_STATE', false)
        }, bounce)
      } catch (error) {
        console.error(error)
        context.commit('SET_DAILY_REPORT_UPDATE_STATE', false)
        context.commit('SET_DAILY_REPORT_ERROR_STATE', true)
      }
    },
    async updateComment (context) {
      try {
        context.commit('SET_DAILY_REPORT_ERROR_STATE', false)
        context.commit('SET_DAILY_REPORT_UPDATE_STATE', true)
        const dayReportId = context.state.selectedComment.dayReportId
        const userId = context.rootState.dashboardUsers.selectedUser.userId
        const payload = {
          userId: userId,
          comments: context.state.selectedComment.comments,
          date: convertToUnix(context.state.selectedComment.date) / 1000
        }
        await apiLib.updateData('carer/day-report/' + dayReportId, payload, false, true)
        setTimeout(() => {
          context.commit('SET_DAILY_REPORT_UPDATE_STATE', false)
        }, bounce)
        context.dispatch('fetchDailyReport')
      } catch (error) {
        console.error(error)
        context.commit('SET_DAILY_REPORT_UPDATE_STATE', false)
        context.commit('SET_DAILY_REPORT_ERROR_STATE', true)
      }
    },
    async deleteComment (context) {
      try {
        context.commit('SET_DAILY_REPORT_ERROR_STATE', false)
        context.commit('SET_DAILY_REPORT_DELETE_STATE', true)
        const dayReportId = context.state.selectedComment.dayReportId
        await apiLib.deleteData('carer/day-report/' + dayReportId, false, true)
        context.dispatch('fetchDailyReport')
        setTimeout(() => {
          context.commit('SET_DAILY_REPORT_UPDATE_STATE', false)
        }, bounce)
      } catch (error) {
        console.error(error)
        context.commit('SET_DAILY_REPORT_DELETE_STATE', false)
        context.commit('SET_DAILY_REPORT_ERROR_STATE', true)
      }
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
