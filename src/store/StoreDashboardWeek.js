import apiLib from '../services/apiLib.js'

export const moduleDashboardWeek = {
  state: {
    dashboardWeekChartDataLoaded: false,
    dashboardWeekChartDataUpdating: false,
    dashboardWeekChartData: {},
    dashboardWeekChartTitle: '',
    dashboardWeekDataAverage: null
  },
  mutations: {
    SET_DASHBOARDWEEK (state, data) {
      state.dashboardWeekChartData = data
    },
    SET_DASHBOARDWEEK_CHART_TITLE (state, data) {
      if (Array.isArray(data)) {
        const average = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2)
        state.dashboardWeekChartTitle = 'Weekly summary ' + average + ' litres per day on average'
      } else {
        state.dashboardWeekChartTitle = data
      }
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
      state.dashboardWeekChartData = {}
      state.dashboardWeekDataAverage = null
    }
  },
  actions: {
    async fetchDashboardWeekChartData (context, payload) {
      context.commit('SET_DASHBOARDWEEK_UPDATE_STATUS', true)
      const response = await apiLib.getData('carer/dashboard-week/' + payload.userId + '/' + payload.date)
      if (typeof response === 'object' && hasNullValues(response.volumeConsumedTotal)) {
        context.commit('SET_DASHBOARDWEEK', response)
        context.commit('SET_DASHBOARDWEEK_CHART_TITLE', response.volumeConsumedTotal)
        context.commit('SET_DASHBOARDWEEK_LOAD_STATUS', true)
        context.commit('SET_DASHBOARDWEEK_UPDATE_STATUS', false)
      } else {
        context.commit('SET_DASHBOARDWEEK_CHART_TITLE', 'Weekly summary 0.00 litres per day on average')
        context.commit('SET_DASHBOARDWEEK', { labels: [], data: [] })
        context.commit('SET_DASHBOARDWEEK_LOAD_STATUS', false)
      }
    },
    resetDashboardWeekState (context) {
      context.commit('RESET_DASHBOARDWEEK_STATE')
    }
  },
  getters: {
    getterWeekLineBarChartData: state => {
      return {
        labels: state.dashboardWeekChartData.labels,
        datasets: [{
          label: 'Total in litres for this day',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: state.dashboardWeekChartData.volumeConsumedTotal
        }]
      }
    }
  }
}

function hasNullValues (data) {
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    if (element !== null) {
      return true
    }
  }
}
