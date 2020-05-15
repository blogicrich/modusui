import moment from 'moment'

export const moduleDashboardDates = {
  state: {
    dashboardSelectedDate: null,
    dashboardUnixDate: null,
    dashboardFormattedDate: null
  },
  mutations: {
    SET_DASHBOARD_DATE (state, data) {
      state.dashboardSelectedDate = data
      state.dashboardUnixDate = moment.utc(data).unix()
      state.dashboardFormattedDate = moment(data).format('LL')
    },
    INCREMENT_DASHBOARD_DATE (state, data) {
      state.dashboardSelectedDate = moment(data, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD')
      state.dashboardUnixDate = moment.utc(data).add(1, 'day').unix()
      state.dashboardFormattedDate = moment(data).add(1, 'day').format('LL')
    },
    DECREMENT_DASHBOARD_DATE (state, data) {
      state.dashboardSelectedDate = moment(data).subtract(1, 'day').format('YYYY-MM-DD')
      state.dashboardUnixDate = moment.utc(data).subtract(1, 'day').unix()
      state.dashboardFormattedDate = moment(data).subtract(1, 'day').format('LL')
    },
    RESET_DASHBOARD_DATE_STATE (state) {
      state.dashboardSelectedDate = null
      state.dashboardUnixDate = null
      state.dashboardFormattedDate = null
    }
  },
  actions: {
    setDashboardDate (context, payload) {
      context.commit('SET_DASHBOARD_DATE', payload)
    },
    incrementDashboardDate (context, payload) {
      context.commit('INCREMENT_DASHBOARD_DATE', payload)
    },
    decrementDashboardDate (context, payload) {
      context.commit('DECREMENT_DASHBOARD_DATE', payload)
    },
    resetDashboardDayState (context) {
      context.commit('RESET_DASHBOARD_DATE_STATE')
    }
  }
}
