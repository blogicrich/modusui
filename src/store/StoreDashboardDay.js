import apiLib from '../services/apiLib.js'

export const moduleDashboardDay = {
  state: {
    dashboardDayChartDataLoaded: false,
    dashboardDayUpdating: false,
    dashboardDayChartData: {},
    dashboardDayChartTitle: ''
  },

  mutations: {
    SET_DASHBOARDDAY (state, data) {
      state.dashboardDayChartData = data
    },
    SET_DASHBOARDDAY_CHART_TITLE (state, data) {
      state.dashboardDayChartTitle = data
    },
    SET_DASHBOARDDAY_LOAD_STATUS (state, data) {
      state.dashboardDayChartDataLoaded = data
    },
    SET_DASHBOARDDAY_UPDATE_STATUS (state, data) {
      state.dashboardDayUpdating = data
    },
    RESET_DASHBOARDDAY_STATE (state) {
      state.dashboardDayChartDataLoaded = false
      state.dashboardDayUpdating = false
      state.dashboardDayChartData = {}
      state.dashboardDayChartTitle = ''
    }
  },

  actions: {
    async fetchDashboardDayChartData (context, { userId, date }) {
      context.commit('SET_DASHBOARDDAY_UPDATE_STATUS', true)
      const response = await apiLib.getData('carer/dashboard-day/' + userId + '/' + date)
      if (typeof response === 'object' && hasNullValues(response.data)) {
        context.commit('SET_DASHBOARDDAY', response)
        context.commit('SET_DASHBOARDDAY_CHART_TITLE', response.title)
        context.commit('SET_DASHBOARDDAY_LOAD_STATUS', true)
        context.commit('SET_DASHBOARDDAY_UPDATE_STATUS', false)
      } else {
        context.commit('SET_DASHBOARDDAY', { data: [], labels: response.labels })
        context.commit('SET_DASHBOARDDAY_CHART_TITLE', 'Daily hydration status: 0.00 L / 0.00 L')
        context.commit('SET_DASHBOARDDAY_LOAD_STATUS', false)
      }
    },
    resetDashboardDayState (context) {
      context.commit('RESET_DASHBOARDDAY_STATE')
    }
  },
  getters: {
    getterDailyPieChartData: state => {
      return {
        labels: state.dashboardDayChartData.labels,
        datasets: [{
          backgroundColor: ['rgba(255, 97, 111, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(176, 190, 197, 0.2)'],
          borderColor: ['rgba(255, 97, 111, 1)', 'rgba(54, 162, 235, 1)', 'rgba(176, 190, 197, 1)'],
          borderWidth: 1,
          data: state.dashboardDayChartData.data,
          weight: 3
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
