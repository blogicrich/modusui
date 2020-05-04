import apiLib from '../services/apiLib.js'

export const moduleDashboardHour = {
  state: {
    dashboardHourChartDataLoaded: false,
    dashboardHourUpdating: false,
    dashboardHourChartData: []
  },
  mutations: {
    // set the data
    SET_DASHBOARDHOUR (state, data) {
      state.dashboardHourChartData = data
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
      state.dashboardHourChartData = []
    }
  },
  actions: {
    async fetchDashboardHourChartData (context, { userId, date }) {
      context.commit('SET_DASHBOARDHOUR_UPDATE_STATUS', true)
      const response = await apiLib.getData('carer/dashboard-hour/' + userId + '/' + date, false, false)
      if (typeof response === 'object') {
        let arr = []
        response.forEach(element => {
          arr.push(
            {
              label: element.hour,
              value: parseFloat(element.volumeConsumedViaOther) +
              parseFloat(element.volumeConsumedViaEDroplet)
            }
          )
        })
        context.commit('SET_DASHBOARDHOUR', arr)
        context.commit('SET_DASHBOARDHOUR_LOAD_STATUS', true)
        context.commit('SET_DASHBOARDHOUR_UPDATE_STATUS', false)
      } else {
        context.commit('SET_DASHBOARDHOUR', [])
      }
    },
    async resetDashboardHourState (context) {
      context.commit('RESET_DASHBOARDHOUR_STATE')
    }
  }
}

function refactor (obj) {

  return arr
}
