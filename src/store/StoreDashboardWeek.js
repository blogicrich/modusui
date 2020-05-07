import apiLib from '../services/apiLib.js'

export const moduleDashboardWeek = {
  state: {
    dashboardWeekChartDataLoaded: false,
    dashboardWeekChartDataUpdating: false,
    dashboardWeekChartData: [],
    dashboardWeekChartTitle: '',
    dashboardWeekDataAverage: null
  },
  mutations: {
    SET_DASHBOARDWEEK (state, data) {
      state.dashboardWeekChartData = data
    },
    SET_DASHBOARDWEEK_CHART_TITLE (state, data) {
      state.dashboardWeekChartTitle = data
    },
    SET_DASHBOARD_WEEK_AVERAGE (state, data) {
      state.dashboardWeekDataAverage = data
    },
    SET_DASHBOARDWEEK_LOAD_STATUS (state, data) {
      state.dashboardWeekChartDataLoaded = data
    },
    SET_DASHBOARDWEEK_UPDATE_STATUS (state, data) {
      state.dashboardWeekChartDataUpdating = data
    },
    RESET_DASHBOARDWEEK_STATE (state) {
      state.dashboardWeekChartDataLoaded = false
      state.dashboardWeekChartDataUpdating = false
      state.dashboardWeekChartData = []
      state.dashboardWeekDataAverage = null
    }
  },
  actions: {
    async fetchDashboardWeekChartData (context, payload) {
      context.commit('SET_DASHBOARDWEEK_UPDATE_STATUS', true)
      const response = await apiLib.getData('carer/dashboard-week/' + payload.userId + '/' + payload.date, false, false)
      if (typeof response === 'object') {
        const dataPoints = response.map(weekDayData =>
          (weekDayData.volumeConsumedViaEDroplet && weekDayData.volumeConsumedViaOther)
            ? (parseFloat(weekDayData.volumeConsumedViaEDroplet) + parseFloat(weekDayData.volumeConsumedViaOther))
            : null
        )
        const average = (dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length).toFixed(2)
        const title = 'Weekly summary ' + average + ' litres per day on average'
        context.commit('SET_DASHBOARD_WEEK_AVERAGE', average)
        context.commit('SET_DASHBOARDWEEK', dataPoints)
        context.commit('SET_DASHBOARDWEEK_CHART_TITLE', title)
        context.commit('SET_DASHBOARDWEEK_LOAD_STATUS', true)
        context.commit('SET_DASHBOARDWEEK_UPDATE_STATUS', false)
      } else {
        context.commit('SET_DASHBOARDWEEK', [])
        context.commit('SET_DASHBOARDWEEK_LOAD_STATUS', false)
      }
    },
    resetDashboardWeekState (context) {
      context.commit('RESET_DASHBOARDWEEK_STATE')
    }
  }
}
