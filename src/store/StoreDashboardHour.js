import apiLib from '../services/apiLib.js'

export const moduleDashboardHour = {
  state: {
    dashboardHourChartDataLoaded: false,
    dashboardHourUpdating: false,
    dashboardHourChartData: [],
    dashboardHourChartTitle: ''
  },
  mutations: {
    SET_DASHBOARDHOUR (state, data) {
      state.dashboardHourChartData = data
    },
    SET_DASHBOARDHOUR_CHART_TITLE (state, data) {
      state.dashboardHourChartTitle = 'Activity on: ' + data
    },
    SET_DASHBOARDHOUR_UPDATE_STATUS (state, data) {
      state.dashboardHourUpdating = data
    },
    SET_DASHBOARDHOUR_LOAD_STATUS (state, data) {
      state.dashboardHourChartDataLoaded = data
    },
    RESET_DASHBOARDHOUR_STATE (state) {
      state.dashboardHourChartDataLoaded = false
      state.dashboardHourUpdating = false
      state.dashboardHourChartData = {}
    }
  },
  actions: {
    async fetchDashboardHourChartData (context, payload) {
      context.commit('SET_DASHBOARDHOUR_UPDATE_STATUS', true)
      const response = await apiLib.getData('carer/dashboard-hour/' + payload.userId + '/' + payload.date)
      if (typeof response === 'object' && hasNullValues(response.volumeConsumedTotal)) {
        context.commit('SET_DASHBOARDHOUR', response)
        context.commit('SET_DASHBOARDHOUR_CHART_TITLE', payload.formattedDate)
        context.commit('SET_DASHBOARDHOUR_UPDATE_STATUS', false)
        context.commit('SET_DASHBOARDHOUR_LOAD_STATUS', true)
      } else {
        context.commit('SET_DASHBOARDHOUR_CHART_TITLE', payload.formattedDate)
        context.commit('SET_DASHBOARDHOUR', { labels: [], volumeConsumedtotal: [] })
        context.commit('SET_DASHBOARDHOUR_LOAD_STATUS', false)
      }
    },
    async resetDashboardHourState (context) {
      context.commit('RESET_DASHBOARDHOUR_STATE')
    }
  },
  getters: {
    getterHourLineBarChartData: state => {
      return {
        labels: state.dashboardHourChartData.labels,
        datasets: [{
          label: 'Hydration in litres',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: state.dashboardHourChartData.volumeConsumedTotal
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
